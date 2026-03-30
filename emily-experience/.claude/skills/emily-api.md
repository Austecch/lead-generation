---
name: emily-api
description: Generate Laravel API controllers, routes, resources, and validation logic for the Emily Experience platform. Follows RESTful conventions with proper error handling and authentication.
---

# Emily Experience API Skill

Generate RESTful API endpoints for the Emily Experience platform.

## API Architecture

### Base URL
```
/api/v1
```

### Authentication
Use Laravel Sanctum for token-based authentication.

```php
// Headers required
Authorization: Bearer {token}
Accept: application/json
Content-Type: application/json
```

### Response Format

**Success Response:**
```json
{
    "success": true,
    "message": "Operation successful",
    "data": { ... },
    "meta": {
        "current_page": 1,
        "last_page": 10,
        "per_page": 20,
        "total": 200
    }
}
```

**Error Response:**
```json
{
    "success": false,
    "message": "Validation failed",
    "errors": {
        "field_name": ["Error message"]
    }
}
```

## Route Patterns

### API Routes File

```php
<?php
// routes/api.php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api;

Route::group(['prefix' => 'v1'], function () {
    // Public routes
    Route::get('/vendors', [VendorController::class, 'index']);
    Route::get('/vendors/{slug}', [VendorController::class, 'show']);
    Route::get('/products', [ProductController::class, 'index']);
    Route::get('/products/{slug}', [ProductController::class, 'show']);
    Route::get('/events/public', [EventController::class, 'public']);

    // Auth routes
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/login', [AuthController::class, 'login']);
    Route::post('/forgot-password', [AuthController::class, 'forgotPassword']);
    Route::post('/reset-password', [AuthController::class, 'resetPassword']);

    // Protected routes
    Route::middleware('auth:sanctum')->group(function () {
        // User
        Route::get('/user', [AuthController::class, 'user']);
        Route::post('/logout', [AuthController::class, 'logout']);
        Route::put('/user/profile', [AuthController::class, 'updateProfile']);
        Route::put('/user/password', [AuthController::class, 'updatePassword']);

        // Events
        Route::apiResource('events', EventController::class);
        Route::get('/events/{event}/bookings', [EventController::class, 'bookings']);

        // Bookings
        Route::apiResource('bookings', BookingController::class);
        Route::post('/bookings/{booking}/cancel', [BookingController::class, 'cancel']);
        Route::post('/bookings/{booking}/confirm', [BookingController::class, 'confirm']);

        // Orders
        Route::apiResource('orders', OrderController::class);
        Route::get('/orders/{order}/items', [OrderController::class, 'items']);

        // Payments
        Route::apiResource('payments', PaymentController::class);
        Route::post('/payments/{payment}/process', [PaymentController::class, 'process']);
        Route::post('/payments/{payment}/refund', [PaymentController::class, 'refund']);

        // Tickets
        Route::apiResource('tickets', TicketController::class);
        Route::get('/tickets/{ticket}/validate', [TicketController::class, 'validate']);

        // Reviews
        Route::apiResource('reviews', ReviewController::class);

        // Wishlist
        Route::get('/wishlist', [WishlistController::class, 'index']);
        Route::post('/wishlist', [WishlistController::class, 'store']);
        Route::delete('/wishlist/{product}', [WishlistController::class, 'destroy']);

        // Wallet
        Route::get('/wallet', [WalletController::class, 'show']);
        Route::get('/wallet/transactions', [WalletController::class, 'transactions']);
        Route::post('/wallet/deposit', [WalletController::class, 'deposit']);
        Route::post('/wallet/withdraw', [WalletController::class, 'withdraw']);

        // Notifications
        Route::get('/notifications', [NotificationController::class, 'index']);
        Route::put('/notifications/{id}/read', [NotificationController::class, 'markAsRead']);
        Route::put('/notifications/read-all', [NotificationController::class, 'markAllAsRead']);

        // Vendor routes (only for vendors)
        Route::middleware('role:vendor')->prefix('vendor')->group(function () {
            Route::get('/dashboard', [Vendor\DashboardController::class, 'index']);
            Route::get('/bookings', [Vendor\BookingController::class, 'index']);
            Route::put('/bookings/{booking}/status', [Vendor\BookingController::class, 'updateStatus']);
            Route::get('/earnings', [Vendor\DashboardController::class, 'earnings']);
            Route::get('/reviews', [Vendor\ReviewController::class, 'index']);
            Route::put('/profile', [Vendor\ProfileController::class, 'update']);
        });

        // Admin routes (only for admins)
        Route::middleware('role:admin')->prefix('admin')->group(function () {
            Route::get('/dashboard', [Admin\DashboardController::class, 'index']);
            Route::get('/users', [Admin\UserController::class, 'index']);
            Route::get('/vendors/pending', [Admin\VendorController::class, 'pending']);
            Route::put('/vendors/{vendor}/approve', [Admin\VendorController::class, 'approve']);
            Route::put('/vendors/{vendor}/reject', [Admin\VendorController::class, 'reject']);
            Route::get('/analytics', [Admin\AnalyticsController::class, 'index']);
            Route::get('/transactions', [Admin\TransactionController::class, 'index']);
            Route::get('/reports', [Admin\ReportController::class, 'index']);
        });
    });
});
```

