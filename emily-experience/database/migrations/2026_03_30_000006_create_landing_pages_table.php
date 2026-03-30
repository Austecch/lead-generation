<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('landing_pages', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('slug')->unique();
            $table->string('lead_magnet_type'); // checklist, calculator, guide, consultation
            $table->string('title');
            $table->text('headline');
            $table->text('subheadline')->nullable();
            $table->text('hero_description')->nullable();
            $table->string('hero_image')->nullable();
            $table->json('benefits'); // Array of benefit objects
            $table->json('social_proof'); // Testimonials, stats
            $table->json('form_fields'); // Required form fields
            $table->string('thank_you_page')->nullable();
            $table->string('redirect_url')->nullable(); // After form submission
            $table->string('download_url')->nullable(); // Lead magnet download
            $table->string('status')->default('draft');
            $table->integer('conversion_count')->default(0);
            $table->integer('view_count')->default(0);
            $table->decimal('conversion_rate', 5, 2)->default(0);
            $table->json('seo_meta')->nullable();
            $table->json('tracking_pixels')->nullable();
            $table->timestamp('published_at')->nullable();
            $table->timestamps();
            $table->softDeletes();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('landing_pages');
    }
};
