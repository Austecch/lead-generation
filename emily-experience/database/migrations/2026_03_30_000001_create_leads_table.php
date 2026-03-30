<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('leads', function (Blueprint $table) {
            $table->id();
            $table->string('email')->index();
            $table->string('first_name')->nullable();
            $table->string('last_name')->nullable();
            $table->string('phone')->nullable();
            $table->string('event_type')->nullable(); // wedding, corporate, birthday, etc.
            $table->date('event_date')->nullable();
            $table->string('budget_range')->nullable(); // under-5k, 5k-20k, 20k-plus
            $table->string('location')->nullable();
            $table->string('lead_source')->nullable(); // organic, paid, social, referral
            $table->string('lead_magnet')->nullable(); // checklist, calculator, guide
            $table->string('landing_page')->nullable(); // URL of the landing page
            $table->string('utm_source')->nullable();
            $table->string('utm_medium')->nullable();
            $table->string('utm_campaign')->nullable();
            $table->string('utm_content')->nullable();
            $table->integer('lead_score')->default(0);
            $table->string('lead_status')->default('cold'); // cold, warm, hot
            $table->timestamp('last_activity_at')->nullable();
            $table->timestamp('converted_at')->nullable();
            $table->decimal('converted_value', 10, 2)->nullable();
            $table->json('custom_fields')->nullable();
            $table->json('preferences')->nullable();
            $table->boolean('email_subscribed')->default(true);
            $table->boolean('sms_subscribed')->default(false);
            $table->string('ip_address')->nullable();
            $table->string('user_agent')->nullable();
            $table->string('referrer')->nullable();
            $table->timestamps();
            $table->softDeletes();

            // Indexes for common queries
            $table->index(['lead_status', 'lead_score']);
            $table->index(['event_type', 'created_at']);
            $table->index('lead_source');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('leads');
    }
};