## Controller Patterns

### Base API Controller

```php
<?php
// app/Http/Controllers/Api/Controller.php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller as BaseController;
use Illuminate\Http\JsonResponse;

class Controller extends BaseController
{
    /**
     * Return success response
     */
    protected function success($data = null, string $message = 'Success', int $code = 200): JsonResponse
    {
        return response()->json([
            'success' => true,
            'message' => $message,
            'data' => $data,
        ], $code);
    }

    /**
     * Return error response
     */
    protected function error(string $message = 'Error', $errors = null, int $code = 400): JsonResponse
    {
        return response()->json([
            'success' => false,
            'message' => $message,
            'errors' => $errors,
        ], $code);
    }

    /**
     * Return paginated response
     */
    protected function paginated($data, string $message = 'Success'): JsonResponse
    {
        return response()->json([
            'success' => true,
            'message' => $message,
            'data' => $data->items(),
            'meta' => [
                'current_page' => $data->currentPage(),
                'last_page' => $data->lastPage(),
                'per_page' => $data->perPage(),
                'total' => $data->total(),
            ],
        ]);
    }
}
```

### Event Controller

```php
<?php
// app/Http/Controllers/Api/EventController.php

namespace App\Http\Controllers\Api;

use App\Http\Requests\StoreEventRequest;
use App\Http\Requests\UpdateEventRequest;
use App\Http\Resources\EventResource;
use App\Models\Event;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class EventController extends Controller
{
    /**
     * List user's events
     */
    public function index(Request $request): JsonResponse
    {
        $query = Auth::user()->events()
            ->with(['bookings.vendor', 'tickets'])
            ->withCount('bookings');

        // Filter by status
        if ($request->has('status')) {
            $query->where('status', $request->status);
        }

        // Filter by type
        if ($request->has('type')) {
            $query->where('type', $request->type);
        }

        // Filter upcoming/past
        if ($request->has('upcoming')) {
            $query->where('event_date', '>=', now());
        }

        if ($request->has('past')) {
            $query->where('event_date', '<', now());
        }

        // Sort
        $sortBy = $request->input('sort_by', 'event_date');
        $sortOrder = $request->input('sort_order', 'asc');
        $query->orderBy($sortBy, $sortOrder);

        $events = $query->paginate($request->input('per_page', 15));

        return $this->paginated(
            EventResource::collection($events),
            'Events retrieved successfully'
        );
    }

    /**
     * Store new event
     */
    public function store(StoreEventRequest $request): JsonResponse
    {
        $event = Auth::user()->events()->create($request->validated());

        // Auto-generate AI suggestions if preferences provided
        if ($request->has('preferences')) {
            $this->generateAiSuggestions($event);
        }

        return $this->success(
            new EventResource($event->load(['bookings.vendor'])),
            'Event created successfully',
            201
        );
    }

    /**
     * Show single event
     */
    public function show(Event $event): JsonResponse
    {
        $this->authorize('view', $event);

        $event->load(['bookings.vendor.reviews', 'tickets', 'payments']);

        return $this->success(
            new EventResource($event),
            'Event retrieved successfully'
        );
    }

    /**
     * Update event
     */
    public function update(UpdateEventRequest $request, Event $event): JsonResponse
    {
        $this->authorize('update', $event);

        $event->update($request->validated());

        return $this->success(
            new EventResource($event->fresh()),
            'Event updated successfully'
        );
    }

    /**
     * Delete event
     */
    public function destroy(Event $event): JsonResponse
    {
        $this->authorize('delete', $event);

        // Check if event has confirmed bookings
        if ($event->bookings()->where('status', 'confirmed')->exists()) {
            return $this->error(
                'Cannot delete event with confirmed bookings',
                null,
                422
            );
        }

        $event->delete();

        return $this->success(null, 'Event deleted successfully');
    }

    /**
     * Get event bookings
     */
    public function bookings(Event $event, Request $request): JsonResponse
    {
        $this->authorize('view', $event);

        $bookings = $event->bookings()
            ->with('vendor')
            ->when($request->status, function ($query) use ($request) {
                return $query->where('status', $request->status);
            })
            ->paginate($request->input('per_page', 15));

        return $this->paginated($bookings, 'Bookings retrieved successfully');
    }

    /**
     * Generate AI recommendations
     */
    protected function generateAiSuggestions(Event $event): void
    {
        // Queue AI suggestion generation
        // This would connect to your AI service
    }
}
```

