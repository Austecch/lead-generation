---
name: emily-database
description: Generate Laravel database migrations, models, relationships, and seeders for the Emily Experience platform. Follows the established database design with proper foreign keys and relationships.
---

# Emily Experience Database Skill

Generate Laravel database schemas for the event management platform.

## Database Architecture

### Core Entities

| Entity | Table | Purpose |
|--------|-------|---------|
| User | `users` | Customers, vendors, admins |
| Event | `events` | Event planning instances |
| Vendor | `vendors` | Service providers |
| Booking | `bookings` | Vendor bookings |
| Product | `products` | Gift marketplace items |
| Order | `orders` | Gift orders |
| Payment | `payments` | Transaction records |
| Ticket | `tickets` | Event tickets |
| Review | `reviews` | Vendor ratings |

### Relationship Map

```
users
├── events (hasMany)
├── bookings (hasMany)
├── orders (hasMany)
├── payments (hasMany)
├── reviews (hasMany)
└── vendors (hasOne - if user is vendor)

events
├── user (belongsTo)
├── bookings (hasMany)
├── tickets (hasMany)
└── payments (hasMany)

vendors
├── user (belongsTo)
├── bookings (hasMany)
├── reviews (hasMany)
└── products (hasMany - if they sell gifts)

bookings
├── user (belongsTo)
├── event (belongsTo)
├── vendor (belongsTo)
└── payment (hasOne)

products
├── vendor (belongsTo)
└── orders (belongsToMany)

orders
├── user (belongsTo)
├── payment (belongsTo)
└── products (belongsToMany)
```

## Migration Patterns

### User Migration

```php
<?php
// database/migrations/XXXX_XX_XX_000000_create_users_table.php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('email')->unique();
            $table->timestamp('email_verified_at')->nullable();
            $table->string('password');
            $table->enum('role', ['customer', 'vendor', 'admin', 'corporate'])->default('customer');
            $table->string('phone')->nullable();
            $table->string('avatar')->nullable();
            $table->json('preferences')->nullable();
            $table->boolean('is_active')->default(true);
            $table->rememberToken();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('users');
    }
};
```

### Event Migration

```php
<?php
// database/migrations/XXXX_XX_XX_000001_create_events_table.php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('events', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->string('name');
            $table->enum('type', ['wedding', 'birthday', 'corporate', 'proposal', 'other']);
            $table->text('description')->nullable();
            $table->dateTime('event_date');
            $table->string('location')->nullable();
            $table->integer('guest_count')->nullable();
            $table->decimal('budget_total', 12, 2)->default(0);
            $table->decimal('budget_spent', 12, 2)->default(0);
            $table->enum('status', ['draft', 'planning', 'confirmed', 'completed', 'cancelled'])->default('draft');
            $table->json('preferences')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('events');
    }
};
```

### Vendor Migration

```php
<?php
// database/migrations/XXXX_XX_XX_000002_create_vendors_table.php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('vendors', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->string('business_name');
            $table->string('slug')->unique();
            $table->text('description');
            $table->string('category'); // photography, catering, floral, etc.
            $table->string('subcategory')->nullable();
            $table->string('logo')->nullable();
            $table->json('gallery')->nullable();
            $table->string('phone');
            $table->string('email');
            $table->string('website')->nullable();
            $table->text('address');
            $table->decimal('rating', 2, 1)->default(0);
            $table->integer('review_count')->default(0);
            $table->boolean('is_verified')->default(false);
            $table->boolean('is_premium')->default(false);
            $table->enum('status', ['pending', 'approved', 'rejected', 'suspended'])->default('pending');
            $table->decimal('price_from', 10, 2)->nullable();
            $table->decimal('price_to', 10, 2)->nullable();
            $table->json('service_areas')->nullable();
            $table->json('kyc_documents')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('vendors');
    }
};
```

### Booking Migration

```php
<?php
// database/migrations/XXXX_XX_XX_000003_create_bookings_table.php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('bookings', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->foreignId('event_id')->constrained()->onDelete('cascade');
            $table->foreignId('vendor_id')->constrained()->onDelete('cascade');
            $table->string('booking_number')->unique();
            $table->dateTime('booking_date');
            $table->text('requirements')->nullable();
            $table->decimal('amount', 10, 2);
            $table->decimal('commission_amount', 10, 2)->default(0);
            $table->enum('status', ['pending', 'confirmed', 'completed', 'cancelled'])->default('pending');
            $table->text('vendor_notes')->nullable();
            $table->text('customer_notes')->nullable();
            $table->timestamp('confirmed_at')->nullable();
            $table->timestamp('completed_at')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('bookings');
    }
};
```

