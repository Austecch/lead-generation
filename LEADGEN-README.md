# Emily Experience Lead Generation System

## Overview

A complete lead generation system for the Emily Experience event planning platform, featuring high-converting landing pages, automated email nurturing, lead scoring, and comprehensive analytics tracking.

---

## 🎯 What's Included

### 1. Landing Pages (Next.js)

Four professionally designed landing pages with the Emily Experience luxury theme:

| Page | URL | Lead Magnet |
|------|-----|-------------|
| Event Planning Checklist | `/leadgen/checklist` | 50-point master checklist |
| Budget Calculator | `/leadgen/calculator` | Interactive budget tool |
| Vendor Selection Guide | `/leadgen/guide` | Comprehensive vendor guide |
| Free Consultation | `/leadgen/consultation` | 30-min strategy session |
| Thank You Page | `/leadgen/thank-you` | Post-conversion experience |

**Features:**
- Responsive design with luxury dark theme
- Animated hero sections with floating effects
- Social proof testimonials and stats
- Trust badges and security indicators
- Conversion-optimized lead capture forms
- SEO optimized with meta tags

### 2. Database Schema (Laravel Migrations)

**Tables Created:**
- `leads` - Lead information with scoring and segmentation
- `lead_activities` - Activity tracking for scoring
- `email_campaigns` - Campaign management
- `email_templates` - Template storage with sequence ordering
- `email_logs` - Delivery and engagement tracking
- `landing_pages` - Landing page configuration and analytics

### 3. Email Automation

**5-Email Welcome Series:**
1. **Email 1 (Immediate)** - Welcome + Resource Delivery
2. **Email 2 (Day 2)** - How to Use the Platform
3. **Email 3 (Day 5)** - Success Stories / Testimonials
4. **Email 4 (Day 7)** - Special Offer (10% off)
5. **Email 5 (Day 14)** - Educational Content

**Templates:** Located in `emily-experience/resources/emails/`
- Luxury dark theme matching brand
- Responsive design
- Personalization variables
- Unsubscribe compliance

### 4. Lead Scoring System (PHP Service)

**File:** `app/Services/LeadScoringService.php`

**Scoring Criteria:**
- **Activities:** Email opens (2pts), Link clicks (5pts), Page views (1pt), Bookings (25pts)
- **Profile:** Phone (10pts), Event date (15pts), Budget (20pts), Location (10pts)
- **Multipliers:** Event type (0.9x-1.3x), Budget range (0.8x-2.0x)
- **Time Decay:** 5% weekly reduction after 7 days inactivity

**Status Thresholds:**
- Cold: 0-20 points
- Warm: 21-50 points
- Hot: 51+ points

**Methods:**
- `calculateScore(Lead $lead)` - Calculate total score
- `determineStatus(int $score)` - Get status label
- `updateLeadScore(Lead $lead)` - Update in database
- `logActivity(...)` - Log activity and auto-update score
- `getHotLeads()` - Get priority leads

### 5. Lead Magnet Assets

**Content Files:** Located in `emily-experience/resources/lead-magnets/`

1. **Event Planning Checklist** (`event-planning-checklist.md`)
   - 12-month timeline
   - Day-of schedule
   - Budget tracking
   - Vendor interview questions

2. **Vendor Selection Guide** (`vendor-selection-guide.md`)
   - Vetting process
   - Interview questions by vendor type
   - Pricing benchmarks
   - Contract checklist
   - Red flags

3. **Budget Calculator Guide** (`budget-calculator-guide.md`)
   - Cost breakdowns
   - Budget templates
   - Money-saving strategies
   - Hidden costs
   - Payment schedules

### 6. Conversion Elements

**Components:**
- **SocialProofNotification** - Real-time activity popups
- **StickyCTA** - Persistent bottom banner
- **UrgencyBanner** - Countdown timer for offers
- **ExitIntentPopup** - Capture abandoning visitors

### 7. Analytics Tracking

**File:** `lib/analytics.ts`

**Tracking:**
- Facebook Pixel events (PageView, Lead, CompleteRegistration, Purchase)
- Google Analytics 4 events
- Custom events (LandingPageView, CTAClick, ScrollDepth, TimeOnPage)
- UTM parameter tracking and storage

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- PHP 8.2+
- Laravel 10+
- MySQL 8.0+

### Installation

1. **Install Next.js dependencies:**
```bash
cd leadgen
npm install
```

2. **Run migrations:**
```bash
cd emily-experience
php artisan migrate
```

3. **Seed landing pages:**
```bash
php artisan db:seed --class=LandingPageSeeder
```

4. **Start development servers:**
```bash
# Terminal 1 - Next.js
cd leadgen && npm run dev

# Terminal 2 - Laravel
cd emily-experience && php artisan serve
```

---

## 📊 Lead Capture Flow