### Vendor Controller

```php
<?php
// app/Http/Controllers/Api/VendorController.php

namespace App\Http\Controllers\Api;

use App\Http\Resources\VendorResource;
use App\Models\Vendor;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class VendorController extends Controller
{
    /**
     * List vendors with filters
     */
    public function index(Request $request): JsonResponse
    {
        $query = Vendor::query()
            ->where('status', 'approved')
            ->with(['user', 'reviews'])
            ->withAvg('reviews as average_rating', 'rating');

        // Filter by category
        if ($request->has('category')) {
            $query->where('category', $request->category);
        }

        // Filter by price range
        if ($request->has('min_price')) {
            $query->where('price_from', '>=', $request->min_price);
        }

        if ($request->has('max_price')) {
            $query->where('price_to', '<=', $request->max_price);
        }

        // Filter by rating
        if ($request->has('min_rating')) {
            $query->where('rating', '>=', $request->min_rating);
        }

        // Filter by location
        if ($request->has('location')) {
            $query->whereJsonContains('service_areas', $request->location);
        }

        // Filter verified/premium
        if ($request->boolean('verified')) {
            $query->where('is_verified', true);
        }

        if ($request->boolean('premium')) {
            $query->where('is_premium', true);
        }

        // Search
        if ($request->has('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('business_name', 'like', "%{$search}%")
                    ->orWhere('description', 'like', "%{$search}%")
                    ->orWhere('category', 'like', "%{$search}%");
            });
        }

        // Sort
        $sortBy = $request->input('sort_by', 'rating');
        $sortOrder = $request->input('sort_order', 'desc');
        $query->orderBy($sortBy, $sortOrder);

        $vendors = $query->paginate($request->input('per_page', 15));

        return $this->paginated(
            VendorResource::collection($vendors),
            'Vendors retrieved successfully'
        );
    }

    /**
     * Show single vendor
     */
    public function show(string $slug): JsonResponse
    {
        $vendor = Vendor::where('slug', $slug)
            ->where('status', 'approved')
            ->with(['user', 'reviews.user', 'products'])
            ->withCount('reviews')
            ->firstOrFail();

        return $this->success(
            new VendorResource($vendor),
            'Vendor retrieved successfully'
        );
    }
}
```

### Booking Controller

