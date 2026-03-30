<?php

namespace App\Services;

use App\Models\Lead;
use App\Models\LeadActivity;
use Carbon\Carbon;

class LeadScoringService
{
    /**
     * Points configuration for lead scoring
     */
    protected array $pointValues = [
        // Activity Points
        'activities' => [
            'email_open' => 2,
            'link_click' => 5,
            'page_view' => 1,
            'form_submit' => 15,
            'pricing_page_view' => 10,
            'vendor_profile_view' => 8,
            'booking_initiated' => 25,
            'wishlist_add' => 20,
            'consultation_booked' => 30,
            'email_reply' => 10,
            'phone_call' => 15,
        ],

        // Profile Completion Points
        'profile' => [
            'phone_provided' => 10,
            'event_date_provided' => 15,
            'budget_provided' => 20,
            'location_provided' => 10,
        ],

        // Event Type Multipliers
        'event_type_multipliers' => [
            'wedding' => 1.2,
            'corporate' => 1.3,
            'birthday' => 1.0,
            'anniversary' => 1.1,
            'baby-shower' => 0.9,
            'graduation' => 0.9,
            'other' => 1.0,
        ],

        // Budget Range Multipliers
        'budget_multipliers' => [
            'under-5k' => 0.8,
            '5k-10k' => 1.0,
            '10k-20k' => 1.2,
            '20k-50k' => 1.5,
            '50k-plus' => 2.0,
        ],

        // Time Decay Settings
        'time_decay' => [
            'days_until_decay' => 7,
            'decay_rate' => 0.05, // 5% per week after inactivity
        ],

        // Status Thresholds
        'status_thresholds' => [
            'cold' => ['min' => 0, 'max' => 20],
            'warm' => ['min' => 21, 'max' => 50],
            'hot' => ['min' => 51, 'max' => PHP_INT_MAX],
        ],
    ];

    /**
     * Calculate lead score for a given lead
     */
    public function calculateScore(Lead $lead): int
    {
        $score = 0;

        // Base score from activities
        $score += $this->calculateActivityScore($lead);

        // Profile completion score
        $score += $this->calculateProfileScore($lead);

        // Apply multipliers
        $score = $this->applyMultipliers($lead, $score);

        // Apply time decay
        $score = $this->applyTimeDecay($lead, $score);

        // Ensure score doesn't go below 0
        return max(0, (int) $score);
    }

    /**
     * Calculate score from lead activities
     */
    protected function calculateActivityScore(Lead $lead): int
    {
        $score = 0;
        $activities = $lead->activities()
            ->where('created_at', '>=', Carbon::now()->subDays(90))
            ->get();

        foreach ($activities as $activity) {
            $activityType = $activity->activity_type;
            $points = $this->pointValues['activities'][$activityType] ?? 0;

            // Frequency caps to prevent gaming
            $frequencyCap = $this->getFrequencyCap($activityType);
            $recentCount = $activities
                ->where('activity_type', $activityType)
                ->where('created_at', '>=', $activity->created_at->subHours(24))
                ->count();

            if ($recentCount <= $frequencyCap) {
                $score += $points;
            } else {
                // Reduced points after frequency cap
                $score += (int) ($points * 0.1);
            }
        }

        return $score;
    }

    /**
     * Calculate score from profile completion
     */
    protected function calculateProfileScore(Lead $lead): int
    {
        $score = 0;

        if ($lead->phone) {
            $score += $this->pointValues['profile']['phone_provided'];
        }

        if ($lead->event_date) {
            $score += $this->pointValues['profile']['event_date_provided'];
        }

        if ($lead->budget_range) {
            $score += $this->pointValues['profile']['budget_provided'];
        }

        if ($lead->location) {
            $score += $this->pointValues['profile']['location_provided'];
        }

        return $score;
    }

    /**
     * Apply multipliers based on event type and budget
     */
    protected function applyMultipliers(Lead $lead, int $score): float
    {
        $multiplier = 1.0;

        // Event type multiplier
        if ($lead->event_type && isset($this->pointValues['event_type_multipliers'][$lead->event_type])) {
            $multiplier *= $this->pointValues['event_type_multipliers'][$lead->event_type];
        }

        // Budget multiplier
        if ($lead->budget_range && isset($this->pointValues['budget_multipliers'][$lead->budget_range])) {
            $multiplier *= $this->pointValues['budget_multipliers'][$lead->budget_range];
        }

        return $score * $multiplier;
    }

