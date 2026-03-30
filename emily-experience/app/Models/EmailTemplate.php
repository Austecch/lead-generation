<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EmailTemplate extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'type',
        'subject',
        'content',
        'sequence',
        'variables',
        'description',
    ];

    protected $casts = [
        'variables' => 'json',
    ];

    /**
     * Get campaigns using this template
     */
    public function campaigns()
    {
        return $this->belongsToMany(EmailCampaign::class, 'email_campaign_template');
    }

    /**
     * Get email logs for this template
     */
    public function emailLogs()
    {
        return $this->hasMany(EmailLog::class);
    }
}