```php
<?php
// app/Http/Controllers/Api/BookingController.php

namespace App\Http\Controllers\Api;

use App\Http\Requests\StoreBookingRequest;
use App\Http\Resources\BookingResource;
use App\Models\Booking;
use App\Models\Event;
use App\Models\Vendor;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class BookingController extends Controller
{
    /**
     * List user bookings
     */
    public function index(Request $request): JsonResponse
    {
        $query = Auth::user()->bookings()
            ->with(['event', 'vendor', 'payment']);

        // Filter by status
        if ($request->has('status')) {
            $query->where('status', $request->status);
        }

        // Filter by event
        if ($request->has('event_id')) {
            $query->where('event_id', $request->event_id);
        }

        $bookings = $query->orderBy('created_at', 'desc')
            ->paginate($request->input('per_page', 15));

        return $this->paginated(
            BookingResource::collection($bookings),
            'Bookings retrieved successfully'
        );
    }

    /**
     * Create new booking
     */
    public function store(StoreBookingRequest $request): JsonResponse
    {
        $validated = $request->validated();

        $event = Event::findOrFail($validated['event_id']);
        $vendor = Vendor::findOrFail($validated['vendor_id']);

        // Check if vendor is available on event date
        // This would check vendor's availability calendar

        // Check if event budget allows
        $remainingBudget = $event->budget_remaining;
        if ($remainingBudget < $validated['amount']) {
            return $this->error(
                'Amount exceeds remaining event budget',
                ['amount' => ['Insufficient budget remaining']],
                422
            );
        }

        $booking = Booking::create([
            ...$validated,
            'user_id' => Auth::id(),
            'booking_number' => $this->generateBookingNumber(),
            'commission_amount' => $this->calculateCommission($validated['amount']),
        ]);

        // Update event budget spent
        $event->increment('budget_spent', $validated['amount']);

        // Send notifications
        // Notification logic here

        return $this->success(
            new BookingResource($booking->load(['event', 'vendor'])),
            'Booking created successfully',
            201
        );
    }

    /**
     * Show single booking
     */
    public function show(Booking $booking): JsonResponse
    {
        $this->authorize('view', $booking);

        $booking->load(['event', 'vendor', 'payment', 'reviews']);

        return $this->success(
            new BookingResource($booking),
            'Booking retrieved successfully'
        );
    }

    /**
     * Cancel booking
     */
    public function cancel(Booking $booking): JsonResponse
    {
        $this->authorize('update', $booking);

        if ($booking->status === 'completed') {
            return $this->error('Cannot cancel completed booking', null, 422);
        }

        if ($booking->status === 'cancelled') {
            return $this->error('Booking is already cancelled', null, 422);
        }

        $booking->update(['status' => 'cancelled']);

        // Refund payment if exists
        if ($booking->payment) {
            // Process refund
        }

        // Restore event budget
        $booking->event->decrement('budget_spent', $booking->amount);

        return $this->success(
            new BookingResource($booking->fresh()),
            'Booking cancelled successfully'
        );
    }

    /**
     * Generate unique booking number
     */
    protected function generateBookingNumber(): string
    {
        return 'BK' . strtoupper(uniqid());
    }

    /**
     * Calculate platform commission
     */
    protected function calculateCommission(float $amount): float
    {
        $commissionRate = config('app.commission_rate', 0.10); // 10%
        return round($amount * $commissionRate, 2);
    }
}
```

## Request Validation Patterns

### Store Event Request

```php
<?php
// app/Http/Requests/StoreEventRequest.php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreEventRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name' => 'required|string|max:255',
            'type' => 'required|in:wedding,birthday,corporate,proposal,other',
            'description' => 'nullable|string',
            'event_date' => 'required|date|after:today',
            'location' => 'nullable|string|max:500',
            'guest_count' => 'nullable|integer|min:1',
            'budget_total' => 'nullable|numeric|min:0',
            'preferences' => 'nullable|json',
            'preferences.style' => 'nullable|in:elegant,modern,rustic,themed',
            'preferences.colors' => 'nullable|array',
            'preferences.special_requests' => 'nullable|string',
        ];
    }

    public function messages(): array
    {
        return [
            'event_date.after' => 'Event date must be in the future',
            'type.in' => 'Please select a valid event type',
        ];
    }
}
```

### Store Booking Request

