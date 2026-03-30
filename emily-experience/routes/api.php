<?php

use App\Http\Controllers\Api\NotificationController;
use App\Http\Controllers\Api\LeadController;
use App\Http\Controllers\Api\EmailCampaignController;
use App\Http\Controllers\Api\ConsultationController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| These routes are loaded by the RouteServiceProvider within a group
| which is assigned the "api" middleware group.
|
*/

Route::group(['prefix' => 'v1'], function () {
    // Public routes
    Route::get('/vendors', [VendorController::class, 'index']);
    Route::get('/vendors/{slug}', [VendorController::class, 'show']);
    Route::get('/products', [ProductController::class, 'index']);
    Route::get('/products/{slug}', [ProductController::class, 'show']);
    Route::get('/events/public', [EventController::class, 'public']);

    // Lead Generation - Public Routes
    Route::post('/leads', [LeadController::class, 'store']);
    Route::post('/leads/{lead}/activity', [LeadController::class, 'logActivity']);
    Route::get('/consultations/available-slots', [ConsultationController::class, 'availableSlots']);
    Route::post('/consultations', [ConsultationController::class, 'store']);
    Route::get('/consultations/{consultation}', [ConsultationController::class, 'show']);

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

        // Lead Generation - Protected Routes
        Route::get('/leads', [LeadController::class, 'index']);
        Route::get('/leads/{lead}', [LeadController::class, 'show']);
        Route::put('/leads/{lead}', [LeadController::class, 'update']);
        Route::delete('/leads/{lead}', [LeadController::class, 'destroy']);
        Route::get('/leads/{lead}/score', [LeadController::class, 'score']);
        Route::get('/leads/{lead}/activities', [LeadController::class, 'activities']);
        Route::get('/leads/hot', [LeadController::class, 'hotLeads']);
        Route::get('/leads/status/{status}', [LeadController::class, 'byStatus']);

        // Email Campaigns
        Route::get('/campaigns', [EmailCampaignController::class, 'index']);
        Route::post('/campaigns', [EmailCampaignController::class, 'store']);

        // Consultations
        Route::post('/consultations/{consultation}/complete', [ConsultationController::class, 'complete']);
        Route::post('/consultations/{consultation}/cancel', [ConsultationController::class, 'cancel']);
        Route::get('/leads/{lead}/consultations', [ConsultationController::class, 'byLead']);
        Route::post('/campaigns/{campaign}/send', [EmailCampaignController::class, 'send']);
        Route::get('/campaigns/{campaign}/stats', [EmailCampaignController::class, 'stats']);
        Route::delete('/campaigns/{campaign}', [EmailCampaignController::class, 'destroy']);

        // Notifications
        Route::get('/notifications', [NotificationController::class, 'index']);
        Route::get('/notifications/unread-count', [NotificationController::class, 'unreadCount']);
        Route::get('/notifications/recent', [NotificationController::class, 'recent']);
        Route::put('/notifications/{notification}/read', [NotificationController::class, 'markAsRead']);
        Route::put('/notifications/{notification}/unread', [NotificationController::class, 'markAsUnread']);
        Route::put('/notifications/read-all', [NotificationController::class, 'markAllAsRead']);
        Route::delete('/notifications/{notification}', [NotificationController::class, 'destroy']);
        Route::get('/notifications/preferences', [NotificationController::class, 'getPreferences']);
        Route::put('/notifications/preferences', [NotificationController::class, 'updatePreferences']);
        Route::post('/notifications/test', [NotificationController::class, 'createTest']);

        // Wishlist
        Route::get('/wishlist', [WishlistController::class, 'index']);
        Route::post('/wishlist', [WishlistController::class, 'store']);
        Route::delete('/wishlist/{product}', [WishlistController::class, 'destroy']);

        // Wallet
        Route::get('/wallet', [WalletController::class, 'show']);
        Route::get('/wallet/transactions', [WalletController::class, 'transactions']);
        Route::post('/wallet/deposit', [WalletController::class, 'deposit']);
        Route::post('/wallet/withdraw', [WalletController::class, 'withdraw']);

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
            Route::post('/notifications/broadcast', [Admin\NotificationController::class, 'broadcast']);
        });
    });
});
