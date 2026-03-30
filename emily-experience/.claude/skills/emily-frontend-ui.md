---
name: emily-frontend-ui
description: Generate consistent, luxury-themed frontend UI components for the Emily Experience platform. Use for creating HTML pages, CSS styles, forms, cards, dashboards, and any UI elements following the purple/gold design system.
---

# Emily Experience Frontend UI Skill

Generate premium, luxury-themed UI components for the Emily Experience Events & Management platform.

## Design System

### Color Palette

| Token | Value | Usage |
|-------|-------|-------|
| `--primary` | `#6B21A8` | Primary purple, buttons, accents |
| `--primary-light` | `#9333EA` | Hover states, gradients |
| `--primary-dark` | `#581C87` | Active states |
| `--gold` | `#D4AF37` | Accent color, prices, highlights |
| `--gold-light` | `#F3E5AB` | Gold gradients |
| `--bg-primary` | `#0F0A1A` | Main background (dark) |
| `--bg-secondary` | `#1A1033` | Card backgrounds, sections |
| `--bg-card` | `#261845` | Elevated cards |
| `--text-primary` | `#FFFFFF` | Headings, primary text |
| `--text-secondary` | `#E2E8F0` | Body text |
| `--text-muted` | `#94A3B8` | Captions, labels |

### Typography

- **Headings**: Playfair Display (serif) - elegant, luxury feel
- **Body**: Inter (sans-serif) - clean, readable
- **Font sizes**: Hero (clamp 2.5-4.5rem), H1 (clamp 2-3rem), H2 (1.5-2rem), Body (1rem), Small (0.85-0.9rem)

### Gradients

```css
--gradient-primary: linear-gradient(135deg, #6B21A8 0%, #9333EA 100%);
--gradient-gold: linear-gradient(135deg, #D4AF37 0%, #F3E5AB 50%, #D4AF37 100%);
--gradient-text: linear-gradient(135deg, #D4AF37 0%, #F3E5AB 100%);
```

### Border Radius

- Small: 0.5rem (`--radius-sm`)
- Medium: 0.75rem (`--radius-md`)
- Large: 1rem (`--radius-lg`)
- XL: 1.5rem (`--radius-xl`)
- Full: 9999px (`--radius-full`)

### Shadows

```css
--shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.3);
--shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.3);
--shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.3);
--shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.4);
--shadow-glow: 0 0 40px rgba(147, 51, 234, 0.3);
--shadow-gold: 0 0 40px rgba(212, 175, 55, 0.3);
```

## Component Patterns

### Navigation Bar

```html
<nav class="navbar">
  <div class="nav-container">
    <a href="index.html" class="logo">
      <span class="logo-icon">✨</span>
      <span class="logo-text">Emily<span class="highlight">Experience</span></span>
    </a>
    <ul class="nav-menu">
      <li><a href="index.html" class="active">Home</a></li>
      <li><a href="event-planning.html">Plan Event</a></li>
      <!-- More links -->
    </ul>
    <div class="nav-actions">
      <a href="dashboard.html" class="btn btn-ghost">Dashboard</a>
      <a href="login.html" class="btn btn-primary">Sign In</a>
    </div>
  </div>
</nav>
```

### Card Variants

**Standard Card** (for content blocks):
```html
<div class="card">
  <div class="card-header">
    <h3 class="card-title">Card Title</h3>
    <a href="#" class="btn btn-ghost">Action</a>
  </div>
  <!-- Content -->
</div>
```

**Vendor Card** (for marketplace):
```html
<div class="vendor-card" data-category="photography">
  <div class="vendor-image">
    <div class="placeholder-img" style="background: linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%);">
      <span>📸</span>
    </div>
    <span class="vendor-badge premium">Premium</span>
  </div>
  <div class="vendor-info">
    <h4>Vendor Name</h4>
    <div class="vendor-rating">
      <span class="stars">★★★★★</span>
      <span class="rating-text">4.9 (127 reviews)</span>
    </div>
    <p class="vendor-category">Category</p>
    <div class="vendor-price">From $500</div>
  </div>
</div>
```

**Gift Card** (for marketplace):
```html
<div class="gift-card" data-category="romantic">
  <div class="gift-image">
    <div class="placeholder-img" style="background: linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%);">
      <span>💝</span>
    </div>
  </div>
  <div class="gift-info">
    <span class="gift-category">Romantic</span>
    <h4>Gift Name</h4>
    <p class="gift-price">$89.99</p>
    <button class="btn btn-primary" style="width: 100%; margin-top: 0.5rem;">Add to Wishlist</button>
  </div>
</div>
```

**Stat Card** (for dashboards):
```html
<div class="stat-card">
  <div class="stat-header">
    <div class="stat-icon">📅</div>
    <span class="stat-change">+2 this month</span>
  </div>
  <div class="stat-value">5</div>
  <div class="stat-label">Active Events</div>
</div>
```

### Button Variants

| Class | Style | Use Case |
|-------|-------|----------|
| `btn btn-primary` | Purple gradient, white text | Primary CTAs |
| `btn btn-gold` | Gold gradient, dark text | Premium actions |
| `btn btn-ghost` | Transparent, purple border | Secondary actions |
| `btn btn-outline` | Transparent, gold border | Alternative CTAs |
| `btn btn-white` | White bg, dark text | Dark backgrounds |
| `btn btn-outline-white` | Transparent, white border | Hero sections |

