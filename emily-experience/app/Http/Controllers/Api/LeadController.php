<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\LeadResource;
use App\Models\Lead;
use App\Models\LeadActivity;
use App\Services\LeadScoringService;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class LeadController extends Controller
{
    protected LeadScoringService $scoringService;

    public function __construct(LeadScoringService $scoringService)
    {
        $this->scoringService = $scoringService;
    }

    /**
     * Create a new lead
     */
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'email' => 'required|email|unique:leads,email',
            'first_name' => 'nullable|string|max:255',
            'last_name' => 'nullable|string|max:255',
            'phone' => 'nullable|string|max:20',
            'event_type' => 'nullable|string|in:wedding,corporate,birthday,anniversary,other',
            'event_date' => 'nullable|date_format:Y-m-d',
            'budget_range' => 'nullable|string|in:under-5k,5k-20k,20k-50k,50k+',
            'location' => 'nullable|string|max:255',
            'landing_page_id' => 'nullable|exists:landing_pages,id',
            'utm_source' => 'nullable|string|max:255',
            'utm_medium' => 'nullable|string|max:255',
            'utm_campaign' => 'nullable|string|max:255',
        ]);

        $lead = Lead::create([
            ...$validated,
            'score' => 0,
            'status' => 'cold',
            'ip_address' => $request->ip(),
            'user_agent' => $request->userAgent(),
        ]);

        // Log initial lead creation activity
        $this->scoringService->logActivity(
            $lead,
            'lead_created',
            ['source' => $validated['utm_source'] ?? 'direct']
        );

        // Queue welcome email
        dispatch(new \App\Jobs\SendWelcomeEmailSeries($lead));

        return response()->json([
            'success' => true,
            'message' => 'Lead created successfully',
            'data' => new LeadResource($lead),
        ], 201);
    }

    /**
     * Get lead by ID
     */
    public function show(Lead $lead): JsonResponse
    {
        return response()->json([
            'success' => true,
            'data' => new LeadResource($lead),
        ]);
    }

    /**
     * Update lead
     */
    public function update(Request $request, Lead $lead): JsonResponse
    {
        $validated = $request->validate([
            'first_name' => 'nullable|string|max:255',
            'last_name' => 'nullable|string|max:255',
            'phone' => 'nullable|string|max:20',
            'event_type' => 'nullable|string|in:wedding,corporate,birthday,anniversary,other',
            'event_date' => 'nullable|date_format:Y-m-d',
            'budget_range' => 'nullable|string|in:under-5k,5k-20k,20k-50k,50k+',
            'location' => 'nullable|string|max:255',
        ]);

        $lead->update($validated);

        // Recalculate score
        $this->scoringService->updateLeadScore($lead);

        return response()->json([
            'success' => true,
            'message' => 'Lead updated successfully',
            'data' => new LeadResource($lead),
        ]);
    }

    /**
     * Get current lead score
     */
    public function score(Lead $lead): JsonResponse
    {
        return response()->json([
            'success' => true,
            'data' => [
                'id' => $lead->id,
                'score' => $lead->score,
                'status' => $lead->status,
                'score_breakdown' => [
                    'profile_score' => $lead->profile_score ?? 0,
                    'activity_score' => $lead->activity_score ?? 0,
                    'engagement_score' => $lead->engagement_score ?? 0,
                ],
                'last_activity' => $lead->latestActivity?->created_at,
            ],
        ]);
    }

    /**
     * Log activity for lead
     */
    public function logActivity(Request $request, Lead $lead): JsonResponse
    {
        $validated = $request->validate([
            'activity_type' => 'required|string|in:email_open,link_click,page_view,booking_initiated,consultation_scheduled,website_visit',
            'metadata' => 'nullable|array',
        ]);

        $activity = $this->scoringService->logActivity(
            $lead,
            $validated['activity_type'],
            $validated['metadata'] ?? []
        );

        return response()->json([
            'success' => true,
            'message' => 'Activity logged successfully',
            'data' => [
                'activity' => $activity,
                'updated_score' => $lead->fresh()->score,
                'updated_status' => $lead->fresh()->status,
            ],
        ]);
    }

    /**
     * Get all hot leads (for sales)
     */
    public function hotLeads(): JsonResponse
    {
        $leads = $this->scoringService->getHotLeads();

        return response()->json([
            'success' => true,
            'data' => LeadResource::collection($leads),
            'meta' => [
                'total' => $leads->count(),
            ],
        ]);
    }

    /**
     * Get leads by status
     */
    public function byStatus(Request $request): JsonResponse
    {
        $status = $request->query('status', 'cold');
        $limit = $request->query('limit', 50);

        $leads = Lead::where('status', $status)
            ->orderBy('score', 'desc')
            ->paginate($limit);

        return response()->json([
            'success' => true,
            'data' => LeadResource::collection($leads),
            'meta' => [
                'current_page' => $leads->currentPage(),
                'total' => $leads->total(),
                'per_page' => $leads->perPage(),
            ],
        ]);
    }

    /**
     * Get lead activities
     */
    public function activities(Lead $lead): JsonResponse
    {
        $activities = $lead->activities()
            ->orderBy('created_at', 'desc')
            ->paginate(50);

        return response()->json([
            'success' => true,
            'data' => $activities,
        ]);
    }

    /**
     * Delete lead (soft delete)
     */
    public function destroy(Lead $lead): JsonResponse
    {
        $lead->delete();

        return response()->json([
            'success' => true,
            'message' => 'Lead deleted successfully',
        ]);
    }
}
