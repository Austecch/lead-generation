<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EmailCampaign extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'description',
        'type',
        'status',
        'target_segment',
        'segment_params',
        'scheduled_for',
        'sent_at',
    ];

    protected $casts = [
        'target_segment' => 'json',
        'segment_params' => 'json',
        'scheduled_for' => 'datetime',
        'sent_at' => 'datetime',
    ];

    /**
     * Get templates for this campaign
     */
    public function templates()
    {
        return $this->belongsToMany(EmailTemplate::class, 'email_campaign_template');
    }

    /**
     * Get email logs for this campaign
     */
    public function logs()
    {
        return $this->hasMany(EmailLog::class);
    }

    /**
     * Get statistics for campaign
     */
    public function getStats()
    {
        $logs = $this->logs()->get();

        return [
            'sent' => $logs->where('status', 'sent')->count(),
            'opened' => $logs->where('opened_at', '!=', null)->count(),
            'clicked' => $logs->where('clicked_at', '!=', null)->count(),
            'bounced' => $logs->where('status', 'bounced')->count(),
            'unsubscribed' => $logs->where('status', 'unsubscribed')->count(),
        ];
    }
}
