<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Consultation;
use App\Models\Lead;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\DB;

class ConsultationController extends Controller
{
    /**
     * Get available consultation slots
     */
    public function availableSlots(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'date' => 'required|date_format:Y-m-d',
            'duration_minutes' => 'nullable|integer|in:15,30,45,60',
        ]);

        $duration = $validated['duration_minutes'] ?? 30;
        $date = new \DateTime($validated['date']);

        // Define available time slots (9 AM to 5 PM, every 30 minutes)
        $slots = [];
        $startHour = 9;
        $endHour = 17;

        for ($hour = $startHour; $hour < $endHour; $hour++) {
            for ($minute = 0; $minute < 60; $minute += 30) {
                $slotTime = (clone $date)->setTime($hour, $minute);

                // Skip if time is in the past
                if ($slotTime < now()) {
                    continue;
                }

                // Check if slot is available
                if (Consultation::isSlotAvailable($slotTime, $duration)) {
                    $slots[] = [
                        'time' => $slotTime->format('H:i'),
                        'datetime' => $slotTime->format('Y-m-d H:i:s'),
                        'available' => true,
                    ];
                }
            }
        }

        return response()->json([
            'success' => true,
            'date' => $validated['date'],
            'duration_minutes' => $duration,
            'available_slots' => $slots,
            'total_available' => count($slots),
        ]);
    }

    /**
     * Book a consultation
     */
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'lead_id' => 'required|exists:leads,id',
            'scheduled_for' => 'required|date_format:Y-m-d H:i:s|after:now',
            'duration_minutes' => 'nullable|integer|in:15,30,45,60',
            'notes' => 'nullable|string|max:1000',
        ]);

        // Verify the slot is actually available
        $scheduledFor = new \DateTime($validated['scheduled_for']);
        if (!Consultation::isSlotAvailable($scheduledFor, $validated['duration_minutes'] ?? 30)) {
            return response()->json([
                'success' => false,
                'message' => 'This time slot is no longer available',
            ], 409);
        }

        // Find an available planner (round-robin or least scheduled)
        $availablePlanners = User::where('role', 'planner')
            ->where('is_active', true)
            ->get();

        if ($availablePlanners->isEmpty()) {
            return response()->json([
                'success' => false,
                'message' => 'No planners available at the moment',
            ], 503);
        }

        // Select planner with least consultations this month
        $planner = $availablePlanners
            ->sortBy(function ($p) {
                return Consultation::where('planner_id', $p->id)
                    ->where('scheduled_for', '>=', now()->startOfMonth())
                    ->count();
            })
            ->first();

        $consultation = Consultation::create([
            'lead_id' => $validated['lead_id'],
            'scheduled_for' => $scheduledFor,
            'duration_minutes' => $validated['duration_minutes'] ?? 30,
            'planner_id' => $planner->id,
            'status' => 'scheduled',
            'notes' => $validated['notes'] ?? null,
            'meeting_link' => $this->generateMeetingLink(),
        ]);

        // Log activity for lead scoring
        $lead = Lead::find($validated['lead_id']);
        app(\App\Services\LeadScoringService::class)->logActivity(
            $lead,
            'consultation_scheduled',
            [
                'consultation_id' => $consultation->id,
                'scheduled_for' => $scheduledFor->format('Y-m-d H:i:s'),
            ]
        );

        // Queue confirmation emails
        dispatch(new \App\Jobs\SendConsultationConfirmation($consultation));

        return response()->json([
            'success' => true,
            'message' => 'Consultation booked successfully',
            'data' => [
                'id' => $consultation->id,
                'scheduled_for' => $consultation->scheduled_for,
                'planner' => [
                    'name' => $planner->name,
                    'email' => $planner->email,
                ],
                'meeting_link' => $consultation->meeting_link,
                'confirmation_sent' => true,
            ],
        ], 201);
    }

    /**
     * Get consultation details
     */
    public function show(Consultation $consultation): JsonResponse
    {
        return response()->json([
            'success' => true,
            'data' => [
                'id' => $consultation->id,
                'lead' => [
                    'id' => $consultation->lead->id,
                    'name' => $consultation->lead->first_name . ' ' . $consultation->lead->last_name,
                    'email' => $consultation->lead->email,
                    'event_type' => $consultation->lead->event_type,
                ],
                'scheduled_for' => $consultation->scheduled_for,
                'duration_minutes' => $consultation->duration_minutes,
                'planner' => [
                    'name' => $consultation->planner->name,
                    'email' => $consultation->planner->email,
                ],
                'status' => $consultation->status,
                'meeting_link' => $consultation->meeting_link,
                'notes' => $consultation->notes,
                'outcome' => $consultation->outcome,
            ],
        ]);
    }

    /**
     * Complete consultation
     */
    public function complete(Request $request, Consultation $consultation): JsonResponse
    {
        if ($consultation->status !== 'scheduled') {
            return response()->json([
                'success' => false,
                'message' => 'Only scheduled consultations can be completed',
            ], 400);
        }

        $validated = $request->validate([
            'outcome' => 'nullable|string|max:1000',
            'notes' => 'nullable|string|max:1000',
        ]);

        $consultation->update([
            'status' => 'completed',
            'outcome' => $validated['outcome'] ?? null,
            'notes' => $validated['notes'] ?? $consultation->notes,
            'completed_at' => now(),
        ]);

        // Log activity
        if ($consultation->lead) {
            app(\App\Services\LeadScoringService::class)->logActivity(
                $consultation->lead,
                'consultation_completed',
                ['consultation_id' => $consultation->id]
            );
        }

        return response()->json([
            'success' => true,
            'message' => 'Consultation marked as completed',
            'data' => $consultation,
        ]);
    }

    /**
     * Cancel consultation
     */
    public function cancel(Request $request, Consultation $consultation): JsonResponse
    {
        if ($consultation->status === 'cancelled' || $consultation->status === 'completed') {
            return response()->json([
                'success' => false,
                'message' => 'This consultation cannot be cancelled',
            ], 400);
        }

        $validated = $request->validate([
            'reason' => 'nullable|string|max:500',
        ]);

        $consultation->cancel($validated['reason'] ?? null);

        return response()->json([
            'success' => true,
            'message' => 'Consultation cancelled successfully',
        ]);
    }

    /**
     * Get consultations for a lead
     */
    public function byLead(Lead $lead): JsonResponse
    {
        $consultations = $lead->consultations()
            ->orderBy('scheduled_for', 'desc')
            ->get();

        return response()->json([
            'success' => true,
            'data' => $consultations,
        ]);
    }

    /**
     * Generate a unique meeting link (can integrate with Zoom/Google Meet)
     */
    private function generateMeetingLink(): string
    {
        return 'https://meet.emily-experience.com/' . strtoupper(substr(md5(uniqid()), 0, 8));
    }
}