### Form Elements

```html
<div class="form-group">
  <label class="form-label">Label Text</label>
  <input type="text" class="form-input" placeholder="Placeholder...">
</div>

<div class="form-group">
  <label class="form-label">Select Option</label>
  <select class="form-select">
    <option>Option 1</option>
  </select>
</div>

<div class="form-group">
  <label class="form-label">Message</label>
  <textarea class="form-textarea" placeholder="Enter text..."></textarea>
</div>
```

### Section Headers

```html
<div class="section-header">
  <span class="section-tag">Tag Label</span>
  <h2 class="section-title">Section Title</h2>
  <p class="section-subtitle">Description text goes here</p>
</div>
```

### Sidebar Navigation (Dashboard)

```html
<aside class="sidebar">
  <nav class="sidebar-nav">
    <a href="dashboard.html" class="sidebar-link active">
      <span class="icon">📊</span>
      <span>Overview</span>
    </a>
    <!-- More links -->
  </nav>
</aside>
```

## Layout Patterns

### Container

```html
<div class="container">
  <!-- Content with max-width: 1200px, centered -->
</div>
```

### Grid Layouts

**2-column grid**:
```html
<div class="grid-2">
  <!-- 2 items side by side -->
</div>
```

**3-column grid**:
```html
<div class="grid-3">
  <!-- 3 items side by side -->
</div>
```

**Responsive card grid**:
```html
<div class="vendor-grid">
  <!-- Auto-fills minmax(280px, 1fr) -->
</div>
```

### Dashboard Layout

```html
<div class="dashboard-container">
  <aside class="sidebar">
    <!-- Sidebar nav -->
  </aside>
  <main class="main-content">
    <!-- Page content -->
  </main>
</div>
```

## Icon Conventions

Use emoji for icons (no icon library needed):
- 📊 Dashboard
- 📅 Events/Calendar
- 🛒 Bookings/Orders
- 🎁 Gifts
- 💳 Payments
- 👤 Profile
- ⚙️ Settings
- 🧑‍💼 Vendors
- 🎫 Tickets
- 💰 Revenue/Money
- ✨ Logo/Brand
- ⭐ Ratings
- 📈 Analytics

## Placeholder Images

For development, use gradient divs with emoji:

```html
<div class="placeholder-img" style="background: linear-gradient(135deg, #COLOR1 0%, #COLOR2 100%);">
  <span>EMOJI</span>
</div>
```

**Gradient Presets**:
- Romantic: `#ffecd2` to `#fcb69f` (pink/orange)
- Luxury: `#a8edea` to `#fed6e3` (mint/pink)
- Kids: `#d299c2` to `#fef9d7` (purple/yellow)
- Corporate: `#89f7fe` to `#66a6ff` (blue)
- Wedding: `#667eea` to `#764ba2` (purple)
- Floral: `#f093fb` to `#f5576c` (pink)
- Elegant: `#fa709a` to `#fee140` (pink/gold)

## File Structure

When creating new pages:

```
page-name.html
├── Navigation bar (fixed, glassmorphism)
├── Sidebar (for dashboard pages)
├── Main content area
│   ├── Page header (title + description)
│   ├── Cards/sections
│   └── Forms/tables
└── Footer (for marketing pages)
```

## Responsive Breakpoints

- Desktop: 1024px+
- Tablet: 768px - 1023px
- Mobile: < 768px

Key responsive rules:
- Stack grid columns on mobile
- Hide sidebar on mobile (hamburger menu)
- Reduce font sizes with `clamp()`
- Full-width cards on mobile

## Do's and Don'ts

✅ DO:
- Use the color variables consistently
- Apply `text-gradient` class for gold headlines
- Include proper ARIA labels on buttons
- Use semantic HTML (nav, aside, main, section)
- Add hover effects on interactive elements

❌ DON'T:
- Use hardcoded colors (use CSS variables)
- Use black/white without opacity (use #0F0A1A, #FFFFFF)
- Forget mobile responsiveness
- Use generic placeholder text (use contextual examples)
- Skip focus states for accessibility

## Examples

### Generate a Settings Page

```html
<!-- Page structure -->
<div class="dashboard-container">
  <aside class="sidebar">...</aside>
  <main class="main-content">
    <div class="page-header">
      <h1>Settings ⚙️</h1>
      <p>Manage your account preferences</p>
    </div>

    <div class="grid-2">
      <div class="card">
        <h3 class="card-title">Profile Information</h3>
        <form>
          <div class="form-group">...</div>
        </form>
      </div>

      <div class="card">
        <h3 class="card-title">Notifications</h3>
        <!-- Toggle switches -->
      </div>
    </div>
  </main>
</div>
```

### Generate a Data Table

```html
<div class="card">
  <div class="card-header">
    <h3 class="card-title">Recent Orders</h3>
    <a href="#" class="btn btn-ghost">View All</a>
  </div>
  <div class="table-container">
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Customer</th>
          <th>Amount</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>#123</td>
          <td>John Doe</td>
          <td style="color: var(--gold);">$250</td>
          <td><span class="status status-success">Completed</span></td>
        </tr>
      </tbody>
    </table>
  </div>
</div>
```

## Output Format

When generating UI:
1. Provide complete, valid HTML
2. Reference existing CSS classes (from style.css)
3. Use consistent indentation (4 spaces)
4. Include comments for major sections
5. Add interactivity with `onclick` handlers that call functions from main.js