    /**
     * Apply time decay to score based on inactivity
     */
    protected function applyTimeDecay(Lead $lead, float $score): float
    {
        $lastActivity = $lead->last_activity_at ?: $lead->created_at;
        $daysInactive = $lastActivity->diffInDays(Carbon::now());

        $decayDays = $this->pointValues['time_decay']['days_until_decay'];
        $decayRate = $this->pointValues['time_decay']['decay_rate'];

        if ($daysInactive > $decayDays) {
            $weeksInactive = floor(($daysInactive - $decayDays) / 7);
            $decayFactor = pow(1 - $decayRate, $weeksInactive);
            $score *= $decayFactor;
        }

        return $score;
    }

    /**
     * Determine lead status based on score
     */
    public function determineStatus(int $score): string
    {
        foreach ($this->pointValues['status_thresholds'] as $status => $range) {
            if ($score >= $range['min'] && $score <= $range['max']) {
                return $status;
            }
        }

        return 'cold';
    }

    /**
     * Update lead score and status
     */
    public function updateLeadScore(Lead $lead): void
    {
        $score = $this->calculateScore($lead);
        $status = $this->determineStatus($score);

        $lead->update([
            'lead_score' => $score,
            'lead_status' => $status,
        ]);
    }

    /**
     * Log activity and update score
     */
    public function logActivity(
        Lead $lead,
        string $activityType,
        ?string $description = null,
        ?array $metadata = null,
        ?string $pageUrl = null
    ): LeadActivity {
        // Get points for this activity
        $points = $this->pointValues['activities'][$activityType] ?? 0;

        // Create activity record
        $activity = $lead->activities()->create([
            'activity_type' => $activityType,
            'description' => $description,
            'metadata' => $metadata,
            'points_earned' => $points,
            'page_url' => $pageUrl,
            'ip_address' => request()->ip(),
        ]);

        // Update lead's last activity
        $lead->update([
            'last_activity_at' => now(),
        ]);

        // Recalculate score
        $this->updateLeadScore($lead);

        return $activity;
    }

    /**
     * Get frequency cap for activity type
     */
    protected function getFrequencyCap(string $activityType): int
    {
        $caps = [
            'email_open' => 5,
            'link_click' => 10,
            'page_view' => 20,
            'form_submit' => 1,
            'pricing_page_view' => 3,
            'vendor_profile_view' => 10,
            'booking_initiated' => 1,
            'wishlist_add' => 5,
        ];

        return $caps[$activityType] ?? 10;
    }

    /**
     * Get hot leads (high priority)
     */
    public function getHotLeads(int $limit = 50): \Illuminate\Database\Eloquent\Collection
    {
        return Lead::where('lead_status', 'hot')
            ->where('email_subscribed', true)
            ->orderBy('lead_score', 'desc')
            ->orderBy('last_activity_at', 'desc')
            ->take($limit)
            ->get();
    }

    /**
     * Get leads needing attention (cold but high potential)
     */
    public function getNurtureLeads(int $limit = 50): \Illuminate\Database\Eloquent\Collection
    {
        return Lead::whereIn('lead_status', ['cold', 'warm'])
            ->where('email_subscribed', true)
            ->where('created_at', '<=', now()->subDays(3))
            ->orderBy('lead_score', 'desc')
            ->take($limit)
            ->get();
    }

    /**
     * Get scoring statistics
     */
    public function getStatistics(): array
    {
        return [
            'total_leads' => Lead::count(),
            'hot_leads' => Lead::where('lead_status', 'hot')->count(),
            'warm_leads' => Lead::where('lead_status', 'warm')->count(),
            'cold_leads' => Lead::where('lead_status', 'cold')->count(),
            'avg_score' => Lead::avg('lead_score') ?? 0,
            'max_score' => Lead::max('lead_score') ?? 0,
        ];
    }
}
