<?php

namespace App\Services;

use App\Models\Lead;
use App\Models\EmailCampaign;
use App\Models\EmailLog;
use App\Models\EmailTemplate;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\View;

class EmailService
{
    /**
     * Send welcome email to lead
     */
    public function sendWelcomeEmail(Lead $lead): EmailLog
    {
        $template = EmailTemplate::where('type', 'welcome')
            ->where('sequence', 1)
            ->firstOrFail();

        return $this->sendEmail($lead, $template, [
            'first_name' => $lead->first_name ?? 'Friend',
            'event_date' => $lead->event_date?->format('F j, Y') ?? 'upcoming',
            'lead_magnet_url' => $this->generateLeadMagnetUrl($lead),
        ]);
    }

    /**
     * Send email sequence email
     */
    public function sendSequenceEmail(Lead $lead, int $day): ?EmailLog
    {
        $template = EmailTemplate::where('type', 'welcome_series')
            ->where('sequence', $this->dayToSequence($day))
            ->first();

        if (!$template) {
            return null;
        }

        $personalizedContent = $this->personalizeTemplate($template->content, [
            'first_name' => $lead->first_name ?? 'Friend',
            'event_type' => $lead->event_type ?? 'event',
            'location' => $lead->location ?? 'your area',
            'budget_range' => $lead->budget_range ?? 'custom budget',
        ]);

        $template->content = $personalizedContent;

        return $this->sendEmail($lead, $template);
    }

    /**
     * Send campaign email
     */
    public function sendCampaignEmail(Lead $lead, EmailCampaign $campaign, EmailTemplate $template): EmailLog
    {
        $personalizedContent = $this->personalizeTemplate($template->content, [
            'first_name' => $lead->first_name ?? 'Friend',
            'event_type' => $lead->event_type ?? 'event',
            'location' => $lead->location ?? 'your area',
            'budget_range' => $lead->budget_range ?? 'custom budget',
            'discount_code' => 'EMILY10',
            'discount_percentage' => 10,
        ]);

        $template->content = $personalizedContent;

        return $this->sendEmail($lead, $template, [], $campaign->id);
    }

    /**
     * Core email sending method
     */
    protected function sendEmail(
        Lead $lead,
        EmailTemplate $template,
        array $customData = [],
        ?string $campaignId = null
    ): EmailLog
    {
        try {
            // Create email log entry
            $log = EmailLog::create([
                'lead_id' => $lead->id,
                'email_campaign_id' => $campaignId,
                'email_template_id' => $template->id,
                'recipient_email' => $lead->email,
                'subject' => $template->subject,
                'status' => 'queued',
                'sent_at' => null,
            ]);

            // Build email content
            $htmlContent = $template->content;
            $subject = $template->subject;

            
            // Replace variables
            foreach ($customData as $key => $value) {
                $htmlContent = str_replace([
                    '{{'.$key.'}}',
                    '{{ '.$key.' }}',
                    '{{' . $key . '}}',
                ], $value, $htmlContent);

                $subject = str_replace([
                    '{{'.$key.'}}',
                    '{{ '.$key.' }}',
                    '{{' . $key . '}}',
                ], $value, $subject);
            }

            // Queue for sending (use Laravel's mail queue)
            Mail::queue(function ($message) use ($lead, $htmlContent, $subject) {
                $message
                    ->to($lead->email, $lead->first_name)
                    ->subject($subject)
                    ->html($htmlContent)
                    ->from(config('mail.from.address'), config('mail.from.name'));
            });

            $log->update(['status' => 'sent', 'sent_at' => now()]);

            return $log;
        } catch (\Exception $e) {
            $log->update([
                'status' => 'failed',
                'error_message' => $e->getMessage(),
            ]);

            throw $e;
        }
    }

    /**
     * Track email opening
     */
    public function trackEmailOpen(string $logId): void
    {
        $log = EmailLog::find($logId);
        if ($log) {
            $log->update([
                'opened_at' => now(),
                'opened_count' => ($log->opened_count ?? 0) + 1,
            ]);
        }
    }

    /**
     * Track email link click
     */
    public function trackLinkClick(string $logId): void
    {
        $log = EmailLog::find($logId);
        if ($log) {
            $log->update([
                'clicked_at' => now(),
                'click_count' => ($log->click_count ?? 0) + 1,
            ]);

            // Log activity for lead scoring
            if ($log->lead) {
                app(LeadScoringService::class)->logActivity(
                    $log->lead,
                    'link_click',
                    ['email_campaign_id' => $log->email_campaign_id]
                );
            }
        }
    }

    /**
     * Personalize template content
     */
    protected function personalizeTemplate(string $template, array $data): string
    {
        $content = $template;

        foreach ($data as $key => $value) {
            $content = str_replace(
                ['{{' . $key . '}}', '{{ ' . $key . ' }}'],
                $value,
                $content
            );
        }

        return $content;
    }

    /**
     * Generate lead magnet URL (tracking pixel)
     */
    protected function generateLeadMagnetUrl(Lead $lead): string
    {
        return route('api.leads.download-magnet', [
            'lead_id' => $lead->id,
            'token' => base64_encode($lead->email),
        ]);
    }

    /**
     * Map day to email sequence number
     */
    protected function dayToSequence(int $day): int
    {
        return match ($day) {
            1 => 1,
            2 => 2,
            5 => 3,
            7 => 4,
            14 => 5,
            default => 1,
        };
    }

    /**
     * Get unsubscribe token for email
     */
    public function generateUnsubscribeToken(Lead $lead): string
    {
        return hash('sha256', $lead->id . config('app.key'));
    }

    /**
     * Handle unsubscribe
     */
    public function handleUnsubscribe(Lead $lead): void
    {
        $lead->update([
            'email_opt_in' => false,
            'unsubscribed_at' => now(),
        ]);
    }
}
