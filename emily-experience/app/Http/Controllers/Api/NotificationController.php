<?php

namespace App\Http\Controllers\Api;

use App\Http\Resources\NotificationResource;
use App\Models\Notification;
use App\Models\NotificationPreference;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class NotificationController extends Controller
{
    /**
     * List user notifications
     */
    public function index(Request $request): JsonResponse
    {
        $query = Auth::user()->notifications()
            ->with('user')
            ->notExpired();

        // Filter by read status
        if ($request->has('status')) {
            if ($request->status === 'unread') {
                $query->unread();
            } elseif ($request->status === 'read') {
                $query->read();
            }
        }

        // Filter by type
        if ($request->has('type')) {
            $query->byType($request->type);
        }

        // Filter by priority
        if ($request->has('priority')) {
            $query->where('priority', $request->priority);
        }

        // Sort
        $sortBy = $request->input('sort_by', 'created_at');
        $sortOrder = $request->input('sort_order', 'desc');
        $query->orderBy($sortBy, $sortOrder);

        $notifications = $query->paginate($request->input('per_page', 20));

        return $this->paginated(
            NotificationResource::collection($notifications),
            'Notifications retrieved successfully'
        );
    }

    /**
     * Get unread count
     */
    public function unreadCount(): JsonResponse
    {
        $count = Auth::user()
            ->notifications()
            ->unread()
            ->notExpired()
            ->count();

        $highPriorityCount = Auth::user()
            ->notifications()
            ->unread()
            ->highPriority()
            ->notExpired()
            ->count();

        return $this->success([
            'unread_count' => $count,
            'high_priority_count' => $highPriorityCount,
        ], 'Unread count retrieved');
    }

    /**
     * Get recent notifications (for dropdown)
     */
    public function recent(Request $request): JsonResponse
    {
        $notifications = Auth::user()
            ->notifications()
            ->with('user')
            ->notExpired()
            ->recent($request->input('limit', 10))
            ->get();

        return $this->success(
            NotificationResource::collection($notifications),
            'Recent notifications retrieved'
        );
    }

    /**
     * Mark notification as read
     */
    public function markAsRead(Notification $notification): JsonResponse
    {
        $this->authorize('update', $notification);

        $notification->markAsRead();

        return $this->success(
            new NotificationResource($notification->fresh()),
            'Notification marked as read'
        );
    }

    /**
     * Mark all notifications as read
     */
    public function markAllAsRead(): JsonResponse
    {
        Auth::user()
            ->notifications()
            ->unread()
            ->update(['read_at' => now()]);

        return $this->success(null, 'All notifications marked as read');
    }

    /**
     * Mark notification as unread
     */
    public function markAsUnread(Notification $notification): JsonResponse
    {
        $this->authorize('update', $notification);

        $notification->markAsUnread();

        return $this->success(
            new NotificationResource($notification->fresh()),
            'Notification marked as unread'
        );
    }

    /**
     * Delete notification
     */
    public function destroy(Notification $notification): JsonResponse
    {
        $this->authorize('delete', $notification);

        $notification->delete();

        return $this->success(null, 'Notification deleted successfully');
    }

    /**
     * Get notification preferences
     */
    public function getPreferences(): JsonResponse
    {
        $preferences = Auth::user()
            ->notificationPreferences()
            ->get()
            ->groupBy('channel');

        return $this->success($preferences, 'Preferences retrieved');
    }

    /**
     * Update notification preferences
     */
    public function updatePreferences(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'preferences' => 'required|array',
            'preferences.*.channel' => 'required|in:email,sms,push,in_app',
            'preferences.*.type' => 'required|in:booking,payment,marketing,system',
            'preferences.*.enabled' => 'required|boolean',
        ]);

        foreach ($validated['preferences'] as $pref) {
            NotificationPreference::updateOrCreate(
                [
                    'user_id' => Auth::id(),
                    'channel' => $pref['channel'],
                    'type' => $pref['type'],
                ],
                ['enabled' => $pref['enabled']]
            );
        }

        return $this->success(
            Auth::user()->notificationPreferences()->get()->groupBy('channel'),
            'Preferences updated successfully'
        );
    }

    /**
     * Create test notification (for development)
     */
    public function createTest(Request $request): JsonResponse
    {
        if (app()->environment('production')) {
            return $this->error('Test notifications disabled in production', null, 403);
        }

        $validated = $request->validate([
            'type' => 'required|string',
            'title' => 'required|string',
            'message' => 'required|string',
            'priority' => 'in:low,normal,high,urgent',
        ]);

        $notification = Auth::user()->notifications()->create([
            ...$validated,
            'icon' => Notification::getIconForType($validated['type']),
            'priority' => $validated['priority'] ?? 'normal',
            'action_url' => '/dashboard',
            'action_text' => 'View Details',
        ]);

        return $this->success(
            new NotificationResource($notification),
            'Test notification created',
            201
        );
    }
}
