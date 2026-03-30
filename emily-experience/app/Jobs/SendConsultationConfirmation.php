<?php

namespace App\Jobs;

use App\Models\Consultation;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Mail;

class SendConsultationConfirmation implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public function __construct(protected Consultation $consultation)
    {
    }

    public function handle(): void
    {
        $lead = $this->consultation->lead;
        $planner = $this->consultation->planner;

        // Send confirmation email to lead
        Mail::send('emails.consultation-confirmation', [
            'lead' => $lead,
            'consultation' => $this->consultation,
            'planner' => $planner,
        ], function ($message) use ($lead) {
            $message
                ->to($lead->email)
                ->subject('Your Emily Experience Consultation is Confirmed!')
                ->from(config('mail.from.address'), config('mail.from.name'));
        });

        // Send notification to planner
        Mail::send('emails.consultation-planner-notification', [
            'lead' => $lead,
            'consultation' => $this->consultation,
            'planner' => $planner,
        ], function ($message) use ($planner) {
            $message
                ->to($planner->email)
                ->subject('New Consultation Scheduled: ' . $lead->first_name)
                ->from(config('mail.from.address'), config('mail.from.name'));
        });

        // Log activity for lead scoring
        app(\App\Services\LeadScoringService::class)->logActivity(
            $lead,
            'consultation_scheduled',
            ['consultation_id' => $this->consultation->id]
        );
    }
}
