<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('lead_activities', function (Blueprint $table) {
            $table->id();
            $table->foreignId('lead_id')->constrained()->onDelete('cascade');
            $table->string('activity_type'); // page_view, email_open, link_click, form_submit, etc.
            $table->string('description')->nullable();
            $table->json('metadata')->nullable(); // Store additional data
            $table->integer('points_earned')->default(0);
            $table->string('page_url')->nullable();
            $table->string('ip_address')->nullable();
            $table->timestamp('created_at');

            $table->index(['lead_id', 'activity_type']);
            $table->index(['lead_id', 'created_at']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('lead_activities');
    }
};
