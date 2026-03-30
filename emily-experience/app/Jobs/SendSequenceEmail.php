<?php

namespace App\Jobs;

use App\Models\Lead;
use App\Services\EmailService;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

class SendSequenceEmail implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public function __construct(protected Lead $lead, protected int $day)
    {
    }

    public function handle(EmailService $emailService): void
    {
        // Check if lead is still opted in
        if (!$this->lead->email_opt_in) {
            return;
        }

        $emailService->sendSequenceEmail($this->lead, $this->day);
    }
}
