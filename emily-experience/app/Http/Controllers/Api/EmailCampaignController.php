<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\EmailCampaign;
use App\Models\EmailTemplate;
use App\Services\EmailService;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class EmailCampaignController extends Controller
{
    protected EmailService $emailService;

    public function __construct(EmailService $emailService)
    {
        $this->emailService = $emailService;
    }

    /**
     * Get all campaigns
     */
    public function index(Request $request): JsonResponse
    {
        $per_page = $request->query('per_page', 50);
        $status = $request->query('status');

        $query = EmailCampaign::query();

        if ($status) {
            $query->where('status', $status);
        }

        $campaigns = $query->orderBy('created_at', 'desc')->paginate($per_page);

        return response()->json([
            'success' => true,
            'data' => $campaigns,
            'meta' => [
                'current_page' => $campaigns->currentPage(),
                'total' => $campaigns->total(),
                'per_page' => $campaigns->perPage(),
            ],
        ]);
    }

    /**
     * Create new campaign
     */
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'type' => 'required|string|in:welcome_series,promotional,educational,nurture',
            'template_ids' => 'required|array|min:1',
            'template_ids.*' => 'exists:email_templates,id',
            'scheduled_for' => 'nullable|date_format:Y-m-d H:i:s',
            'target_segment' => 'nullable|array|in:all,hot,warm,cold,by_event_type,by_budget',
            'segment_params' => 'nullable|array',
        ]);

        $campaign = EmailCampaign::create([
            'name' => $validated['name'],
            'description' => $validated['description'] ?? null,
            'type' => $validated['type'],
            'status' => 'draft',
            'target_segment' => json_encode($validated['target_segment'] ?? ['all']),
            'segment_params' => json_encode($validated['segment_params'] ?? []),
            'scheduled_for' => $validated['scheduled_for'] ?? null,
        ]);

        // Associate templates
        $campaign->templates()->attach($validated['template_ids']);

        return response()->json([
            'success' => true,
            'message' => 'Campaign created successfully',
            'data' => $campaign->load('templates'),
        ], 201);
    }

    /**
     * Trigger campaign send
     */
    public function send(Request $request, EmailCampaign $campaign): JsonResponse
    {
        if ($campaign->status !== 'draft') {
            return response()->json([
                'success' => false,
                'message' => 'Only draft campaigns can be sent',
            ], 400);
        }

        $campaign->update(['status' => 'sending']);

        // Queue campaign sending
        dispatch(new \App\Jobs\SendEmailCampaign($campaign));

        return response()->json([
            'success' => true,
            'message' => 'Campaign queued for sending',
            'data' => $campaign,
        ]);
    }

    /**
     * Get campaign statistics
     */
    public function stats(EmailCampaign $campaign): JsonResponse
    {
        $sent = $campaign->logs()->where('status', 'sent')->count();
        $opened = $campaign->logs()->where('opened_at', '!=', null)->count();
        $clicked = $campaign->logs()->where('clicked_at', '!=', null)->count();
        $bounced = $campaign->logs()->where('status', 'bounced')->count();

        return response()->json([
            'success' => true,
            'data' => [
                'campaign_id' => $campaign->id,
                'name' => $campaign->name,
                'status' => $campaign->status,
                'sent' => $sent,
                'open_rate' => $sent > 0 ? round(($opened / $sent) * 100, 2) : 0,
                'click_rate' => $sent > 0 ? round(($clicked / $sent) * 100, 2) : 0,
                'bounce_rate' => $sent > 0 ? round(($bounced / $sent) * 100, 2) : 0,
                'total_revenue' => $campaign->logs()
                    ->whereNotNull('lead_id')
                    ->join('leads', 'email_logs.lead_id', '=', 'leads.id')
                    ->sum('leads.revenue') ?? 0,
            ],
        ]);
    }

    /**
     * Delete campaign
     */
    public function destroy(EmailCampaign $campaign): JsonResponse
    {
        if ($campaign->status !== 'draft') {
            return response()->json([
                'success' => false,
                'message' => 'Only draft campaigns can be deleted',
            ], 400);
        }

        $campaign->delete();

        return response()->json([
            'success' => true,
            'message' => 'Campaign deleted successfully',
        ]);
    }
}
