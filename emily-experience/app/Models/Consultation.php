<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Consultation extends Model
{
    use HasFactory;

    protected $fillable = [
        'lead_id',
        'scheduled_for',
        'duration_minutes',
        'planner_id',
        'status',
        'meeting_link',
        'notes',
        'outcome',
        'completed_at',
    ];

    protected $casts = [
        'scheduled_for' => 'datetime',
        'completed_at' => 'datetime',
    ];

    /**
     * Get the lead associated with the consultation
     */
    public function lead()
    {
        return $this->belongsTo(Lead::class);
    }

    /**
     * Get the assigned planner
     */
    public function planner()
    {
        return $this->belongsTo(User::class, 'planner_id');
    }

    /**
     * Scope for upcoming consultations
     */
    public function scopeUpcoming($query)
    {
        return $query->where('scheduled_for', '>', now())
            ->where('status', '!=', 'cancelled')
            ->orderBy('scheduled_for', 'asc');
    }

    /**
     * Scope for completed consultations
     */
    public function scopeCompleted($query)
    {
        return $query->where('status', 'completed')->orderBy('completed_at', 'desc');
    }

    /**
     * Mark consultation as completed
     */
    public function markCompleted(string $outcome = null): void
    {
        $this->update([
            'status' => 'completed',
            'outcome' => $outcome,
            'completed_at' => now(),
        ]);
    }

    /**
     * Cancel consultation
     */
    public function cancel(string $reason = null): void
    {
        $this->update([
            'status' => 'cancelled',
            'notes' => $reason,
        ]);
    }

    /**
     * Check if this time slot is available
     */
    public static function isSlotAvailable(\DateTime $dateTime, int $durationMinutes = 30): bool
    {
        $endTime = (clone $dateTime)->modify("+{$durationMinutes} minutes");

        return !self::where('status', '!=', 'cancelled')
            ->where(function ($query) use ($dateTime, $endTime) {
                $query->where('scheduled_for', '<', $endTime)
                    ->where(
                        \DB::raw("DATE_ADD(scheduled_for, INTERVAL duration_minutes MINUTE)"),
                        '>',
                        $dateTime
                    );
            })
            ->exists();
    }
}
