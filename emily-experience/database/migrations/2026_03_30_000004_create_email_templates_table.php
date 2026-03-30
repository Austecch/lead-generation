<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('email_templates', function (Blueprint $table) {
            $table->id();
            $table->foreignId('campaign_id')->nullable()->constrained('email_campaigns')->onDelete('cascade');
            $table->string('name');
            $table->string('subject_line');
            $table->string('preview_text')->nullable();
            $table->text('html_content');
            $table->text('text_content')->nullable();
            $table->integer('sequence_order')->default(0); // Order in welcome series
            $table->integer('delay_days')->default(0); // Days after trigger
            $table->integer('delay_hours')->default(0);
            $table->json('personalization_vars')->nullable(); // Available merge tags
            $table->string('status')->default('active');
            $table->timestamps();

            $table->index(['campaign_id', 'sequence_order']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('email_templates');
    }
};
