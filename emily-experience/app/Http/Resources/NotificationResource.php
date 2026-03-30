<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class NotificationResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'type' => $this->type,
            'title' => $this->title,
            'message' => $this->message,
            'data' => $this->data,
            'icon' => $this->icon ?? Notification::getIconForType($this->type),
            'priority' => $this->priority,
            'priority_color' => Notification::getColorForPriority($this->priority),
            'action' => $this->when($this->action_url, function () {
                return [
                    'url' => $this->action_url,
                    'text' => $this->action_text ?? 'View',
                ];
            }),
            'status' => [
                'is_read' => $this->is_read,
                'read_at' => $this->read_at?->toISOString(),
            ],
            'meta' => [
                'created_at' => $this->created_at->toISOString(),
                'time_ago' => $this->time_ago,
                'expires_at' => $this->expires_at?->toISOString(),
            ],
        ];
    }
}