### Product Migration

```php
<?php
// database/migrations/XXXX_XX_XX_000004_create_products_table.php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->foreignId('vendor_id')->nullable()->constrained()->onDelete('set null');
            $table->string('name');
            $table->string('slug')->unique();
            $table->text('description');
            $table->string('category'); // romantic, luxury, kids, corporate
            $table->json('tags')->nullable();
            $table->string('image')->nullable();
            $table->json('gallery')->nullable();
            $table->decimal('price', 10, 2);
            $table->decimal('compare_price', 10, 2)->nullable();
            $table->integer('stock_quantity')->default(0);
            $table->boolean('is_in_stock')->default(true);
            $table->boolean('is_featured')->default(false);
            $table->boolean('is_bundle')->default(false);
            $table->json('bundle_items')->nullable();
            $table->decimal('rating', 2, 1)->default(0);
            $table->integer('review_count')->default(0);
            $table->enum('status', ['active', 'inactive', 'draft'])->default('draft');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};
```

### Order Migration

```php
<?php
// database/migrations/XXXX_XX_XX_000005_create_orders_table.php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->string('order_number')->unique();
            $table->enum('type', ['single', 'bulk', 'subscription'])->default('single');
            $table->decimal('subtotal', 12, 2);
            $table->decimal('tax', 12, 2)->default(0);
            $table->decimal('shipping', 12, 2)->default(0);
            $table->decimal('discount', 12, 2)->default(0);
            $table->decimal('total', 12, 2);
            $table->enum('status', ['pending', 'processing', 'shipped', 'delivered', 'cancelled'])->default('pending');
            $table->string('recipient_name');
            $table->string('recipient_phone');
            $table->text('shipping_address');
            $table->text('billing_address');
            $table->text('gift_message')->nullable();
            $table->date('delivery_date')->nullable();
            $table->timestamp('delivered_at')->nullable();
            $table->timestamps();
        });

        Schema::create('order_items', function (Blueprint $table) {
            $table->id();
            $table->foreignId('order_id')->constrained()->onDelete('cascade');
            $table->foreignId('product_id')->constrained()->onDelete('cascade');
            $table->integer('quantity');
            $table->decimal('price', 10, 2);
            $table->decimal('total', 10, 2);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('order_items');
        Schema::dropIfExists('orders');
    }
};
```

### Payment Migration

```php
<?php
// database/migrations/XXXX_XX_XX_000006_create_payments_table.php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('payments', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->morphs('payable'); // booking, order, ticket
            $table->string('transaction_id')->unique();
            $table->string('reference')->unique();
            $table->decimal('amount', 12, 2);
            $table->string('currency', 3)->default('USD');
            $table->enum('method', ['card', 'bank_transfer', 'wallet', 'paypal', 'flutterwave', 'paystack']);
            $table->enum('type', ['full', 'deposit', 'installment'])->default('full');
            $table->enum('status', ['pending', 'completed', 'failed', 'refunded', 'partially_refunded'])->default('pending');
            $table->timestamp('paid_at')->nullable();
            $table->timestamp('refunded_at')->nullable();
            $table->text('gateway_response')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('payments');
    }
};
```

### Ticket Migration

```php
<?php
// database/migrations/XXXX_XX_XX_000007_create_tickets_table.php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('tickets', function (Blueprint $table) {
            $table->id();
            $table->foreignId('event_id')->constrained()->onDelete('cascade');
            $table->string('name');
            $table->text('description')->nullable();
            $table->string('type'); // vip, general, early_bird, etc.
            $table->decimal('price', 10, 2);
            $table->integer('quantity_available');
            $table->integer('quantity_sold')->default(0);
            $table->dateTime('sale_start');
            $table->dateTime('sale_end');
            $table->integer('max_per_order')->default(10);
            $table->enum('status', ['active', 'sold_out', 'inactive'])->default('active');
            $table->timestamps();
        });

        Schema::create('ticket_purchases', function (Blueprint $table) {
            $table->id();
            $table->foreignId('ticket_id')->constrained()->onDelete('cascade');
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->foreignId('payment_id')->constrained()->onDelete('cascade');
            $table->string('ticket_code')->unique();
            $table->string('qr_code')->nullable();
            $table->integer('quantity');
            $table->string('attendee_name');
            $table->string('attendee_email');
            $table->boolean('is_checked_in')->default(false);
            $table->timestamp('checked_in_at')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('ticket_purchases');
        Schema::dropIfExists('tickets');
    }
};
```

