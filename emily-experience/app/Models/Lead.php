<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Lead extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'email',
        'first_name',
        'last_name',
        'phone',
        'event_type',
        'event_date',
        'budget_range',
        'location',
        'lead_source',
        'lead_magnet',
        'landing_page_id',
        'utm_source',
        'utm_medium',
        'utm_campaign',
        'utm_content',
        'score',
        'status',
        'profile_score',
        'activity_score',
        'engagement_score',
        'last_activity_at',
        'converted_at',
        'converted_value',
        'revenue',
        'custom_fields',
        'preferences',
        'email_opt_in',
        'email_subscribed',
        'sms_subscribed',
        'unsubscribed_at',
        'ip_address',
        'user_agent',
        'referrer',
    ];

    protected $casts = [
        'event_date' => 'date',
        'last_activity_at' => 'datetime',
        'converted_at' => 'datetime',
        'unsubscribed_at' => 'datetime',
        'converted_value' => 'decimal:2',
        'custom_fields' => 'json',
        'preferences' => 'json',
        'email_opt_in' => 'boolean',
        'email_subscribed' => 'boolean',
        'sms_subscribed' => 'boolean',
    ];

    /**
     * Get lead's activities
     */
    public function activities()
    {
        return $this->hasMany(LeadActivity::class)->orderBy('created_at', 'desc');
    }

    /**
     * Get latest activity
     */
    public function latestActivity()
    {
        return $this->hasOne(LeadActivity::class)->latest('created_at');
    }

    /**
     * Get lead's email logs
     */
    public function emailLogs()
    {
        return $this->hasMany(EmailLog::class)->orderBy('sent_at', 'desc');
    }

    /**
     * Get lead's consultations
     */
    public function consultations()
    {
        return $this->hasMany(Consultation::class)->orderBy('scheduled_for', 'desc');
    }

    /**
     * Scope for hot leads
     */
    public function scopeHot($query)
    {
        return $query->where('status', 'hot');
    }

    /**
     * Scope for warm leads
     */
    public function scopeWarm($query)
    {
        return $query->where('status', 'warm');
    }

    /**
     * Scope for cold leads
     */
    public function scopeCold($query)
    {
        return $query->where('status', 'cold');
    }

    /**
     * Scope for subscribed leads
     */
    public function scopeSubscribed($query)
    {
        return $query->where('email_subscribed', true);
    }

    /**
     * Scope for converted leads
     */
    public function scopeConverted($query)
    {
        return $query->whereNotNull('converted_at');
    }

    /**
     * Scope for recent leads
     */
    public function scopeRecent($query, $days = 7)
    {
        return $query->where('created_at', '>=', now()->subDays($days));
    }

    /**
     * Get full name attribute
     */
    public function getFullNameAttribute(): string
    {
        return trim("{$this->first_name} {$this->last_name}");
    }

    /**
     * Mark as converted
     */
    public function markAsConverted(float $value = 0): void
    {
        $this->update([
            'converted_at' => now(),
            'converted_value' => $value,
        ]);
    }

    /**
     * Unsubscribe from emails
     */
    public function unsubscribe(): void
    {
        $this->update(['email_subscribed' => false]);
    }
}
