# CLAUDE.md - Project Instructions

## Overview

This file contains comprehensive instructions for Claude to work effectively across multiple project domains. Each section represents a distinct activity area with specific patterns, standards, and workflows.

**Last Updated:** 2026-03-28
**Skills Updated:** 2026-03-28
**Project:** Emily Experience Events & Management Platform
**Primary Stack:** Laravel + HTML/CSS/JS + MySQL + React + Python + Node.js

---

## Table of Contents

1. [Skills Library](#skills-library)
2. [Web Development](#web-development)
3. [SEO](#seo)
4. [Lead Generation](#lead-generation)
5. [Content Strategy](#content-strategy)
6. [Analytics & Tracking](#analytics--tracking)
7. [DevOps & Deployment](#devops--deployment)
8. [Communication Preferences](#communication-preferences)

---

## Skills Library

This section documents available skills for extending Claude's capabilities. Skills are stored in `.claude/skills/` directory.

### Document Creation Skills

#### DOCX - Word Documents
**Use when:** Creating, reading, editing, or manipulating Word documents (.docx files)
**Capabilities:**
- Generate documents programmatically with docx-js
- Modify existing files through XML unpacking/repacking
- Extract text using pandoc
- Handle tracked changes, comments, tables, images, headers/footers
- Convert legacy .doc to .docx and docx-to-PDF

**Key Principles:**
- Always check for placeholder text before delivery
- Preserve existing templates when editing
- Validate document structure after modifications

---

#### PDF - Document Manipulation
**Use when:** Working with PDF files (reading, extracting, creating, merging, splitting)
**Capabilities:**
- Extract text and tables from PDFs
- Combine or merge multiple PDFs into one
- Split PDFs apart, rotate pages, apply watermarks
- Create new PDFs, fill forms, manage security/encryption
- Retrieve images, OCR for scanned materials

**Tools:**
- `pypdf` for PDF manipulation
- `pdfplumber` for text/table extraction
- `reportlab` for PDF creation

---

#### PPTX - Presentations
**Use when:** Creating slide decks, pitch decks, presentations, or editing .pptx files
**Capabilities:**
- Extract text using `markitdown`
- Generate visual thumbnails
- Edit existing presentations via unpack/edit/pack workflow
- Build presentations from scratch with pptxgenjs
- Apply themes: "Midnight Executive", "Coral Energy", etc.
- Layout variations: two-column, grids, stat callouts

**Design Guidelines:**
- Avoid "boring slides" and "text-only slides"
- Use bold color palettes and typography pairings
- Verify content extraction and check for placeholder text
- Perform visual inspection for overlapping elements, text overflow, contrast

---

#### XLSX - Spreadsheets
**Use when:** Spreadsheet files are the primary deliverable (.xlsx, .xlsm, .csv, .tsv)
**Capabilities:**
- Create, read, edit, and convert spreadsheets
- Clean disorganized tabular data
- Dynamic calculations using Excel formulas
- Financial modeling with color-coded cells (blue=inputs, black=calculations, green=internal links)

**Critical Rules:**
- **Always use Excel formulas** instead of calculating in Python and hardcoding values
- Every Excel model MUST be delivered with ZERO formula errors
- Use `openpyxl` for formatting and structure
- Use `LibreOffice` integration via `scripts/recalc.py` for formula recalculation

---

### Visual Design Skills

#### Frontend Design
**Use when:** Crafting distinctive, production-grade frontend interfaces
**Purpose:** Generate functional HTML, CSS, JavaScript with high design quality
**Approach:**
- Reject generic "AI slop" aesthetics
- Bold visual direction with unique typography
- Cohesive theming with purposeful motion design
- Unexpected spatial compositions
- Exceptional attention to aesthetic details in color, layout, micro-interactions

**Anti-Patterns to Avoid:**
- Overused font families (e.g., excessive Inter usage)
- Predictable purple gradients
- Excessive centered layouts
- Uniform rounded corners

---

#### Algorithmic Art
**Use when:** Creating art using code, generative art, algorithmic art, flow fields, or particle systems
**Technology:** p5.js with seeded randomness and interactive parameter exploration
**Workflow:**
1. Author an "algorithmic philosophy" manifesto (.md)
2. Realize through living p5.js code (.html/.js)

**Key Features:**
- Seeded randomness for reproducible variation
- Interactive exploration with parameter sliders
- Self-contained HTML viewers with download controls
- Process-driven beauty over static imagery

---

#### Canvas Design
**Use when:** Creating visual art (.png/.pdf) through design philosophy
**Purpose:** Generate "beautiful visual art" and "original visual designs" for posters, static pieces
**Workflow:**
1. Craft a philosophy manifesto (.md)
2. Express it visually (.png/.pdf)

**Principles:**
- Develop aesthetic movements emphasizing "form, space, color, composition"
- Museum-quality artifacts with meticulous craftsmanship
- Minimal text as "visual accent" integrated into visual architecture
- Multi-page layouts that "tell a story in a very tasteful way"

---

#### Theme Factory
**Use when:** Styling artifacts with consistent, professional themes
**Purpose:** Apply consistent, professional styling to presentation slide decks and other outputs
**Capabilities:**
- 10 pre-set visual themes: Ocean Depths, Modern Minimalist, Midnight Galaxy, etc.
- Curated professional font and color combinations
- Generate custom themes on demand

---

### Development Skills

#### Web Artifacts Builder
**Use when:** Creating elaborate, multi-component HTML artifacts requiring state management, routing, or shadcn/ui components
**Stack:** React 18 with 40+ pre-installed shadcn/ui components, Parcel bundling
**Exclusions:** Basic HTML/JSX documents (use simpler approaches)

**Design Guidelines:**
- Reject "AI slop" patterns: excessive centered layouts, purple gradients, uniform rounded corners, Inter font
- Use modern frontend patterns with proper state management

---

#### MCP Builder
**Use when:** Building MCP (Model Context Protocol) servers to integrate external APIs or services
**Languages:** Python (FastMCP) or Node/TypeScript (MCP SDK)
**Capabilities:**
- Comprehensive API coverage
- Balance specialized workflow tools with flexible endpoint access
- Structured evaluation frameworks requiring complex multi-tool operations
- Transport options: Streamable HTTP, stdio
- Actionable error handling

**Goal:** Enable LLMs to accomplish real-world tasks through external service integration

---

#### Webapp Testing
**Use when:** Interacting with and testing local web applications
**Framework:** Playwright for frontend verification, UI debugging, browser diagnostics
**Capabilities:**
- Server lifecycle management via `scripts/with_server.py`
- Support for multiple concurrent servers
- Reconnaissance: screenshots and DOM inspection
- Author native Python scripts using `sync_playwright()`
- Automate both static HTML and dynamic JavaScript applications

---

#### Skill Creator
**Use when:** Creating new skills, modifying and improving existing skills, measuring skill performance
**Purpose:** End-to-end skill development via iterative cycles
**Capabilities:**
- Drafting skill definitions following Agent Skills specification
- Running parallel evaluations with baselines
- Quantitative performance analysis
- Trigger optimization
- Skill packaging and validation

**Agent Skills Spec:**
- Directory structure: `SKILL.md` + optional `scripts/`, `references/`, `assets/`
- Frontmatter: `name`, `description`, `license` (optional), `compatibility` (optional), `metadata` (optional)
- Name format: lowercase, hyphens, 1-64 characters
- Description: 1-1024 characters, describes what and when to use

---

### Communication Skills

#### Internal Communications
**Use when:** Writing company-standard internal communications
**Formats:**
- 3P updates (Progress/Plans/Problems)
- Company newsletters
- FAQ responses
- Status reports
- Leadership updates
- Project updates
- Incident reports

**Guidelines:** Match content to appropriate templates from `examples/` directory

---

#### Document Co-authoring
**Use when:** Co-authoring structured documentation (technical specs, proposals, decision docs, RFCs)
**Workflow:**
1. **Context Gathering:** Structured info dumping with clarifying questions
2. **Refinement & Structure:** Section-by-section development through brainstorming, curation, iterative surgical editing
3. **Reader Testing:** Validation using fresh Claude instances to catch blind spots, test for ambiguity

**Quality Control:**
- Check flow and consistency across sections
- Remove "slop" or generic filler
- Ensure every sentence carries weight
- Support templates, shared documents, Slack/Drive/SharePoint connectors
- Generate alt-text for accessibility

---

#### Slack GIF Creator
**Use when:** Creating animated GIFs optimized for Slack
**Capabilities:**
- Frame assembly and animation
- Slack compliance validation
- Smooth motion easing (bounce, fade)
- Drawing via PIL primitives
- Optimization for colors and file size

---

### Emily-Specific Skills

When working on this project, also use these custom skills:
- `.claude/skills/emily-frontend-ui.md` - UI components
- `.claude/skills/emily-database.md` - Database migrations/models
- `.claude/skills/emily-api.md` - API controllers/resources
- `.claude/skills/emily-deploy.md` - Deployment configs

---

## Web Development

### Project Architecture

**Current Project: Emily Experience (EMMELI)**
- **Type:** SaaS Event Management Platform
- **Backend:** Laravel 10+ with PHP 8.2+
- **Frontend:** Vanilla HTML5 + CSS3 + JavaScript (ES6+)
- **Database:** MySQL 8.0 with Eloquent ORM
- **Cache:** Redis (sessions, cache, queues)
- **Server:** Nginx + PHP-FPM
- **Deployment:** Docker + GitHub Actions

### Design System: Luxury Dark Theme

Based on Emily Experience brand guidelines with Anthropic design principles.

**Color Palette:**
```css
--primary: #6B21A8;           /* Deep Purple */
--primary-light: #9333EA;      /* Bright Purple */
--gold: #D4AF37;               /* Premium Gold */
--gold-light: #F3E5AB;         /* Light Gold */
--bg-primary: #0F0A1A;         /* Dark Background */
--bg-secondary: #1A1033;       /* Card Background */
--bg-card: #261845;            /* Elevated Cards */
--text-primary: #FFFFFF;         /* Headings */
--text-secondary: #E2E8F0;      /* Body Text */
--text-muted: #94A3B8;         /* Captions */

/* Anthropic Brand Colors (for corporate materials) */
--anthropic-orange: #E57035;
--anthropic-blue: #1F7F9C;
--anthropic-green: #3C8D40;
```

**Typography:**
- **Headings:** Playfair Display (serif) - elegant, luxury; or Poppins (24pt+) for corporate
- **Body:** Inter (sans-serif) - clean, readable; or Lora for long-form reading
- **Fallbacks:** Arial (headings), Georgia (body)
- **Scale:** Hero (clamp 2.5-4.5rem), H1 (clamp 2-3rem), H2 (1.5rem)

**Accent Color Cycling:**
For corporate materials, cycle through: orange → blue → green for visual elements.

**Gradients:**
```css
--gradient-primary: linear-gradient(135deg, #6B21A8 0%, #9333EA 100%);
--gradient-gold: linear-gradient(135deg, #D4AF37 0%, #F3E5AB 50%, #D4AF37 100%);
--gradient-text: linear-gradient(135deg, #D4AF37 0%, #F3E5AB 100%);
```

**Components:**
- **Cards:** `bg-card`, border-radius: 1rem, border: rgba(147, 51, 234, 0.1)
- **Buttons:** Primary (purple gradient), Gold (gold gradient), Ghost (transparent + border)
- **Shadows:** `shadow-glow` for hover states, `shadow-xl` for elevated elements

**Design Anti-Patterns to Avoid:**
- Excessive centered layouts
- Overused gradients (especially purple)
- Uniform rounded corners on all elements
- Defaulting to Inter font for everything
- "AI slop" aesthetics - generic, predictable designs

### Laravel Standards

**File Structure:**
```
app/
├── Http/
│   ├── Controllers/
│   │   ├── Api/              # API Controllers
│   │   └── Web/              # Web Controllers
│   ├── Resources/            # API Resources
│   ├── Requests/             # Form Requests
│   └── Middleware/
├── Models/                   # Eloquent Models
├── Policies/                 # Authorization Policies
├── Services/                 # Business Logic
└── Notifications/            # Notification Classes

database/
├── migrations/
├── seeders/
└── factories/

resources/
├── views/                    # Blade Templates
└── lang/                     # Localization

routes/
├── api.php                   # API Routes
└── web.php                   # Web Routes
```

**Naming Conventions:**
- **Models:** Singular, PascalCase (e.g., `Event`, `User`, `Booking`)
- **Controllers:** Plural, PascalCase + Controller (e.g., `EventsController`)
- **Tables:** Plural, snake_case (e.g., `events`, `user_profiles`)
- **Migrations:** `YYYY_MM_DD_HHMMSS_create_{table}_table.php`
- **Routes:** kebab-case for URLs (e.g., `/event-planning`)

**API Standards:**
- Base URL: `/api/v1`
- Authentication: Laravel Sanctum (Bearer token)
- Response Format:
```json
{
    "success": true,
    "message": "Description",
    "data": { ... },
    "meta": { "current_page": 1, "total": 100 }
}
```

**Database Patterns:**
- Use foreign key constraints on all relationships
- Soft deletes where appropriate
- JSON columns for flexible data (preferences, settings)
- Index frequently queried columns
- Use enum for status fields with limited values

### Frontend Patterns

**HTML Structure:**
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>[Page Name] - Emily Experience</title>
    <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="assets/css/style.css">
</head>
<body>
    <!-- Fixed Navbar -->
    <nav class="navbar">...</nav>

    <!-- Dashboard Layout -->
    <div class="dashboard-container">
        <aside class="sidebar">...</aside>
        <main class="main-content">...</main>
    </div>

    <script src="assets/js/main.js"></script>
</body>
</html>
```

**CSS Classes:**
- Use CSS variables for colors, spacing, shadows
- Component-based naming (e.g., `.card`, `.btn-primary`, `.form-input`)
- Utility classes for layout (e.g., `.grid-2`, `.flex-between`)
- Responsive breakpoints: 768px (mobile), 1024px (tablet)

**JavaScript Patterns:**
- Use ES6+ syntax (arrow functions, destructuring, async/await)
- Event delegation for dynamic elements
- API calls with `fetch()` and proper error handling
- Notification system with `showNotification(message, type)`

### Module Architecture

**Core Modules:**
1. **Identity & Access Management** - Users, roles, auth
2. **Event Planning Engine** - Event CRUD, budget, timeline
3. **AI Event Assistant** - Recommendations (mock/integration ready)
4. **Vendor Marketplace** - Vendor profiles, bookings, reviews
5. **Gifting Marketplace** - Products, orders, wishlists
6. **Rental System** - Inventory, availability calendar
7. **Payment & Wallet** - Paystack/Flutterwave integration
8. **Ticketing System** - Events, QR codes, check-in
9. **Notifications** - In-app, email, preferences
10. **Corporate Dashboard** - Bulk operations, employee mgmt
11. **Admin Panel** - Analytics, approvals, content control

---

## SEO

### On-Page SEO Standards

**Meta Tags (Every Page):**
```html
<title>[Page Title] | Emily Experience - Event Planning Platform</title>
<meta name="description" content="[Unique description under 160 chars]">
<meta name="keywords" content="event planning, wedding vendors, party rentals">
<meta name="robots" content="index, follow">
<meta name="author" content="Emily Experience">
<meta name="viewport" content="width=device-width, initial-scale=1.0">

<!-- Open Graph -->
<meta property="og:title" content="[Page Title]">
<meta property="og:description" content="[Description]">
<meta property="og:type" content="website">
<meta property="og:url" content="https://emilyexperience.com/page">
<meta property="og:image" content="https://emilyexperience.com/og-image.jpg">
<meta property="og:site_name" content="Emily Experience">

<!-- Twitter Card -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="[Page Title]">
<meta name="twitter:description" content="[Description]">
<meta name="twitter:image" content="https://emilyexperience.com/twitter-image.jpg">

<!-- Canonical URL -->
<link rel="canonical" href="https://emilyexperience.com/page">

<!-- Structured Data -->
<script type="application/ld+json">
{
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Page Title",
    "description": "Page description",
    "url": "https://emilyexperience.com/page"
}
</script>
```

**URL Structure:**
- Use kebab-case: `/event-planning`, `/vendor-marketplace`
- Keep URLs short and descriptive
- Avoid query parameters where possible (use path-based routing)
- Include target keywords in URL slugs

**Heading Hierarchy:**
```html
<h1>Main Page Title (One per page, includes primary keyword)</h1>
<h2>Section Headers</h2>
<h3>Subsections</h3>
<!-- Never skip levels (don't go h1 to h3) -->
```

**Image Optimization:**
```html
<img src="image.webp"
     alt="Descriptive alt text with keywords"
     width="800"
     height="600"
     loading="lazy">
```
- Use WebP format with fallbacks
- Descriptive file names: `wedding-venue-chicago.webp`
- Alt text under 125 characters
- Dimensions specified to prevent CLS

**Internal Linking:**
- Link to related content with descriptive anchor text
- Use breadcrumb navigation
- Include "Related Vendors" / "You May Also Like" sections
- Footer links to important pages

### Technical SEO

**Performance Requirements:**
- Page load time: < 3 seconds
- Largest Contentful Paint (LCP): < 2.5s
- First Input Delay (FID): < 100ms
- Cumulative Layout Shift (CLS): < 0.1

**Core Web Vitals:**
```html
<!-- Preconnect to critical domains -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>

<!-- Preload critical resources -->
<link rel="preload" href="assets/css/critical.css" as="style">
<link rel="preload" href="assets/images/hero.webp" as="image">

<!-- Async non-critical CSS -->
<link rel="stylesheet" href="assets/css/style.css" media="print" onload="this.media='all'">
```

**Mobile Optimization:**
- Responsive design (mobile-first)
- Touch-friendly buttons (min 44x44px)
- Readable font sizes (min 16px on mobile)
- No horizontal scrolling

**Sitemap & Robots:**
```xml
<!-- sitemap.xml -->
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <url>
        <loc>https://emilyexperience.com/</loc>
        <lastmod>2026-03-28</lastmod>
        <changefreq>weekly</changefreq>
        <priority>1.0</priority>
    </url>
    <!-- Dynamic pages added automatically -->
</urlset>
```

```
# robots.txt
User-agent: *
Allow: /
Disallow: /admin/
Disallow: /api/
Disallow: /dashboard/
Sitemap: https://emilyexperience.com/sitemap.xml
```

### Content SEO

**Keyword Strategy:**
- **Primary:** Event planning platform, wedding vendors, corporate events
- **Secondary:** Party rentals, event coordination, venue booking
- **Long-tail:** "best wedding photographers near me", "corporate event venues Chicago"

**Content Guidelines:**
- Minimum 300 words per page
- Use keywords naturally (density: 1-2%)
- Include LSI keywords (related terms)
- Update content regularly (freshness factor)
- Answer user questions (featured snippets)

**Local SEO:**
```javascript
// Location-based content
{
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Emily Experience",
    "address": {
        "@type": "PostalAddress",
        "streetAddress": "123 Main St",
        "addressLocality": "Chicago",
        "addressRegion": "IL",
        "postalCode": "60601"
    },
    "geo": {
        "@type": "GeoCoordinates",
        "latitude": "41.8781",
        "longitude": "-87.6298"
    }
}
```

---

## Lead Generation

### Lead Capture Strategy

**Primary Lead Magnets:**
1. **Free Event Planning Checklist** - PDF download
2. **Budget Calculator** - Interactive tool
3. **Vendor Comparison Guide** - Email series
4. **Free Consultation** - 30-minute call
5. **Discount Code** - 10% off first booking

**Landing Page Structure:**
```html
<!-- Hero Section -->
<section class="hero">
    <h1>Plan Your Dream Wedding Stress-Free</h1>
    <p>Get our free 50-point checklist and vendor matching guide</p>
    <form class="lead-form">
        <input type="email" placeholder="Enter your email" required>
        <input type="text" placeholder="Event type">
        <button type="submit">Get Free Guide →</button>
    </form>
    <small>No spam. Unsubscribe anytime.</small>
</section>

<!-- Social Proof -->
<section class="social-proof">
    <p>Join 10,000+ happy couples who planned their perfect event</p>
    <div class="trust-badges">
        <img src="secure-badge.svg" alt="SSL Secure">
        <img src="verified-badge.svg" alt="Verified Vendors">
    </div>
</section>
```

**Lead Form Best Practices:**
- Keep forms short (3-5 fields max)
- Progressive profiling (ask more over time)
- Inline validation with helpful error messages
- Single-column layout on mobile
- Clear CTA button (avoid "Submit", use "Get My Guide")

### Email Marketing Automation

**Welcome Series:**
```
Email 1 (Immediate): Welcome + Lead Magnet Delivery
Email 2 (Day 2): How to Use the Platform
Email 3 (Day 5): Success Stories / Testimonials
Email 4 (Day 7): Special Offer (10% off)
Email 5 (Day 14): Educational Content (blog post)
```

**Segmentation:**
- By event type (Wedding, Corporate, Birthday)
- By budget range (Under $5k, $5k-$20k, $20k+)
- By stage (Planning, Vendor Research, Ready to Book)
- By location (Geo-targeted content)

**Email Templates:**
```html
<!-- Transactional Emails -->
Subject: Welcome to Emily Experience, [Name]!
From: Sarah from Emily Experience <sarah@emilyexperience.com>
CTA: Start Planning Your Event

<!-- Promotional Emails -->
Subject: 5 Vendors Perfect for Your [Event Type]
Personalization: Based on preferences
CTA: View Recommended Vendors
```

### Conversion Optimization

**CRO Elements:**
- **Urgency:** "Limited availability - Book by [Date]"
- **Scarcity:** "Only 3 premium slots left for your date"
- **Social Proof:** Real-time booking notifications
- **Risk Reversal:** "Money-back guarantee"
- **Authority:** Featured on [Publications]

**A/B Testing Priorities:**
1. Headline variations (benefit vs. curiosity)
2. CTA button color (gold vs. purple)
3. Form fields (email only vs. email + phone)
4. Hero images (couple vs. venue)
5. Social proof placement (above vs. below fold)

**Retargeting Strategy:**
```javascript
// Facebook Pixel Events
fbq('track', 'PageView');
fbq('track', 'Lead', { content_name: 'Wedding Checklist' });
fbq('track', 'CompleteRegistration');
fbq('track', 'InitiateCheckout');
fbq('track', 'Purchase', { value: 250.00, currency: 'USD' });
```

### Lead Scoring

**Scoring Criteria:**
- Email opens: +2 points
- Link clicks: +5 points
- Visits pricing page: +10 points
- Creates account: +15 points
- Adds vendor to wishlist: +20 points
- Initiates booking: +25 points

**Lead Status:**
- Cold (0-20 points): Nurture with content
- Warm (21-50 points): Send targeted offers
- Hot (51+ points): Sales outreach

---

## Content Strategy

### Content Calendar

**Weekly Publishing Schedule:**
- **Monday:** Educational blog post (SEO-focused)
- **Wednesday:** Vendor spotlight / Case study
- **Friday:** Social media content roundup
- **Monthly:** In-depth guide / White paper

**Content Pillars:**
1. **Planning Guides** - How to plan weddings, corporate events
2. **Vendor Advice** - Choosing photographers, caterers, etc.
3. **Budget Tips** - Cost-saving strategies
4. **Trend Reports** - Latest event trends
5. **Success Stories** - Customer testimonials

### Blog Post Template

```markdown
---
title: "10 Questions to Ask Your Wedding Photographer"
slug: "questions-ask-wedding-photographer"
description: "Don't book your wedding photographer until you ask these 10 crucial questions about style, timeline, and deliverables."
keywords: ["wedding photographer", "wedding planning", "photography tips"]
published: 2026-03-28
author: "Sarah Johnson"
category: "Wedding Planning"
---

# 10 Questions to Ask Your Wedding Photographer

[Intro paragraph - hook the reader]

## 1. What's Your Photography Style?
[Content with examples]

## 2. How Many Weddings Have You Shot?
[Content]

[Continue through all 10]

## Conclusion
[Summary + CTA to book photographer]

---

**Related Articles:**
- [Link to related post]
- [Link to vendor category]

**CTA:**
[Find Your Perfect Wedding Photographer →](/vendors?category=photography)
```

### User-Generated Content

**Review Collection:**
- Post-event automated email (3 days after)
- Incentivize with entry to monthly prize draw
- Make it easy (1-5 star rating + optional text)
- Photo upload option ("Share your event photos!")

**Social Proof Display:**
- Featured reviews on homepage
- Vendor-specific reviews on profile pages
- "Recently Booked" real-time notifications
- Instagram feed integration (#EmilyExperience)

---

## Analytics & Tracking

### Key Metrics Dashboard

**Business Metrics:**
- Monthly Recurring Revenue (MRR)
- Customer Acquisition Cost (CAC)
- Lifetime Value (LTV)
- Churn Rate
- Net Promoter Score (NPS)

**Product Metrics:**
- Daily/Monthly Active Users (DAU/MAU)
- Event creation rate
- Vendor booking conversion
- Gift marketplace AOV (Average Order Value)
- Feature adoption rates

**Marketing Metrics:**
- Website traffic (sessions, users)
- Traffic sources (organic, paid, social, referral)
- Conversion rate by channel
- Landing page conversion rates
- Email open/click rates

### Event Tracking

**User Events to Track:**
```javascript
// Page Views
analytics.page('Event Planning Dashboard');

// Feature Usage
analytics.track('Event Created', {
    event_type: 'wedding',
    budget_range: '15000-20000',
    source: 'ai_assistant'
});

analytics.track('Vendor Viewed', {
    vendor_id: '123',
    vendor_category: 'photography',
    source: 'search'
});

analytics.track('Booking Initiated', {
    vendor_id: '123',
    event_id: '456',
    amount: 2500.00
});

analytics.track('Payment Completed', {
    order_id: '789',
    amount: 2500.00,
    method: 'paystack'
});
```

**E-commerce Tracking:**
```javascript
// Google Analytics 4
// Product viewed
gtag('event', 'view_item', {
    currency: 'USD',
    value: 89.99,
    items: [{
        item_id: 'gift-bundle-1',
        item_name: 'Love & Romance Bundle',
        item_category: 'Romantic',
        price: 89.99
    }]
});

// Purchase
gtag('event', 'purchase', {
    transaction_id: 'ORDER-123',
    value: 89.99,
    currency: 'USD',
    items: [...]
});
```

### Reporting

**Daily Reports:**
- New user registrations
- Events created
- Bookings made
- Revenue generated

**Weekly Reports:**
- Traffic analysis
- Top performing content
- Conversion funnel analysis
- Vendor performance

**Monthly Reports:**
- Financial summary (MRR, revenue, costs)
- Growth metrics (MoM comparison)
- Customer satisfaction (NPS, reviews)
- Platform health (uptime, bugs)

---

## DevOps & Deployment

### CI/CD Pipeline

**GitHub Actions Workflow:**
```yaml
name: Deploy to Production
on:
  push:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: shivammathur/setup-php@v2
        with:
          php-version: '8.2'
      - run: composer install
      - run: php artisan test
      - run: vendor/bin/pint --test

  deploy:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - name: Deploy to Server
        run: |
          ssh ${{ secrets.SSH_USER }}@${{ secrets.SSH_HOST }} \
            'cd /var/www/emily-experience && ./deploy.sh'
```

**Deployment Script (deploy.sh):**
- Backup current version
- Pull latest code
- Install dependencies
- Run migrations
- Optimize caches
- Restart services
- Health check

### Environment Management

**Environments:**
- **Local** - Development machines
- **Staging** - Pre-production testing
- **Production** - Live site

**Environment Variables:**
```bash
# .env.production
APP_ENV=production
APP_DEBUG=false
DB_HOST=production-db
REDIS_HOST=production-redis
CACHE_DRIVER=redis
QUEUE_CONNECTION=redis
```

### Monitoring

**Health Checks:**
- Database connectivity
- Redis connectivity
- Queue worker status
- Disk space
- SSL certificate expiry

**Alerts:**
- 500 errors > 5 in 5 minutes
- Response time > 2 seconds
- Database connections > 90% capacity
- Disk space > 85% full

---

## Communication Preferences

### How I Should Work

**General Approach:**
- Be concise but thorough
- Ask clarifying questions when requirements are vague
- Suggest improvements but respect decisions
- Test code before providing it

**Response Style:**
- **Code:** Provide complete, working implementations
- **Explanations:** Brief summaries, detailed when asked
- **Errors:** Include error messages and solutions
- **Options:** Present 2-3 approaches with trade-offs

**When to Use Formal Language:**
- Documentation files
- Comments in code
- User-facing messages

**When to Be Casual:**
- Quick clarifications
- Brainstorming sessions
- Internal notes

### Code Quality Standards

**Before Submitting Code:**
- [ ] Code follows established patterns
- [ ] No hardcoded values (use config/env)
- [ ] Error handling implemented
- [ ] Security best practices followed
- [ ] Responsive design (frontend)
- [ ] Works across supported browsers
- [ ] No console errors

**Documentation:**
- Comment complex logic
- Use PHPDoc for PHP functions
- Include usage examples in README
- Update CLAUDE.md if patterns change

### Decision Making

**I Can Decide Without Asking:**
- Variable naming within conventions
- CSS organization approach
- Internal function structure
- Small UI adjustments for consistency

**Ask Before Doing:**
- New dependencies or packages
- Changes to database schema
- API breaking changes
- New third-party services
- Pricing/business logic changes

---

## Quick Reference

### File Locations
- **Skills:** `.claude/skills/`
- **Web Assets:** `emily-experience/assets/`
- **Documentation:** Project root (`DEPLOY.md`, `README.md`)

### Common Commands
```bash
# Laravel
php artisan serve
php artisan migrate
php artisan db:seed
php artisan queue:work

# Frontend
cd emily-experience && python -m http.server 8000

# Deployment
./deploy.sh
```

### Support Contacts
- **Technical:** dev@emilyexperience.com
- **Business:** admin@emilyexperience.com

---

## Notes

- This file is living documentation - update as project evolves
- When adding new sections, maintain consistent formatting
- Skills in `.claude/skills/` extend these instructions
- Always consider mobile experience first
- Security is priority: validate inputs, escape outputs, use prepared statements

**Last Updated:** 2026-03-28 by Assistant
**Skills Library Added:** 2026-03-28 - Document creation, Visual design, Development, Communication skills