### Review Migration

```php
<?php
// database/migrations/XXXX_XX_XX_000008_create_reviews_table.php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('reviews', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->foreignId('vendor_id')->constrained()->onDelete('cascade');
            $table->foreignId('booking_id')->nullable()->constrained()->onDelete('set null');
            $table->tinyInteger('rating'); // 1-5
            $table->text('comment');
            $table->json('images')->nullable();
            $table->boolean('is_approved')->default(false);
            $table->timestamp('approved_at')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('reviews');
    }
};
```

### Wallet Migration

```php
<?php
// database/migrations/XXXX_XX_XX_000009_create_wallets_table.php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('wallets', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->enum('type', ['customer', 'vendor'])->default('customer');
            $table->decimal('balance', 12, 2)->default(0);
            $table->string('currency', 3)->default('USD');
            $table->timestamps();
        });

        Schema::create('wallet_transactions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('wallet_id')->constrained()->onDelete('cascade');
            $table->enum('type', ['credit', 'debit']);
            $table->decimal('amount', 12, 2);
            $table->string('description');
            $table->morphs('reference'); // payment, booking, etc.
            $table->decimal('balance_before', 12, 2);
            $table->decimal('balance_after', 12, 2);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('wallet_transactions');
        Schema::dropIfExists('wallets');
    }
};
```

## Model Patterns

### User Model

```php
<?php
// app/Models/User.php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $fillable = [
        'name',
        'email',
        'password',
        'role',
        'phone',
        'avatar',
        'preferences',
        'is_active',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
        'preferences' => 'json',
    ];

    // Relationships
    public function events()
    {
        return $this->hasMany(Event::class);
    }

    public function bookings()
    {
        return $this->hasMany(Booking::class);
    }

    public function orders()
    {
        return $this->hasMany(Order::class);
    }

    public function payments()
    {
        return $this->hasMany(Payment::class);
    }

    public function reviews()
    {
        return $this->hasMany(Review::class);
    }

    public function vendor()
    {
        return $this->hasOne(Vendor::class);
    }

    public function wallet()
    {
        return $this->hasOne(Wallet::class);
    }

    // Scopes
    public function scopeCustomers($query)
    {
        return $query->where('role', 'customer');
    }

    public function scopeVendors($query)
    {
        return $query->where('role', 'vendor');
    }

    public function scopeAdmins($query)
    {
        return $query->where('role', 'admin');
    }

    // Accessors
    public function getIsVendorAttribute()
    {
        return $this->role === 'vendor';
    }

    public function getIsAdminAttribute()
    {
        return $this->role === 'admin';
    }
}
```

### Event Model

```php
<?php
// app/Models/Event.php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Event extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'name',
        'type',
        'description',
        'event_date',
        'location',
        'guest_count',
        'budget_total',
        'budget_spent',
        'status',
        'preferences',
    ];

    protected $casts = [
        'event_date' => 'datetime',
        'budget_total' => 'decimal:2',
        'budget_spent' => 'decimal:2',
        'preferences' => 'json',
    ];

    // Relationships
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function bookings()
    {
        return $this->hasMany(Booking::class);
    }

    public function tickets()
    {
        return $this->hasMany(Ticket::class);
    }

    public function payments()
    {
        return $this->morphMany(Payment::class, 'payable');
    }

    // Scopes
    public function scopeUpcoming($query)
    {
        return $query->where('event_date', '>', now())
            ->whereIn('status', ['planning', 'confirmed']);
    }

    public function scopePast($query)
    {
        return $query->where('event_date', '<', now())
            ->orWhere('status', 'completed');
    }

    // Accessors
    public function getBudgetRemainingAttribute()
    {
        return $this->budget_total - $this->budget_spent;
    }

    public function getBudgetUsedPercentageAttribute()
    {
        if ($this->budget_total == 0) return 0;
        return round(($this->budget_spent / $this->budget_total) * 100, 2);
    }
}
```

### Vendor Model