```php
<?php
// app/Http/Requests/StoreBookingRequest.php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreBookingRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'event_id' => 'required|exists:events,id',
            'vendor_id' => 'required|exists:vendors,id',
            'booking_date' => 'required|date',
            'amount' => 'required|numeric|min:0',
            'requirements' => 'nullable|string',
            'customer_notes' => 'nullable|string',
        ];
    }

    protected function prepareForValidation(): void
    {
        // Set booking date to event date if not provided
        if (!$this->has('booking_date') && $this->has('event_id')) {
            $event = \App\Models\Event::find($this->event_id);
            if ($event) {
                $this->merge([
                    'booking_date' => $event->event_date,
                ]);
            }
        }
    }
}
```

## Resource Patterns

### Event Resource

```php
<?php
// app/Http/Resources/EventResource.php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class EventResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'type' => $this->type,
            'type_label' => $this->getTypeLabel(),
            'description' => $this->description,
            'event_date' => $this->event_date?->toISOString(),
            'location' => $this->location,
            'guest_count' => $this->guest_count,
            'budget' => [
                'total' => $this->budget_total,
                'spent' => $this->budget_spent,
                'remaining' => $this->budget_remaining,
                'used_percentage' => $this->budget_used_percentage,
            ],
            'status' => $this->status,
            'preferences' => $this->preferences,
            'bookings_count' => $this->whenCounted('bookings'),
            'bookings' => BookingResource::collection($this->whenLoaded('bookings')),
            'tickets' => TicketResource::collection($this->whenLoaded('tickets')),
            'created_at' => $this->created_at->toISOString(),
            'updated_at' => $this->updated_at->toISOString(),
        ];
    }

    protected function getTypeLabel(): string
    {
        $labels = [
            'wedding' => 'Wedding',
            'birthday' => 'Birthday',
            'corporate' => 'Corporate',
            'proposal' => 'Proposal',
            'other' => 'Other',
        ];

        return $labels[$this->type] ?? 'Unknown';
    }
}
```

### Vendor Resource

```php
<?php
// app/Http/Resources/VendorResource.php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class VendorResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'business_name' => $this->business_name,
            'slug' => $this->slug,
            'description' => $this->description,
            'category' => $this->category,
            'subcategory' => $this->subcategory,
            'logo' => $this->logo,
            'gallery' => $this->gallery,
            'contact' => [
                'phone' => $this->phone,
                'email' => $this->email,
                'website' => $this->website,
                'address' => $this->address,
            ],
            'rating' => [
                'average' => round($this->average_rating ?? $this->rating, 1),
                'count' => $this->review_count,
            ],
            'pricing' => [
                'from' => $this->price_from,
                'to' => $this->price_to,
            ],
            'badges' => [
                'verified' => $this->is_verified,
                'premium' => $this->is_premium,
            ],
            'service_areas' => $this->service_areas,
            'reviews' => ReviewResource::collection($this->whenLoaded('reviews')),
            'products' => ProductResource::collection($this->whenLoaded('products')),
            'created_at' => $this->created_at->toISOString(),
        ];
    }
}
```

## Middleware

### Role Middleware

```php
<?php
// app/Http/Middleware/CheckRole.php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class CheckRole
{
    public function handle(Request $request, Closure $next, ...$roles)
    {
        if (!auth()->check()) {
            return response()->json([
                'success' => false,
                'message' => 'Unauthorized',
            ], 401);
        }

        $user = auth()->user();

        if (!in_array($user->role, $roles)) {
            return response()->json([
                'success' => false,
                'message' => 'Forbidden - Insufficient permissions',
            ], 403);
        }

        return $next($request);
    }
}
```

## Policy Patterns

### Event Policy

```php
<?php
// app/Policies/EventPolicy.php

namespace App\Policies;

use App\Models\Event;
use App\Models\User;

class EventPolicy
{
    public function view(User $user, Event $event): bool
    {
        return $user->id === $event->user_id || $user->is_admin;
    }

    public function update(User $user, Event $event): bool
    {
        return $user->id === $event->user_id;
    }

    public function delete(User $user, Event $event): bool
    {
        return $user->id === $event->user_id;
    }
}
```

## Output Format

When generating API components:
1. Provide complete PHP code with proper namespaces
2. Include type hints and return types
3. Add docblocks for methods
4. Follow PSR-12 coding standards
5. Include authorization checks
6. Add validation rules
7. Return consistent response formats