```
Visitor Lands on Page
    ↓
Views Hero Section (triggers LandingPageView event)
    ↓
Scrolls (tracks ScrollDepth)
    ↓
Views Social Proof (builds trust)
    ↓
Submits Lead Form (triggers Lead event)
    ↓
Data Saved to Database
    ↓
Welcome Email Sent (Email 1)
    ↓
Redirect to Thank You Page
    ↓
Email Series (Days 2, 5, 7, 14)
    ↓
Activity Tracked → Score Updated
    ↓
Hot Leads Surface for Sales Follow-up
```

---

## 🔧 Configuration

### Environment Variables (`.env`)

```env
# Facebook Pixel
FACEBOOK_PIXEL_ID=your_pixel_id

# Google Analytics
GA4_MEASUREMENT_ID=G-XXXXXXXXXX

# Email (Mailgun/SES)
MAIL_MAILER=smtp
MAIL_HOST=smtp.mailgun.org
MAIL_USERNAME=your_username
MAIL_PASSWORD=your_password
MAIL_FROM_ADDRESS=noreply@emilyexperience.com
MAIL_FROM_NAME="Emily Experience"
```

### Lead Scoring Configuration

Edit `app/Services/LeadScoringService.php`:

```php
protected array $pointValues = [
    'activities' => [
        'email_open' => 2,
        'link_click' => 5,
        // Add custom activities
    ],
    'status_thresholds' => [
        'cold' => ['min' => 0, 'max' => 20],
        'warm' => ['min' => 21, 'max' => 50],
        'hot' => ['min' => 51, 'max' => PHP_INT_MAX],
    ],
];
```

---

## 📈 API Endpoints

### Lead Management

```http
POST /api/leads              # Create new lead
GET /api/leads/{id}          # Get lead details
PUT /api/leads/{id}          # Update lead
DELETE /api/leads/{id}       # Delete lead

POST /api/leads/{id}/activity # Log activity
GET /api/leads/{id}/score     # Get current score
```

### Email Campaigns

```http
GET /api/campaigns            # List campaigns
POST /api/campaigns           # Create campaign
POST /api/campaigns/{id}/send # Trigger send
```

---

## 🎨 Design System

### Brand Colors
- **Primary Purple:** `#6B21A8` / `#9333EA`
- **Gold:** `#D4AF37` / `#F3E5AB`
- **Dark Background:** `#0F0A1A`
- **Card Background:** `#261845`
- **Text Primary:** `#FFFFFF`
- **Text Secondary:** `#E2E8F0`

### Typography
- **Headings:** Playfair Display (serif)
- **Body:** Inter (sans-serif)

### Components
- Luxury cards with purple glow
- Gold gradient buttons
- Purple gradient CTAs
- Glassmorphism effects
- Smooth animations

---

## 📊 Analytics Dashboard

**Metrics Tracked:**
- Total leads generated
- Conversion rate by landing page
- Lead source attribution
- Email open/click rates
- Lead score distribution
- Hot/warm/cold lead counts
- Revenue attributed to leads

---

## 🔒 Security & Compliance

- GDPR-compliant unsubscribe links
- Email subscription preferences
- Secure data handling
- Privacy policy links
- Terms of service

---

## 📝 Testing

### Run Tests
```bash
# Laravel tests
php artisan test

# Next.js tests
cd leadgen && npm test
```

### Manual Testing Checklist
- [ ] All landing pages load correctly
- [ ] Forms submit and save to database
- [ ] Email templates render properly
- [ ] Lead scoring updates accurately
- [ ] Analytics events fire correctly
- [ ] Responsive design on mobile/tablet

---

## 🚀 Deployment

### Build for Production

```bash
# Build Next.js
cd leadgen && npm run build

# Deploy Laravel
cd emily-experience
php artisan optimize
php artisan config:cache
php artisan route:cache
```

### Post-Deployment
- Verify environment variables
- Test all forms
- Confirm email sending
- Check analytics tracking
- Monitor lead flow

---

## 📚 Documentation

### Key Files
- `CLAUDE.md` - Project instructions and standards
- `LEADGEN-README.md` - This file
- `emily-experience/resources/emails/` - Email templates
- `emily-experience/resources/lead-magnets/` - Downloadable content

### Database Models
- `app/Models/Lead.php` - Lead model
- `app/Models/LeadActivity.php` - Activity tracking
- `app/Services/LeadScoringService.php` - Scoring logic

---

## 🎯 Success Metrics

**Target KPIs:**
- Landing page conversion rate: >15%
- Email open rate: >40%
- Email click rate: >5%
- Lead-to-customer conversion: >3%
- Average lead score: >30

---

## 📞 Support

**Questions?**
- Email: dev@emilyexperience.com
- Documentation: See CLAUDE.md
- Issues: Check project GitHub

---

**Built with ❤️ by the Emily Experience Team**

*Last Updated: March 30, 2026*
