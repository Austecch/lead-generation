<?php

namespace App\Jobs;

use App\Models\Lead;
use App\Models\EmailCampaign;
use App\Models\EmailTemplate;
use App\Services\EmailService;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

class SendCampaignEmailToLead implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public function __construct(
        protected Lead $lead,
        protected EmailCampaign $campaign,
        protected EmailTemplate $template
    ) {
    }

    public function handle(EmailService $emailService): void
    {
        if (!$this->lead->email_opt_in) {
            return;
        }

        $emailService->sendCampaignEmail($this->lead, $this->campaign, $this->template);
    }
}
