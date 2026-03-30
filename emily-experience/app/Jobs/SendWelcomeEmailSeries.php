<?php

namespace App\Jobs;

use App\Models\Lead;
use App\Services\EmailService;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

class SendWelcomeEmailSeries implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public function __construct(protected Lead $lead)
    {
    }

    public function handle(EmailService $emailService): void
    {
        // Send immediate welcome email
        $emailService->sendWelcomeEmail($this->lead);

        // Schedule follow-up emails
        SendSequenceEmail::dispatch($this->lead, 2)->delay(now()->addDays(2));
        SendSequenceEmail::dispatch($this->lead, 5)->delay(now()->addDays(5));
        SendSequenceEmail::dispatch($this->lead, 7)->delay(now()->addDays(7));
        SendSequenceEmail::dispatch($this->lead, 14)->delay(now()->addDays(14));
    }
}
