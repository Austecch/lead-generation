# LeadGen AI - UI Components Documentation

**Design System**: Stitch Dark Theme with Teal Accents  
**Last Updated**: March 28, 2024  
**Status**: Complete and Production-Ready

---

## Table of Contents

1. [Design System](#design-system)
2. [Components](#components)
3. [Pages](#pages)
4. [Layouts](#layouts)
5. [Usage Guide](#usage-guide)
6. [Quick Reference](#quick-reference)

---

## Design System

### Color Palette

```css
/* Primary Colors */
--bg-dark: #0f131a        /* Main background */
--bg-secondary: #1a202c   /* Secondary background */
--bg-card: #232f3e        /* Card background */

/* Accent Colors */
--accent-teal: #06d6a0    /* Primary CTA/highlight */
--accent-green: #10b981   /* Secondary accent */
--accent-red: #ef4444     /* Error/hot status */
--accent-yellow: #eab308  /* Warning/warm status */
--accent-blue: #3b82f6    /* Info/completed status */

/* Text Colors */
--text-primary: #ffffff       /* Headings */
--text-secondary: #e2e8f0     /* Body text */
--text-muted: #94a3b8         /* Captions */
--text-placeholder: #64748b   /* Placeholders */
```

### Typography

- **Headings**: Playfair Display (serif) or Poppins (sans-serif)
- **Body**: Inter (sans-serif)
- **Fallbacks**: Arial (headings), Georgia (body)
- **Font Sizes**:
  - Hero: `clamp(2.5rem, 5vw, 4.5rem)`
  - H1: `clamp(2rem, 3vw, 3rem)`
  - H2: `1.5rem`
  - Body: `1rem`
  - Small: `0.875rem`

### Component Patterns

#### Card Component
```html
<div class="card">
  <!-- Content -->
</div>
```

**CSS**:
```css
.card {
  background-color: #232f3e;
  border: 1px solid rgba(147, 51, 234, 0.1);
  border-radius: 1rem;
  padding: 1.5rem;
  transition: all 0.3s ease;
}

.card:hover {
  border-color: rgba(147, 51, 234, 0.3);
  box-shadow: 0 10px 30px rgba(6, 214, 160, 0.1);
}
```

#### Button Component
```html
<!-- Primary Button -->
<button class="btn btn-primary">Action</button>

<!-- Secondary Button -->
<button class="btn btn-secondary">Secondary</button>

<!-- Ghost Button -->
<button class="btn btn-ghost">Ghost</button>
```

**CSS**:
```css
.btn {
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  font-weight: 600;
  transition: all 0.2s ease;
  border: none;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
}

.btn-primary {
  background-color: #06d6a0;
  color: #000000;
}

.btn-primary:hover {
  background-color: #04c777;
}

.btn-secondary {
  background-color: transparent;
  border: 2px solid #06d6a0;
  color: #06d6a0;
}

.btn-secondary:hover {
  background-color: rgba(6, 214, 160, 0.1);
}
```

#### Metric Card Component
```html
<div class="metric-card">
  <span class="metric-label">Total Leads</span>
  <span class="metric-value">2,847</span>
  <span class="metric-trend up">↑ 12%</span>
</div>
```

**CSS**:
```css
.metric-card {
  background: linear-gradient(135deg, #1a202c 0%, #232f3e 100%);
  padding: 1.5rem;
  border-radius: 1rem;
  border: 1px solid rgba(6, 214, 160, 0.1);
}

.metric-value {
  font-size: 2.25rem;
  font-weight: 700;
  color: #06d6a0;
  letter-spacing: -0.5px;
}

.metric-label {
  font-size: 0.875rem;
  color: #94a3b8;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.metric-trend {
  font-size: 0.875rem;
  color: #10b981;
}

.metric-trend.down {
  color: #ef4444;
}
```

#### Status Badge Component
```html
<span class="badge badge-hot">Hot</span>
<span class="badge badge-warm">Warm</span>
<span class="badge badge-cold">Cold</span>
<span class="badge badge-active">Active</span>
<span class="badge badge-paused">Paused</span>
```

**CSS**:
```css
.badge {
  display: inline-block;
  padding: 0.25rem 0.75rem;
  border-radius: 0.375rem;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
}

.badge-hot {
  background-color: rgba(239, 68, 68, 0.1);
  color: #ef4444;
}

.badge-warm {
  background-color: rgba(234, 179, 8, 0.1);
  color: #eab308;
}

.badge-cold {
  background-color: rgba(59, 130, 246, 0.1);
  color: #3b82f6;
}

.badge-active {
  background-color: rgba(6, 214, 160, 0.1);
  color: #06d6a0;
}

.badge-paused {
  background-color: rgba(148, 163, 184, 0.1);
  color: #94a3b8;
}
```

---

## Components

### 1. DashboardLayout

**File**: `components/DashboardLayout.tsx`

**Purpose**: Main layout wrapper with sidebar navigation and header

**Features**:
- Fixed left sidebar (w-64 expanded, w-20 collapsed)
- Top sticky header with page title
- Active route detection
- Collapsible navigation
- 5 main sections: Dashboard, Leads, Campaigns, Outreach, Analytics

**Props**: None (uses `usePathname()` internally)

**Usage**:
```tsx
import DashboardLayout from '@/components/DashboardLayout';

export default function AnalyticsPage() {
  return (
    <DashboardLayout>
      <h1>Analytics</h1>
      {/* Page content */}
    </DashboardLayout>
  );
}
```

**Code Structure**:
```tsx
'use client';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Menu, X, BarChart3, Users, /* ... */ } from 'lucide-react';

export default function DashboardLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const pathname = usePathname();
  
  // Navigation items with icons
  const navItems = [
    { name: 'Dashboard', href: '/dashboard', icon: BarChart3 },
    { name: 'Leads', href: '/leads', icon: Users },
    // ...
  ];
  
  return (
    <div className="flex min-h-screen bg-[#0f131a]">
      {/* Sidebar */}
      <aside className={`${sidebarOpen ? 'w-64' : 'w-20'} transition-all`}>
        {/* Navigation */}
      </aside>
      
      {/* Main */}
      <main className="flex-1">
        {/* Header */}
        {/* Content */}
      </main>
    </div>
  );
}
```

---

### 2. MetricCard

**File**: `components/MetricCard.tsx`

**Purpose**: Display key metrics with trend indicators

**Exported Components**:
- `MetricCard`: Single metric display
- `StatGrid`: Grid wrapper for multiple cards

**Props for MetricCard**:
```typescript
interface MetricCardProps {
  label: string;
  value: string | number;
  icon?: React.ReactNode;
  trend?: {
    direction: 'up' | 'down';
    percentage: number;
  };
}
```

**Usage**:
```tsx
import { MetricCard, StatGrid } from '@/components/MetricCard';
import { Users } from 'lucide-react';

export default function Dashboard() {
  return (
    <StatGrid>
      <MetricCard
        label="Total Leads"
        value={2847}
        icon={<Users size={20} />}
        trend={{ direction: 'up', percentage: 12 }}
      />
      <MetricCard
        label="Qualified Leads"
        value={487}
        icon={<Users size={20} />}
        trend={{ direction: 'up', percentage: 8 }}
      />
    </StatGrid>
  );
}
```

**Responsive Grid**:
- Mobile: 1 column
- Tablet: 2 columns
- Desktop: 4 columns

---

### 3. DataTable

**File**: `components/DataTable.tsx`

**Purpose**: Display tabular data with sorting, filtering, and pagination

**Props**:
```typescript
interface Column<T> {
  key: keyof T;
  label: string;
  width?: string;
  sortable?: boolean;
  render?: (value: any, item: T) => React.ReactNode;
}

interface DataTableProps<T> {
  title: string;
  columns: Column<T>[];
  data: T[];
  searchable?: boolean;
  pageSize?: number;
}
```

**Usage**:
```tsx
import DataTable from '@/components/DataTable';

const columns = [
  { key: 'name', label: 'Name', sortable: true },
  { 
    key: 'score', 
    label: 'Score',
    render: (value) => <span className="text-[#06d6a0]">{value}</span>
  },
  {
    key: 'status',
    label: 'Status',
    render: (value) => (
      <span className={`badge badge-${value.toLowerCase()}`}>{value}</span>
    )
  },
];

export default function LeadsPage() {
  return (
    <DataTable
      title="Leads"
      columns={columns}
      data={leadsData}
      searchable
      pageSize={10}
    />
  );
}
```

**Features**:
- **Sorting**: Click column header to sort (↑/↓ indicators)
- **Search**: Real-time filter across all columns
- **Pagination**: Numbered page buttons with "X to Y of Z"
- **Dynamic Rendering**: Custom render functions per column

---

## Pages

### 1. Dashboard Page

**File**: `app/dashboard/page.tsx`

**URL**: `/dashboard`

**Key Sections**:
1. **Header**: Title + Action button
2. **Metric Grid**: 8 cards showing key stats
3. **Recent Leads**: Latest 4 leads with status
4. **Campaign Performance**: Progress bar showing completion
5. **Quick Actions**: 3 action buttons

**Mock Data**:
- 2,847 total leads
- 487 qualified
- 12 active campaigns
- 5,230 messages sent
- 24% reply rate
- 128 appointments booked
- $18,450 total revenue
- 74 average lead score

**Layout**: Responsive grid with cards, tables, and progress indicators

---

### 2. Leads Page

**File**: `app/leads/page.tsx`

**URL**: `/leads`

**Sections**:
1. **Header**: Title + Filter/Add buttons
2. **Stats**: 4 cards (Total, Hot, Warm, Cold lead counts)
3. **Data Table**: Searchable, sortable list of leads

**Table Columns**:
- Name (text)
- Company (text)
- Email (text)
- Score (numeric, teal colored)
- Status (badge - hot/warm/cold)
- Source (text)
- Last Contact (date)

**Sample Data**:
```javascript
{
  name: 'John Smith',
  company: 'ABC Real Estate',
  email: 'john@example.com',
  score: 87,
  status: 'Hot',
  source: 'LinkedIn',
  lastContact: '2024-03-25'
}
```

---

### 3. Campaigns Page

**File**: `app/campaigns/page.tsx`

**URL**: `/campaigns`

**Sections**:
1. **Header**: Title + "New Campaign" button
2. **Stats**: 4 cards (Active, Total Leads, Messages, Appointments)
3. **Campaign List**: Table with progress visualization

**Table Columns**:
- Name (text)
- Status (badge - active/paused/draft/completed)
- Leads (numeric)
- Contacted (numeric)
- Responses (numeric)
- Response Rate (percentage)
- Progress (visual bar)

**Sample Campaign**:
```javascript
{
  name: 'Real Estate Q1',
  status: 'active',
  leads: 500,
  contacted: 389,
  responses: 54,
  responseRate: 13.9,
  progress: 78
}
```

---

### 4. Outreach Page

**File**: `app/outreach/page.tsx`

**URL**: `/outreach`

**Sections**:
1. **Header**: Title + "New Outreach" button
2. **Stats**: 3 cards (Sent, Scheduled, Open Rate)
3. **Message History**: Table of sent messages

**Table Columns**:
- Lead Name (text)
- Channel (text - Email/LinkedIn/Instagram)
- Subject (text)
- Status (badge - sent/scheduled/draft)
- Sent Date (date)
- Opened (✓/✗/-)
- Replied (✓/✗/-)

**Color Coding**:
- ✓ Yes: Teal (#06d6a0)
- ✗ No: Red (#ef4444)
- \- Pending: Gray (#94a3b8)

---

### 5. Analytics Page

**File**: `app/analytics/page.tsx`

**URL**: `/analytics`

**Sections**:
1. **Metric Cards**: 4 cards (Revenue, Cost/Lead, ROI, Conversion)
2. **Channel Performance**: Horizontal bar chart
3. **Top Campaigns**: Summary of best performers
4. **Engagement Metrics**: Email/message performance
5. **7-Day Trends**: Mini bar chart visualization

**Key Metrics**:
- Revenue: $45,230 (+28%)
- Cost Per Lead: $12.50 (+5%)
- ROI: 342% (↑)
- Conversion Rate: 4.7% (↑)

**Channel Breakdown**:
- Email: 28%
- LinkedIn: 22%
- Instagram: 18%
- Google: 15%

**Engagement**:
- Open Rate: 42%
- Click Rate: 18%
- Reply Rate: 24%
- Bounce Rate: 2.3%

---

## Layouts

### DashboardLayout Structure

```
┌─────────────────────────────────────┐
│         Top Header (64px)           │
│  LeadGen AI Logo  Page Name  Menu   │
├──────────────┬──────────────────────┤
│              │                      │
│  Sidebar     │   Main Content       │
│ (w-64/w-20)  │   (flex-1)           │
│              │                      │
│ • Dashboard  │                      │
│ • Leads      │   [Metric Cards]     │
│ • Campaigns  │   [Data Tables]      │
│ • Outreach   │   [Charts]           │
│ • Analytics  │   [Buttons]          │
│              │                      │
│ • Settings   │                      │
│ • Logout     │                      │
└──────────────┴──────────────────────┘
```

### Responsive Breakpoints

```css
/* Mobile (default) */
width < 768px {
  grid-cols: 1;
  sidebar: hidden or overlay;
}

/* Tablet */
768px <= width < 1024px {
  grid-cols: 2;
  sidebar: visible, collapsed;
}

/* Desktop */
width >= 1024px {
  grid-cols: 4;
  sidebar: visible, expanded;
}
```

---

## Usage Guide

### Getting Started

1. **Import DashboardLayout**:
```tsx
import DashboardLayout from '@/components/DashboardLayout';
```

2. **Use in your page**:
```tsx
export default function MyPage() {
  return (
    <DashboardLayout>
      <h1>Page Title</h1>
      {/* Your content */}
    </DashboardLayout>
  );
}
```

3. **Access dashboard pages**:
- [/dashboard](/dashboard) - Main analytics
- [/leads](/leads) - Lead management
- [/campaigns](/campaigns) - Campaign management
- [/outreach](/outreach) - Message tracking
- [/analytics](/analytics) - Revenue analytics

### Creating New Pages

**Template**:
```tsx
'use client';

import DashboardLayout from '@/components/DashboardLayout';
import { MetricCard, StatGrid } from '@/components/MetricCard';
import DataTable from '@/components/DataTable';

export default function NewPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Page Title</h1>
          <button className="btn btn-primary">Action</button>
        </div>

        {/* Metrics */}
        <StatGrid>
          <MetricCard label="Metric 1" value={100} />
          <MetricCard label="Metric 2" value={200} />
        </StatGrid>

        {/* Data Table */}
        <DataTable
          title="Data"
          columns={columns}
          data={data}
          searchable
        />
      </div>
    </DashboardLayout>
  );
}
```

### Using Status Badges

```tsx
// Hot/Warm/Cold status
<span className="badge badge-hot">Hot</span>
<span className="badge badge-warm">Warm</span>
<span className="badge badge-cold">Cold</span>

// Campaign status
<span className="badge badge-active">Active</span>
<span className="badge badge-paused">Paused</span>

// Custom rendering in DataTable
render: (value) => (
  <span className={`badge badge-${value.toLowerCase()}`}>
    {value}
  </span>
)
```

### Sorting and Filtering

**DataTable automatically handles**:
- Click headers to sort ascending/descending
- Type in search box to filter across all columns
- Click page numbers to navigate
- Shows pagination info: "1 to 10 of 100"

---

## Quick Reference

### File Locations
```
leadgen/
├── app/
│   ├── globals.css           # Design system
│   ├── page.tsx              # Home page
│   ├── layout.tsx            # Root layout
│   ├── dashboard/
│   │   └── page.tsx
│   ├── leads/
│   │   └── page.tsx
│   ├── campaigns/
│   │   └── page.tsx
│   ├── outreach/
│   │   └── page.tsx
│   └── analytics/
│       └── page.tsx
└── components/
    ├── DashboardLayout.tsx
    ├── MetricCard.tsx
    └── DataTable.tsx
```

### Color Variables (CSS)
```css
#0f131a   /* Primary BG */
#1a202c   /* Secondary BG */
#232f3e   /* Card BG */
#06d6a0   /* Teal Accent (Primary CTA) */
#10b981   /* Green Accent */
#ef4444   /* Red (Hot/Error) */
#eab308   /* Yellow (Warm) */
#3b82f6   /* Blue (Cold/Info) */
#94a3b8   /* Gray (Muted text) */
```

### Common CSS Classes
```css
.card             /* Card styling */
.btn btn-primary  /* Primary button */
.btn btn-secondary /* Secondary button */
.badge badge-hot  /* Hot status badge */
.metric-card      /* Metric card */
.metric-value     /* Large metric number */
.metric-label     /* Metric description */
```

### Navigation Links
- `/` - Home page
- `/dashboard` - Main dashboard (default after login)
- `/leads` - Lead management
- `/campaigns` - Campaign management
- `/outreach` - Outreach tracking
- `/analytics` - Revenue analytics

---

## Next Steps

Planned enhancements:
- [ ] Form pages (Create Lead, Create Campaign, Edit Campaign)
- [ ] Chart library integration (recharts/chart.js)
- [ ] Settings page
- [ ] User profile management
- [ ] Real database integration
- [ ] API connection
- [ ] Dark/Light theme toggle
- [ ] Export to CSV/PDF
- [ ] Mobile native app version

---

**Version**: 1.0  
**Status**: Production Ready  
**Design System**: Stitch Dark Theme  
**Framework**: Next.js 15 + React 19 + TypeScript  
**Styling**: Tailwind CSS 4.0
