<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class NotificationPreference extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'channel',
        'type',
        'enabled',
    ];

    protected $casts = [
        'enabled' => 'boolean',
    ];

    // Relationships
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    // Scopes
    public function scopeEnabled($query)
    {
        return $query->where('enabled', true);
    }

    public function scopeForChannel($query, $channel)
    {
        return $query->where('channel', $channel);
    }

    public function scopeForType($query, $type)
    {
        return $query->where('type', $type);
    }

    // Default preferences for new users
    public static function createDefaultsForUser(int $userId): void
    {
        $defaults = [
            ['channel' => 'in_app', 'type' => 'booking', 'enabled' => true],
            ['channel' => 'in_app', 'type' => 'payment', 'enabled' => true],
            ['channel' => 'in_app', 'type' => 'system', 'enabled' => true],
            ['channel' => 'email', 'type' => 'booking', 'enabled' => true],
            ['channel' => 'email', 'type' => 'payment', 'enabled' => true],
            ['channel' => 'email', 'type' => 'system', 'enabled' => false],
            ['channel' => 'push', 'type' => 'booking', 'enabled' => false],
            ['channel' => 'push', 'type' => 'payment', 'enabled' => false],
        ];

        foreach ($defaults as $pref) {
            self::firstOrCreate([
                'user_id' => $userId,
                'channel' => $pref['channel'],
                'type' => $pref['type'],
            ], [
                'enabled' => $pref['enabled'],
            ]);
        }
    }
}