```php
<?php
// app/Models/Vendor.php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Vendor extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'business_name',
        'slug',
        'description',
        'category',
        'subcategory',
        'logo',
        'gallery',
        'phone',
        'email',
        'website',
        'address',
        'rating',
        'review_count',
        'is_verified',
        'is_premium',
        'status',
        'price_from',
        'price_to',
        'service_areas',
        'kyc_documents',
    ];

    protected $casts = [
        'rating' => 'decimal:1',
        'price_from' => 'decimal:2',
        'price_to' => 'decimal:2',
        'is_verified' => 'boolean',
        'is_premium' => 'boolean',
        'gallery' => 'json',
        'service_areas' => 'json',
        'kyc_documents' => 'json',
    ];

    // Relationships
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function bookings()
    {
        return $this->hasMany(Booking::class);
    }

    public function reviews()
    {
        return $this->hasMany(Review::class);
    }

    public function products()
    {
        return $this->hasMany(Product::class);
    }

    // Scopes
    public function scopeVerified($query)
    {
        return $query->where('is_verified', true);
    }

    public function scopePremium($query)
    {
        return $query->where('is_premium', true);
    }

    public function scopeApproved($query)
    {
        return $query->where('status', 'approved');
    }

    public function scopeByCategory($query, $category)
    {
        return $query->where('category', $category);
    }

    // Accessors
    public function getAverageRatingAttribute()
    {
        return $this->reviews()->where('is_approved', true)->avg('rating') ?? 0;
    }
}
```

## Factory Patterns

### User Factory

```php
<?php
// database/factories/UserFactory.php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class UserFactory extends Factory
{
    protected static ?string $password = null;

    public function definition(): array
    {
        return [
            'name' => fake()->name(),
            'email' => fake()->unique()->safeEmail(),
            'email_verified_at' => now(),
            'password' => static::$password ??= Hash::make('password'),
            'role' => fake()->randomElement(['customer', 'vendor', 'admin']),
            'phone' => fake()->phoneNumber(),
            'avatar' => null,
            'preferences' => null,
            'is_active' => true,
            'remember_token' => Str::random(10),
        ];
    }

    public function customer(): static
    {
        return $this->state(fn (array $attributes) => [
            'role' => 'customer',
        ]);
    }

    public function vendor(): static
    {
        return $this->state(fn (array $attributes) => [
            'role' => 'vendor',
        ]);
    }

    public function admin(): static
    {
        return $this->state(fn (array $attributes) => [
            'role' => 'admin',
        ]);
    }

    public function unverified(): static
    {
        return $this->state(fn (array $attributes) => [
            'email_verified_at' => null,
        ]);
    }
}
```

## Seeder Patterns

### Database Seeder

```php
<?php
// database/seeders/DatabaseSeeder.php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $this->call([
            UserSeeder::class,
            VendorSeeder::class,
            EventSeeder::class,
            ProductSeeder::class,
        ]);
    }
}
```

### Vendor Seeder

```php
<?php
// database/seeders/VendorSeeder.php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Vendor;
use Illuminate\Database\Seeder;

class VendorSeeder extends Seeder
{
    public function run(): void
    {
        $categories = [
            'photography' => ['Wedding Photography', 'Portrait Photography', 'Event Photography'],
            'catering' => ['Wedding Catering', 'Corporate Catering', 'Food Trucks'],
            'floral' => ['Wedding Florals', 'Event Decor', 'Plant Rentals'],
            'entertainment' => ['DJ Services', 'Live Bands', 'Magicians'],
            'venue' => ['Ballrooms', 'Gardens', 'Rooftops'],
        ];

        foreach ($categories as $category => $types) {
            foreach ($types as $type) {
                $user = User::factory()->vendor()->create();

                Vendor::factory()->create([
                    'user_id' => $user->id,
                    'business_name' => fake()->company() . ' ' . $type,
                    'category' => $category,
                    'subcategory' => $type,
                    'is_verified' => fake()->boolean(70),
                    'is_premium' => fake()->boolean(20),
                    'status' => 'approved',
                ]);
            }
        }
    }
}
```

## Output Format

When generating database components:
1. Provide complete, valid PHP code
2. Include proper namespace and imports
3. Follow Laravel conventions (timestamps, soft deletes where appropriate)
4. Include foreign key constraints
5. Add helpful comments
6. Use proper return types

## Commands Reference

Generate migration:
```bash
php artisan make:migration create_{table}_table
```

Generate model with migration and factory:
```bash
php artisan make:model {Model} -mf
```

Generate seeder:
```bash
php artisan make:seed {Name}Seeder
```

Run migrations:
```bash
php artisan migrate
```

Seed database:
```bash
php artisan db:seed
```

Fresh migrate with seed:
```bash
php artisan migrate:fresh --seed
```
