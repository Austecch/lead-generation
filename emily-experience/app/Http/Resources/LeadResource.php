<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class LeadResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'email' => $this->email,
            'first_name' => $this->first_name,
            'last_name' => $this->last_name,
            'phone' => $this->phone,
            'event_type' => $this->event_type,
            'event_date' => $this->event_date?->format('Y-m-d'),
            'budget_range' => $this->budget_range,
            'location' => $this->location,
            'score' => $this->score,
            'status' => $this->status,
            'source' => $this->utm_source,
            'landing_page_id' => $this->landing_page_id,
            'last_activity_at' => $this->updated_at,
            'created_at' => $this->created_at,
        ];
    }
}
