# LeadGen AI - Quick Reference Card

**Status**: ✅ Production Ready  
**Design**: Stitch Dark Theme (Teal #06d6a0)  
**Framework**: Next.js 15 + React 19  
**Updated**: March 28, 2024

---

## 🎯 Quick Start (3 Steps)

```bash
# 1. Install
npm install

# 2. Run
npm run dev

# 3. Open
http://localhost:3000
```

---

## 📍 Navigation Map

| Page | URL | Purpose |
|------|-----|---------|
| Home | `/` | Landing page |
| **Dashboard** | `/dashboard` | 8 metrics overview |
| **Leads** | `/leads` | Lead management |
| **Campaigns** | `/campaigns` | Campaign tracking |
| **Outreach** | `/outreach` | Message history |
| **Analytics** | `/analytics` | Revenue & trends |

---

## 🎨 Colors (Copy-Paste Ready)

```
Teal (Primary CTA):   #06d6a0
Green (Secondary):    #10b981
Red (Hot/Error):      #ef4444
Yellow (Warm):        #eab308
Blue (Cold):          #3b82f6
Gray (Muted):         #94a3b8

Dark BG:              #0f131a
Secondary BG:         #1a202c
Card BG:              #232f3e
Border:               #2d3f52
```

---

## 💻 Component API

### MetricCard
```tsx
<MetricCard
  label="Total Leads"
  value={2847}
  icon={<Users size={20} />}
  trend={{ direction: 'up', percentage: 12 }}
/>
```

### DataTable
```tsx
<DataTable
  title="Leads"
  columns={[
    { key: 'name', label: 'Name', sortable: true },
    { key: 'score', label: 'Score', render: (v) => <span className="text-[#06d6a0]">{v}</span> }
  ]}
  data={data}
  searchable
  pageSize={10}
/>
```

### Buttons
```tsx
<button className="btn btn-primary">Primary</button>
<button className="btn btn-secondary">Secondary</button>
<button className="btn btn-ghost">Ghost</button>
```

### Badges
```tsx
<span className="badge badge-hot">Hot</span>
<span className="badge badge-warm">Warm</span>
<span className="badge badge-cold">Cold</span>
<span className="badge badge-active">Active</span>
```

### Cards
```tsx
<div className="card">
  <h3 className="text-lg font-semibold">Title</h3>
  <p>Content goes here...</p>
</div>
```

---

## 📊 Mock Data Examples

### Lead Object
```javascript
{
  name: 'John Smith',
  company: 'ABC Real Estate',
  email: 'john@abc.com',
  score: 87,
  status: 'Hot',
  source: 'LinkedIn',
  lastContact: '2024-03-25'
}
```

### Campaign Object
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

### Message Object
```javascript
{
  lead: 'John Smith',
  channel: 'Email',
  subject: 'Real Estate Opportunity',
  status: 'sent',
  sentDate: '2024-03-25',
  opened: true,
  replied: true
}
```

---

## ✨ Usage Examples

### Creating a New Page
1. Create: `app/reports/page.tsx`
2. Add to DashboardLayout navItems
3. Wrap with `<DashboardLayout>`

### Adding Metrics
```tsx
<StatGrid>
  <MetricCard label="Metric 1" value={100} />
  <MetricCard label="Metric 2" value={200} />
</StatGrid>
```

### Styling Elements
```tsx
// Teal accent
<span className="text-[#06d6a0]">Important</span>

// Green accent
<span className="text-[#10b981]">Success</span>

// Gradient text
<h1 className="gradient-text">Heading</h1>

// Card with hover
<div className="card card-hover">...</div>
```

### Search/Sort Features (Built-in)
- Click column headers to sort ↑↓
- Type in search box to filter
- Pagination auto-handles large datasets

---

## 🔧 Common Edits

### Change Page Title
Edit sidebar in `components/DashboardLayout.tsx`:
```tsx
const navItems = [
  { name: 'My Page', href: '/my-page', icon: Edit },
  // ...
];
```

### Update Mock Data
Edit arrays in page components (e.g., `app/leads/page.tsx`):
```tsx
const leadsTableData = [
  { id: 1, name: 'New Name', ... },
];
```

### Change Colors
Edit hex codes in `.tsx` files:
```tsx
<span className="text-[#NEW_HEX_CODE]">Text</span>
```

### Add New Metric
In dashboard page:
```tsx
<MetricCard
  label="Your Metric"
  value={yourValue}
  trend={{ direction: 'up', percentage: 15 }}
/>
```

---

## 📁 Key File Locations

```
/components/DashboardLayout.tsx     ← Sidebar & nav
/components/MetricCard.tsx          ← Metric display
/components/DataTable.tsx           ← Tables with sort/search
/app/globals.css                    ← All styles & colors
/app/dashboard/page.tsx             ← Main dashboard
/app/leads/page.tsx                 ← Lead list
/app/campaigns/page.tsx             ← Campaign list
/app/outreach/page.tsx              ← Message tracking
/app/analytics/page.tsx             ← Revenue chart
```

---

## 📝 Documentation References

- **Component Details** → UI-COMPONENTS.md
- **Setup & Deployment** → PROJECT-README.md
- **Full Implementation** → IMPLEMENTATION-SUMMARY.md

---

## ⚡ Performance Tips

✅ Use memo() for expensive components  
✅ Pagination for large tables (default: 10 rows)  
✅ Debounce search input with setTimeout  
✅ Cache API responses with useState + useEffect  
✅ Lazy load images with `loading="lazy"`  

---

## 🎓 Examples: How to...

### Display a Grid of Cards
```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
  <div className="card">Item 1</div>
  <div className="card">Item 2</div>
</div>
```

### Make a Button Link
```tsx
<Link href="/link-path">
  <button className="btn btn-primary">Click Me</button>
</Link>
```

### Center Content
```tsx
<div className="flex items-center justify-center">
  <span>Centered</span>
</div>
```

### Add Hover Effect
```tsx
<div className="p-4 bg-[#232f3e] rounded-lg hover:bg-[#2d3f52] transition">
  Hover over me
</div>
```

### Format Numbers
```tsx
// Large number
<span className="text-[#06d6a0] font-bold text-3xl">
  {value.toLocaleString()}
</span>

// Currency
<p className="text-[#06d6a0] font-bold">
  ${(value/1000).toFixed(1)}K
</p>

// Percentage
<p className="font-semibold">{value}%</p>
```

---

## 🐛 Troubleshooting

**Page not showing?**
- Check file in `app/` directory
- Ensure default export
- Clear `.next` cache with `rm -rf .next`

**Styles not applying?**
- Use className not style
- Check color hex codes are correct
- Verify Tailwind classes are valid

**Component not updating?**
- Add useEffect and state for data
- Check mock data is in correct format
- Verify column keys match data keys

**Table sorting broken?**
- Ensure sortable: true on column
- Check data type (string vs number)
- Verify render function returns string

---

## 🚀 Deploy in 1 Command

```bash
# Vercel (Recommended)
vercel deploy

# Docker
docker build -t leadgen . && docker run -p 3000:3000 leadgen

# Manual
npm run build && npm start
```

---

## 📊 Dashboard Features

✅ **8 Metric Cards** with trend indicators  
✅ **Searchable Tables** with sort & pagination  
✅ **Color-Coded Badges** for status (Hot/Warm/Cold/Active/Paused)  
✅ **Progress Bars** for campaign tracking  
✅ **Mock Data** for all 5 pages  
✅ **Responsive Grid** (1/2/4 columns)  
✅ **Real-time Search** with filter  
✅ **Collapsible Sidebar** for mobile  

---

## 👨‍💻 Next Features to Build

1. **Forms**: Create/Edit lead, campaign, outreach
2. **Charts**: Revenue trends, channel performance
3. **API Integration**: Connect to Laravel backend
4. **Auth**: User login/logout system
5. **Exports**: PDF/CSV download functionality

---

**Ready to build? Start with:** `npm run dev` 🚀
