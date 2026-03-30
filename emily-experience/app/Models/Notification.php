<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Notification extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'type',
        'title',
        'message',
        'data',
        'action_url',
        'action_text',
        'icon',
        'priority',
        'read_at',
        'expires_at',
    ];

    protected $casts = [
        'data' => 'json',
        'read_at' => 'datetime',
        'expires_at' => 'datetime',
    ];

    protected $appends = ['is_read', 'time_ago'];

    // Relationships
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    // Scopes
    public function scopeUnread($query)
    {
        return $query->whereNull('read_at');
    }

    public function scopeRead($query)
    {
        return $query->whereNotNull('read_at');
    }

    public function scopeForUser($query, $userId)
    {
        return $query->where('user_id', $userId);
    }

    public function scopeRecent($query, $limit = 20)
    {
        return $query->orderBy('created_at', 'desc')->limit($limit);
    }

    public function scopeByType($query, $type)
    {
        return $query->where('type', $type);
    }

    public function scopeHighPriority($query)
    {
        return $query->whereIn('priority', ['high', 'urgent']);
    }

    public function scopeNotExpired($query)
    {
        return $query->where(function ($q) {
            $q->whereNull('expires_at')
              ->orWhere('expires_at', '>', now());
        });
    }

    // Accessors
    public function getIsReadAttribute(): bool
    {
        return $this->read_at !== null;
    }

    public function getTimeAgoAttribute(): string
    {
        return $this->created_at->diffForHumans();
    }

    // Methods
    public function markAsRead(): void
    {
        if (!$this->read_at) {
            $this->update(['read_at' => now()]);
        }
    }

    public function markAsUnread(): void
    {
        $this->update(['read_at' => null]);
    }

    // Notification type helpers
    public static function getIconForType(string $type): string
    {
        $icons = [
            'booking_confirmed' => '✅',
            'booking_cancelled' => '❌',
            'payment_received' => '💰',
            'payment_failed' => '⚠️',
            'vendor_message' => '💬',
            'event_reminder' => '⏰',
            'ticket_purchased' => '🎫',
            'review_received' => '⭐',
            'system' => '🔔',
            'welcome' => '👋',
        ];

        return $icons[$type] ?? '🔔';
    }

    public static function getColorForPriority(string $priority): string
    {
        $colors = [
            'low' => 'gray',
            'normal' => 'blue',
            'high' => 'orange',
            'urgent' => 'red',
        ];

        return $colors[$priority] ?? 'blue';
    }
}
