<?php

namespace App\Jobs;

use App\Models\EmailCampaign;
use App\Models\Lead;
use App\Services\EmailService;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\DB;

class SendEmailCampaign implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public function __construct(protected EmailCampaign $campaign)
    {
    }

    public function handle(EmailService $emailService): void
    {
        // Get targeting parameters
        $targetSegment = json_decode($this->campaign->target_segment, true);
        $segmentParams = json_decode($this->campaign->segment_params, true);

        // Build query based on segment
        $query = Lead::query();

        if (in_array('all', $targetSegment)) {
            // Send to all opted-in leads
            $query->where('email_opt_in', true);
        } else if (in_array('hot', $targetSegment)) {
            $query->where('status', 'hot')->where('email_opt_in', true);
        } else if (in_array('warm', $targetSegment)) {
            $query->where('status', 'warm')->where('email_opt_in', true);
        } else if (in_array('cold', $targetSegment)) {
            $query->where('status', 'cold')->where('email_opt_in', true);
        } else if (in_array('by_event_type', $targetSegment) && isset($segmentParams['event_type'])) {
            $query->where('event_type', $segmentParams['event_type'])->where('email_opt_in', true);
        } else if (in_array('by_budget', $targetSegment) && isset($segmentParams['budget_range'])) {
            $query->where('budget_range', $segmentParams['budget_range'])->where('email_opt_in', true);
        }

        $leads = $query->get();

        // Send email to each lead
        foreach ($leads as $lead) {
            foreach ($this->campaign->templates as $template) {
                SendCampaignEmailToLead::dispatch($lead, $this->campaign, $template)
                    ->onQueue(config('queue.campaigns'))
                    ->delay(now()->addSeconds(rand(1, 60))); // Stagger sends
            }
        }

        $this->campaign->update(['status' => 'sent', 'sent_at' => now()]);
    }
}
