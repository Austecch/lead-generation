'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  LayoutDashboard, Calendar, Users, Package, BarChart2, Settings,
  LogOut, Check, X, ChevronRight, Bell, Menu, TrendingUp,
  DollarSign, Star, AlertCircle, Image, FileText, Wrench, Trash2,
  Plus, Edit3, Eye, EyeOff, BookOpen, Lock, Mail, Save, Upload,
  ChevronDown, MessageSquare, Phone, Globe, CheckCircle
} from 'lucide-react'

// ─── Types ─────────────────────────────────────────────────────────────────
interface PortfolioItem { id: number; title: string; venue: string; style: string; image: string; published: boolean }
interface BlogPost { id: number; title: string; category: string; status: string; date: string; views: number }
interface Service { id: number; title: string; price: string; status: string; description: string }
interface Booking { couple: string; date: string; service: string; status: string; planner: string; venue: string; budget: string; email?: string; phone?: string }
interface Vendor { name: string; category: string; contact: string; rating: number; weddings: number; status: string }
interface Message { id: string; from: string; subject: string; time: string; read: boolean; body: string }

// ─── Seed Data ─────────────────────────────────────────────────────────────
const seedBookings: Booking[] = [
  { couple: 'Sophia & James Hartley',  date: 'Oct 4, 2025',  service: 'Full Planning',      status: 'active',  planner: 'Melisa',      venue: 'Park Chateau',    budget: '$85,000',  email: 'sophia@email.com', phone: '+1 908 555 0101' },
  { couple: 'Mei & David Zhang',       date: 'May 10, 2025', service: 'Day-of Coordination', status: 'active',  planner: 'Emmanuel',    venue: 'Skylands Manor',  budget: '$42,000',  email: 'mei@email.com',   phone: '+1 908 555 0102' },
  { couple: 'Layla & Marcus Brown',    date: 'Jul 19, 2025', service: 'Partial Planning',   status: 'pending', planner: 'Unassigned',  venue: 'TBD',             budget: '$60,000',  email: 'layla@email.com', phone: '+1 908 555 0103' },
  { couple: 'Chloe & Ethan Davis',     date: 'Aug 30, 2025', service: 'Full Planning',      status: 'pending', planner: 'Unassigned',  venue: 'TBD',             budget: '$110,000', email: 'chloe@email.com', phone: '+1 908 555 0104' },
  { couple: 'Natalie & Ryan Pierce',   date: 'Nov 22, 2025', service: 'Rental Service',     status: 'inquiry', planner: 'Unassigned',  venue: 'The Grand Ballroom', budget: '$15,000', email: 'natalie@email.com', phone: '+1 908 555 0105' },
  { couple: 'Grace & Oliver Kim',      date: 'Mar 14, 2026', service: 'Destination Event',  status: 'inquiry', planner: 'Unassigned',  venue: 'Amalfi Coast',    budget: '$200,000+',email: 'grace@email.com', phone: '+1 908 555 0106' },
]

const seedPortfolio: PortfolioItem[] = [
  { id: 1, title: 'Sophia & James',  venue: 'Park Chateau Estate', style: 'Romantic Garden', image: 'https://images.unsplash.com/photo-1606800052052-a08af7148866?w=400&h=300&fit=crop', published: true },
  { id: 2, title: 'Elena & Marcus',  venue: 'The Grand Ballroom',  style: 'Black Tie',       image: 'https://images.unsplash.com/photo-1470116945706-e6bf5d5a53ca?w=400&h=300&fit=crop', published: true },
  { id: 3, title: 'Amara & Daniel',  venue: 'Natirar Mansion',     style: 'Rustic Luxe',     image: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=400&h=300&fit=crop', published: true },
  { id: 4, title: 'Claire & William',venue: 'Liberty House',       style: 'Modern Minimal',  image: 'https://images.unsplash.com/photo-1529636798458-92182e662485?w=400&h=300&fit=crop', published: false },
]

const seedBlog: BlogPost[] = [
  { id: 1, title: '10 Essential Steps to Planning Your Dream Wedding', category: 'Planning Tips',       status: 'published', date: 'Mar 15, 2025', views: 1240 },
  { id: 2, title: 'The 12 Rental Items That Instantly Transform Any Venue', category: 'Rentals & Decor', status: 'published', date: 'Feb 28, 2025', views: 890 },
  { id: 3, title: 'The Ultimate Corporate Event Cleaning Checklist',        category: 'Cleaning & Logistics', status: 'published', date: 'Feb 10, 2025', views: 620 },
  { id: 4, title: "New Jersey's Most Stunning Wedding Venues in 2025",      category: 'Venue Guides',   status: 'draft',     date: 'Jan 22, 2025', views: 0 },
  { id: 5, title: 'How to Plan a Destination Wedding on Any Budget',        category: 'Destination',    status: 'draft',     date: 'Jan 5, 2025',  views: 0 },
]

const seedServices: Service[] = [
  { id: 1, title: 'Full Event Planning',    price: 'From $8,500',  status: 'active', description: 'End-to-end event design and management.' },
  { id: 2, title: 'Partial Planning',       price: 'From $4,500',  status: 'active', description: 'Step-in coordination and vendor support.' },
  { id: 3, title: 'Day-of Coordination',    price: 'From $2,200',  status: 'active', description: 'On-the-day logistics and vendor management.' },
  { id: 4, title: 'Destination Events',     price: 'Custom Quote', status: 'active', description: 'Full planning for international or destination events.' },
  { id: 5, title: 'Rental Service',         price: 'From $500',    status: 'active', description: 'Furniture, arches, linen, centrepieces & lighting hire.' },
  { id: 6, title: 'Cleaning Service',       price: 'Custom Quote', status: 'active', description: 'Pre, during and post-event corporate & venue cleaning.' },
]

const seedVendors: Vendor[] = [
  { name: 'Bloom & Co. Florals',      category: 'Florals',        contact: 'hello@bloomandco.com',    rating: 5, weddings: 24, status: 'preferred' },
  { name: 'Golden Lens Studio',       category: 'Photography',    contact: 'shoot@goldenlens.com',    rating: 5, weddings: 18, status: 'preferred' },
  { name: 'Aria Catering Co.',        category: 'Catering',       contact: 'events@ariacatering.com', rating: 4, weddings: 31, status: 'approved' },
  { name: 'Strings & Things Music',   category: 'Entertainment',  contact: 'hello@stringsthings.com', rating: 5, weddings: 15, status: 'preferred' },
]

const seedMessages: Message[] = [
  { id: 'm1', from: 'Sophia Hartley',  subject: 'Floral update for October',      time: '2h ago',   read: false, body: 'Hi Melisa, just wanted to confirm the floral selections we discussed last week. Are the white peonies confirmed with Bloom & Co.?' },
  { id: 'm2', from: 'Grace Kim',       subject: 'Amalfi Coast timeline question', time: '1d ago',   read: false, body: 'Hello, I was wondering if you had an updated timeline for our destination event planning. When should we expect the full itinerary?' },
  { id: 'm3', from: 'Layla Brown',     subject: 'Venue shortlist',                time: '2d ago',   read: true,  body: 'We have narrowed it down to three venues. Can we schedule a call this week to go over the pros and cons of each?' },
  { id: 'm4', from: 'Chloe Davis',     subject: 'Contract signing date',          time: '3d ago',   read: true,  body: 'Just confirming we are available to sign the contract on Friday the 15th. Please let us know the time and location.' },
]

// ─── Nav Items ─────────────────────────────────────────────────────────────
const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard',  id: 'dashboard' },
  { icon: Calendar,        label: 'Bookings',   id: 'bookings' },
  { icon: Users,           label: 'Clients',    id: 'clients' },
  { icon: MessageSquare,   label: 'Messages',   id: 'messages' },
  { icon: Image,           label: 'Portfolio',  id: 'portfolio' },
  { icon: BookOpen,        label: 'Blog',       id: 'blog' },
  { icon: Wrench,          label: 'Services',   id: 'services' },
  { icon: Package,         label: 'Vendors',    id: 'vendors' },
  { icon: BarChart2,       label: 'Analytics',  id: 'analytics' },
  { icon: Settings,        label: 'Settings',   id: 'settings' },
]

// ─── Shared UI helpers ─────────────────────────────────────────────────────
const F = 'var(--font-sans)'
const S = 'var(--font-serif)'

const Badge = ({ status }: { status: string }) => {
  const map: Record<string, { bg: string; color: string; label: string }> = {
    active:    { label: 'Active',     bg: 'rgba(100,180,100,0.15)', color: '#3A7A3A' },
    pending:   { label: 'Pending',    bg: 'rgba(226,201,126,0.25)', color: '#7A6030' },
    inquiry:   { label: 'Inquiry',    bg: 'rgba(201,168,76,0.18)',  color: '#9B7A2F' },
    published: { label: 'Published',  bg: 'rgba(100,180,100,0.15)', color: '#3A7A3A' },
    draft:     { label: 'Draft',      bg: 'rgba(180,180,180,0.2)',  color: '#888' },
    preferred: { label: 'Preferred',  bg: 'rgba(201,168,76,0.18)',  color: '#9B7A2F' },
    approved:  { label: 'Approved',   bg: 'rgba(100,180,100,0.15)', color: '#3A7A3A' },
    disabled:  { label: 'Disabled',   bg: 'rgba(200,80,80,0.12)',   color: '#A04040' },
  }
  const s = map[status] || map.draft
  return (
    <span style={{ fontFamily: F, background: s.bg, color: s.color, fontSize: '0.55rem', letterSpacing: '0.15em', textTransform: 'uppercase', padding: '0.25rem 0.65rem', whiteSpace: 'nowrap' }}>
      {s.label}
    </span>
  )
}

const FieldLabel = ({ text }: { text: string }) => (
  <div style={{ fontFamily: F, color: '#C9A84C', fontSize: '0.55rem', letterSpacing: '0.25em', textTransform: 'uppercase', marginBottom: '0.4rem' }}>{text}</div>
)

const Input = ({ label, value, onChange, type = 'text', placeholder = '' }: { label: string; value: string; onChange: (v: string) => void; type?: string; placeholder?: string }) => (
  <div>
    <FieldLabel text={label} />
    <input
      type={type}
      value={value}
      placeholder={placeholder}
      onChange={e => onChange(e.target.value)}
      style={{ width: '100%', background: '#FAF6EF', border: '1px solid #E2D9CC', padding: '0.75rem 1rem', fontSize: '0.87rem', color: '#2C2C2C', fontFamily: F, fontWeight: 300, outline: 'none', boxSizing: 'border-box' }}
    />
  </div>
)

const Textarea = ({ label, value, onChange, rows = 3 }: { label: string; value: string; onChange: (v: string) => void; rows?: number }) => (
  <div>
    <FieldLabel text={label} />
    <textarea
      value={value}
      rows={rows}
      onChange={e => onChange(e.target.value)}
      style={{ width: '100%', background: '#FAF6EF', border: '1px solid #E2D9CC', padding: '0.75rem 1rem', fontSize: '0.87rem', color: '#2C2C2C', fontFamily: F, fontWeight: 300, outline: 'none', resize: 'vertical', boxSizing: 'border-box' }}
    />
  </div>
)

const SelectField = ({ label, value, onChange, options }: { label: string; value: string; onChange: (v: string) => void; options: string[] }) => (
  <div>
    <FieldLabel text={label} />
    <select
      value={value}
      onChange={e => onChange(e.target.value)}
      style={{ width: '100%', background: '#FAF6EF', border: '1px solid #E2D9CC', padding: '0.75rem 1rem', fontSize: '0.87rem', color: '#2C2C2C', fontFamily: F, fontWeight: 300, outline: 'none', appearance: 'none', cursor: 'pointer', boxSizing: 'border-box' }}
    >
      {options.map(o => <option key={o} value={o}>{o}</option>)}
    </select>
  </div>
)

const BtnPrimary = ({ onClick, children }: { onClick: () => void; children: React.ReactNode }) => (
  <button onClick={onClick} style={{ background: '#2C2C2C', color: '#FFFDF7', fontFamily: F, fontSize: '0.63rem', letterSpacing: '0.15em', textTransform: 'uppercase', padding: '0.75rem 1.75rem', border: 'none', cursor: 'pointer', whiteSpace: 'nowrap' }}>
    {children}
  </button>
)

const BtnGhost = ({ onClick, children }: { onClick: () => void; children: React.ReactNode }) => (
  <button onClick={onClick} style={{ background: 'transparent', color: '#7A7068', fontFamily: F, fontSize: '0.63rem', letterSpacing: '0.15em', textTransform: 'uppercase', padding: '0.75rem 1.5rem', border: '1px solid #E2D9CC', cursor: 'pointer', whiteSpace: 'nowrap' }}>
    {children}
  </button>
)

// ─── Modal wrapper ──────────────────────────────────────────────────────────
const Modal = ({ title, onClose, children }: { title: string; onClose: () => void; children: React.ReactNode }) => (
  <div style={{ position: 'fixed', inset: 0, zIndex: 300, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
    <div style={{ position: 'absolute', inset: 0, background: 'rgba(28,22,16,0.7)' }} onClick={onClose} />
    <div style={{ position: 'relative', background: '#FFFDF7', width: '100%', maxWidth: 560, maxHeight: '90vh', overflowY: 'auto', boxShadow: '0 24px 80px rgba(0,0,0,0.3)' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1.5rem 2rem', borderBottom: '1px solid #E2D9CC' }}>
        <h2 style={{ fontFamily: S, color: '#2C2C2C', fontSize: '1.1rem', fontWeight: 400 }}>{title}</h2>
        <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#7A7068', display: 'flex' }}><X size={18} /></button>
      </div>
      <div style={{ padding: '2rem' }}>{children}</div>
    </div>
  </div>
)

// ─── Toast ─────────────────────────────────────────────────────────────────
const Toast = ({ msg }: { msg: string }) => (
  <div style={{ position: 'fixed', bottom: '2rem', right: '2rem', zIndex: 400, background: '#2C2C2C', color: '#FFFDF7', fontFamily: F, fontSize: '0.8rem', padding: '0.9rem 1.5rem', display: 'flex', alignItems: 'center', gap: '0.6rem', boxShadow: '0 8px 32px rgba(0,0,0,0.3)' }}>
    <CheckCircle size={15} style={{ color: '#C9A84C' }} /> {msg}
  </div>
)

// ═══════════════════════════════════════════════════════════════════════════
// MAIN COMPONENT
// ═══════════════════════════════════════════════════════════════════════════
export default function AdminPage() {
  // ── Auth ──
  const [authed, setAuthed]       = useState(false)
  const [loginEmail, setLoginEmail]   = useState('')
  const [loginPass, setLoginPass]     = useState('')
  const [loginError, setLoginError]   = useState('')
  const [showPass, setShowPass]       = useState(false)
  const [loggingIn, setLoggingIn]     = useState(false)

  // ── Layout ──
  const [activeTab, setActiveTab]     = useState('dashboard')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [notifications, setNotifications] = useState([
    { id: 'n1', text: 'New inquiry from Grace & Oliver Kim', read: false },
    { id: 'n2', text: 'Sophia Hartley sent a message',       read: false },
    { id: 'n3', text: 'New booking request — Natalie Pierce', read: true },
  ])
  const [showNotif, setShowNotif] = useState(false)
  const [toast, setToast]         = useState('')

  // ── Data ──
  const [bookings,  setBookings]  = useState<Booking[]>(seedBookings)
  const [portfolio, setPortfolio] = useState<PortfolioItem[]>(seedPortfolio)
  const [blogs,     setBlogs]     = useState<BlogPost[]>(seedBlog)
  const [services,  setServices]  = useState<Service[]>(seedServices)
  const [vendors,   setVendors]   = useState<Vendor[]>(seedVendors)
  const [messages,  setMessages]  = useState<Message[]>(seedMessages)

  // ── Modal states ──
  const [modal, setModal] = useState<string | null>(null)
  const [selected, setSelected] = useState<any>(null)
  const [activeMsg, setActiveMsg] = useState<Message | null>(null)
  const [replyText, setReplyText] = useState('')
  const [replySent, setReplySent] = useState<string[]>([])

  // ── New booking form ──
  const [nb, setNb] = useState({ couple: '', email: '', phone: '', date: '', service: 'Full Planning', venue: '', budget: '', planner: 'Emmanuel', notes: '' })

  // ── New blog form ──
  const [bf, setBf] = useState({ title: '', category: 'Planning Tips', status: 'draft', excerpt: '', body: '' })

  // ── New portfolio form ──
  const [pf, setPf] = useState({ title: '', venue: '', style: '', image: '' })

  // ── New service form ──
  const [sf, setSf] = useState({ title: '', price: '', description: '' })

  // ── New vendor form ──
  const [vf, setVf] = useState({ name: '', category: 'Florals', contact: '', rating: '5', weddings: '0' })

  // ── Settings form ──
  const [settings, setSettings] = useState({
    businessName: 'Emmeli Experience',
    owners: 'Mr & Mrs Emmanuel & Melisa Ogedegbe',
    email: 'hello@emmeliexperience.com',
    phone: '+1 (908) 555-0192',
    street: '12 Prospect Street',
    city: 'Morristown, NJ 07960',
    instagram: '@emmeliexperience',
    website: 'www.emmeliexperience.com',
  })

  const showToast = (msg: string) => {
    setToast(msg)
    setTimeout(() => setToast(''), 3000)
  }

  const unread = notifications.filter(n => !n.read).length

  // ── Login handler ──
  const handleLogin = () => {
    if (!loginEmail || !loginPass) { setLoginError('Please enter your email and password.'); return }
    setLoggingIn(true)
    setTimeout(() => {
      if (loginEmail === 'admin@emmeliexperience.com' && loginPass === 'admin123') {
        setAuthed(true)
        setLoginError('')
      } else {
        setLoginError('Invalid credentials. Try admin@emmeliexperience.com / admin123')
      }
      setLoggingIn(false)
    }, 1000)
  }

  // ─── Login Screen ──────────────────────────────────────────────────────
  if (!authed) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', background: '#1C1610' }}>
        {/* Left panel */}
        <div style={{ flex: 1, display: 'none', position: 'relative', overflow: 'hidden' }} className="lg:block">
          <img
            src="https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=900&h=1200&fit=crop"
            alt="Emmeli Experience wedding"
            style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.4 }}
          />
          <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '3rem' }}>
            <div style={{ fontFamily: F, fontSize: '0.55rem', letterSpacing: '0.35em', textTransform: 'uppercase', color: '#C9A84C', marginBottom: '0.75rem' }}>Admin Portal</div>
            <div style={{ fontFamily: S, fontSize: '2.5rem', color: '#F5E6C8', lineHeight: 1.1, marginBottom: '1rem' }}>Emmeli<br />Experience</div>
            <div style={{ fontFamily: F, fontSize: '0.8rem', color: 'rgba(245,230,200,0.6)', fontWeight: 300, lineHeight: 1.7 }}>
              Manage your portfolio, blog, services,<br />bookings and clients — all in one place.
            </div>
          </div>
        </div>

        {/* Right panel */}
        <div style={{ width: '100%', maxWidth: 480, margin: '0 auto', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '3rem 2.5rem' }}>
          <div style={{ marginBottom: '2.5rem' }}>
            <div style={{ fontFamily: F, fontSize: '0.55rem', letterSpacing: '0.35em', textTransform: 'uppercase', color: '#C9A84C', marginBottom: '0.6rem' }}>Welcome back</div>
            <h1 style={{ fontFamily: S, color: '#F5E6C8', fontSize: '2rem', fontWeight: 400, marginBottom: '0.5rem' }}>Sign in to Admin</h1>
            <p style={{ fontFamily: F, color: 'rgba(245,230,200,0.5)', fontSize: '0.83rem', fontWeight: 300 }}>Emmeli Experience management portal</p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div>
              <FieldLabel text="Email Address" />
              <div style={{ position: 'relative' }}>
                <Mail size={14} style={{ position: 'absolute', left: '0.9rem', top: '50%', transform: 'translateY(-50%)', color: '#7A7068' }} />
                <input
                  type="email"
                  value={loginEmail}
                  placeholder="admin@emmeliexperience.com"
                  onChange={e => setLoginEmail(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleLogin()}
                  style={{ width: '100%', background: 'rgba(255,253,247,0.05)', border: '1px solid rgba(201,168,76,0.3)', padding: '0.85rem 1rem 0.85rem 2.5rem', fontSize: '0.87rem', color: '#F5E6C8', fontFamily: F, outline: 'none', boxSizing: 'border-box' }}
                />
              </div>
            </div>
            <div>
              <FieldLabel text="Password" />
              <div style={{ position: 'relative' }}>
                <Lock size={14} style={{ position: 'absolute', left: '0.9rem', top: '50%', transform: 'translateY(-50%)', color: '#7A7068' }} />
                <input
                  type={showPass ? 'text' : 'password'}
                  value={loginPass}
                  placeholder="••••••••"
                  onChange={e => setLoginPass(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleLogin()}
                  style={{ width: '100%', background: 'rgba(255,253,247,0.05)', border: '1px solid rgba(201,168,76,0.3)', padding: '0.85rem 2.5rem 0.85rem 2.5rem', fontSize: '0.87rem', color: '#F5E6C8', fontFamily: F, outline: 'none', boxSizing: 'border-box' }}
                />
                <button onClick={() => setShowPass(p => !p)} style={{ position: 'absolute', right: '0.9rem', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#7A7068', display: 'flex' }}>
                  {showPass ? <EyeOff size={14} /> : <Eye size={14} />}
                </button>
              </div>
            </div>

            {loginError && (
              <div style={{ background: 'rgba(200,80,80,0.15)', border: '1px solid rgba(200,80,80,0.3)', padding: '0.75rem 1rem', fontFamily: F, color: '#E88', fontSize: '0.8rem' }}>
                {loginError}
              </div>
            )}

            <button
              onClick={handleLogin}
              disabled={loggingIn}
              style={{ background: '#C9A84C', color: '#1C1610', fontFamily: F, fontSize: '0.63rem', letterSpacing: '0.2em', textTransform: 'uppercase', padding: '1rem 2rem', border: 'none', cursor: loggingIn ? 'wait' : 'pointer', fontWeight: 500, marginTop: '0.5rem' }}
            >
              {loggingIn ? 'Signing in...' : 'Sign In to Admin'}
            </button>

            <div style={{ fontFamily: F, color: 'rgba(245,230,200,0.3)', fontSize: '0.73rem', textAlign: 'center', borderTop: '1px solid rgba(201,168,76,0.1)', paddingTop: '1.25rem' }}>
              Demo: admin@emmeliexperience.com &nbsp;/&nbsp; admin123
            </div>
          </div>

          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '2.5rem', color: 'rgba(245,230,200,0.35)', fontFamily: F, fontSize: '0.73rem', textDecoration: 'none' }}>
            &larr; Back to website
          </Link>
        </div>
      </div>
    )
  }

  // ─── Sidebar ───────────────────────────────────────────────────────────
  const SidebarContent = () => (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div style={{ padding: '1.75rem 1.5rem', borderBottom: '1px solid rgba(201,168,76,0.15)' }}>
        <div style={{ fontFamily: S, color: '#F5E6C8', fontSize: '1.1rem', marginBottom: '0.2rem' }}>Emmeli Experience</div>
        <div style={{ fontFamily: F, color: '#C9A84C', fontSize: '0.5rem', letterSpacing: '0.3em', textTransform: 'uppercase' }}>Admin Portal</div>
      </div>
      <nav style={{ padding: '1rem 0.75rem', flex: 1, overflowY: 'auto' }}>
        {navItems.map(item => (
          <button key={item.id} onClick={() => { setActiveTab(item.id); setSidebarOpen(false) }}
            style={{
              width: '100%', display: 'flex', alignItems: 'center', gap: '0.75rem',
              padding: '0.7rem 1rem', marginBottom: '0.1rem',
              background: activeTab === item.id ? 'rgba(201,168,76,0.12)' : 'transparent',
              borderLeft: `2px solid ${activeTab === item.id ? '#C9A84C' : 'transparent'}`,
              color: activeTab === item.id ? '#C9A84C' : '#7A7068',
              border: 'none', borderLeftStyle: 'solid', cursor: 'pointer', textAlign: 'left', transition: 'all 0.2s',
            }}
          >
            <item.icon size={14} />
            <span style={{ fontFamily: F, fontSize: '0.77rem', fontWeight: 300 }}>{item.label}</span>
            {item.id === 'messages' && messages.filter(m => !m.read).length > 0 && (
              <span style={{ marginLeft: 'auto', background: '#C9A84C', color: '#1C1610', fontSize: '0.55rem', padding: '0.15rem 0.45rem', fontFamily: F }}>
                {messages.filter(m => !m.read).length}
              </span>
            )}
          </button>
        ))}
      </nav>
      <div style={{ padding: '1.25rem 1.5rem', borderTop: '1px solid rgba(201,168,76,0.1)' }}>
        <button onClick={() => setAuthed(false)} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#5C5248', background: 'none', border: 'none', fontFamily: F, fontSize: '0.75rem', cursor: 'pointer', width: '100%' }}>
          <LogOut size={13} /> Sign Out
        </button>
      </div>
    </div>
  )

  // ─── Render ────────────────────────────────────────────────────────────
  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#FAF6EF' }}>
      {/* Desktop sidebar */}
      <aside style={{ width: 220, background: '#1C1610', position: 'fixed', top: 0, left: 0, height: '100%', zIndex: 30, display: 'none' }} className="lg:block">
        <SidebarContent />
      </aside>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 200, display: 'flex' }}>
          <div style={{ width: 220, background: '#1C1610', height: '100%', overflowY: 'auto' }}><SidebarContent /></div>
          <div style={{ flex: 1, background: 'rgba(0,0,0,0.6)' }} onClick={() => setSidebarOpen(false)} />
        </div>
      )}

      {/* Main content */}
      <main style={{ flex: 1, minWidth: 0 }} className="lg:ml-[220px]">

        {/* Topbar */}
        <div style={{ position: 'sticky', top: 0, zIndex: 20, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 1.5rem', height: 60, background: '#FFFDF7', borderBottom: '1px solid #E2D9CC' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <button onClick={() => setSidebarOpen(true)} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', padding: 4 }} className="lg:hidden">
              <Menu size={20} style={{ color: '#2C2C2C' }} />
            </button>
            <h1 style={{ fontFamily: S, color: '#2C2C2C', fontSize: '1.15rem', fontWeight: 400 }}>
              {navItems.find(n => n.id === activeTab)?.label}
            </h1>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', position: 'relative' }}>
            <button onClick={() => setShowNotif(p => !p)} style={{ position: 'relative', background: 'none', border: 'none', cursor: 'pointer', padding: 6, display: 'flex' }}>
              <Bell size={18} style={{ color: '#7A7068' }} />
              {unread > 0 && <span style={{ position: 'absolute', top: 4, right: 4, width: 8, height: 8, borderRadius: '50%', background: '#C9A84C' }} />}
            </button>
            {showNotif && (
              <div style={{ position: 'absolute', top: '110%', right: 0, width: 300, background: '#FFFDF7', border: '1px solid #E2D9CC', boxShadow: '0 8px 32px rgba(0,0,0,0.12)', zIndex: 100 }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem 1.25rem', borderBottom: '1px solid #E2D9CC' }}>
                  <span style={{ fontFamily: F, fontSize: '0.75rem', color: '#2C2C2C' }}>Notifications</span>
                  <button onClick={() => { setNotifications(n => n.map(x => ({ ...x, read: true }))); setShowNotif(false) }} style={{ fontFamily: F, fontSize: '0.65rem', color: '#C9A84C', background: 'none', border: 'none', cursor: 'pointer' }}>Mark all read</button>
                </div>
                {notifications.map(n => (
                  <div key={n.id} onClick={() => setNotifications(ns => ns.map(x => x.id === n.id ? { ...x, read: true } : x))} style={{ display: 'flex', gap: '0.75rem', padding: '0.9rem 1.25rem', borderBottom: '1px solid #F0EBE3', cursor: 'pointer', background: n.read ? 'transparent' : 'rgba(201,168,76,0.06)' }}>
                    <div style={{ width: 6, height: 6, borderRadius: '50%', background: n.read ? 'transparent' : '#C9A84C', marginTop: 6, flexShrink: 0 }} />
                    <span style={{ fontFamily: F, fontSize: '0.77rem', color: '#2C2C2C', fontWeight: 300, lineHeight: 1.5 }}>{n.text}</span>
                  </div>
                ))}
              </div>
            )}
            <div style={{ width: 34, height: 34, borderRadius: '50%', background: 'linear-gradient(135deg,#9B7A2F,#C9A84C)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FFFDF7', fontFamily: F, fontSize: '0.63rem', fontWeight: 500 }}>EO</div>
          </div>
        </div>

        {/* Page content */}
        <div style={{ padding: '2rem 1.5rem', maxWidth: 1100, margin: '0 auto' }}>

          {/* ══ DASHBOARD ══ */}
          {activeTab === 'dashboard' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              {/* Stats */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(180px,1fr))', gap: '1rem' }}>
                {[
                  { icon: Calendar,    label: 'Active Bookings', value: '2',    sub: '2025 season',      color: '#C9A84C' },
                  { icon: DollarSign,  label: 'Revenue YTD',     value: '$124K', sub: '+18% vs last year', color: '#9B7A2F' },
                  { icon: Users,       label: 'New Inquiries',   value: String(bookings.filter(b => b.status === 'inquiry').length), sub: 'Awaiting response', color: '#E8C4C4' },
                  { icon: Star,        label: 'Avg Rating',      value: '4.9',  sub: 'From 12 reviews',  color: '#E2C97E' },
                ].map(stat => (
                  <div key={stat.label} style={{ background: '#FFFDF7', border: '1px solid #E2D9CC', padding: '1.5rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
                      <stat.icon size={18} style={{ color: stat.color }} />
                      <TrendingUp size={11} style={{ color: '#C9A84C', opacity: 0.5 }} />
                    </div>
                    <div style={{ fontFamily: S, color: '#2C2C2C', fontSize: '1.9rem', marginBottom: '0.25rem' }}>{stat.value}</div>
                    <FieldLabel text={stat.label} />
                    <div style={{ fontFamily: F, color: '#B5AFA8', fontSize: '0.72rem', fontWeight: 300 }}>{stat.sub}</div>
                  </div>
                ))}
              </div>

              {/* Pending inquiries */}
              {bookings.filter(b => b.status === 'inquiry').length > 0 && (
                <div style={{ background: '#FFFDF7', border: '1px solid #E2D9CC' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '1.1rem 1.5rem', borderBottom: '1px solid #E2D9CC' }}>
                    <AlertCircle size={14} style={{ color: '#C9A84C' }} />
                    <h3 style={{ fontFamily: S, color: '#2C2C2C', fontSize: '0.95rem', fontWeight: 400 }}>Pending Inquiries</h3>
                    <span style={{ marginLeft: 'auto', background: '#F5E6C8', color: '#9B7A2F', fontFamily: F, fontSize: '0.58rem', padding: '0.2rem 0.6rem' }}>
                      {bookings.filter(b => b.status === 'inquiry').length} new
                    </span>
                  </div>
                  {bookings.filter(b => b.status === 'inquiry').map((b, i) => (
                    <div key={i} style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '1rem', padding: '1rem 1.5rem', borderBottom: '1px solid #F0EBE3' }}>
                      <div style={{ flex: 1, minWidth: 180 }}>
                        <div style={{ fontFamily: F, color: '#2C2C2C', fontSize: '0.87rem', marginBottom: '0.2rem' }}>{b.couple}</div>
                        <div style={{ fontFamily: F, color: '#7A7068', fontSize: '0.77rem', fontWeight: 300 }}>{b.service} · {b.date} · {b.budget}</div>
                      </div>
                      <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <button onClick={() => { setBookings(bks => bks.map(x => x.couple === b.couple ? { ...x, status: 'active', planner: 'Emmanuel' } : x)); showToast('Inquiry approved') }}
                          style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', padding: '0.5rem 1rem', background: 'rgba(100,180,100,0.1)', border: '1px solid rgba(100,180,100,0.3)', color: '#3A7A3A', fontFamily: F, fontSize: '0.65rem', cursor: 'pointer' }}>
                          <Check size={11} /> Approve
                        </button>
                        <button onClick={() => { setBookings(bks => bks.filter(x => x.couple !== b.couple)); showToast('Inquiry declined') }}
                          style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', padding: '0.5rem 1rem', background: 'rgba(200,80,80,0.1)', border: '1px solid rgba(200,80,80,0.2)', color: '#A04040', fontFamily: F, fontSize: '0.65rem', cursor: 'pointer' }}>
                          <X size={11} /> Decline
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Active bookings */}
              <div style={{ background: '#FFFDF7', border: '1px solid #E2D9CC' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1.1rem 1.5rem', borderBottom: '1px solid #E2D9CC' }}>
                  <h3 style={{ fontFamily: S, color: '#2C2C2C', fontSize: '0.95rem', fontWeight: 400 }}>Upcoming Events</h3>
                  <button onClick={() => setActiveTab('bookings')} style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', color: '#C9A84C', background: 'none', border: 'none', fontFamily: F, fontSize: '0.72rem', cursor: 'pointer' }}>
                    View All <ChevronRight size={12} />
                  </button>
                </div>
                {bookings.filter(b => b.status === 'active').map((b, i) => (
                  <div key={i} style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '1rem', padding: '1rem 1.5rem', borderBottom: '1px solid #F0EBE3' }}>
                    <div style={{ width: 36, height: 36, borderRadius: '50%', background: '#F5E6C8', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#9B7A2F', fontFamily: F, fontSize: '0.63rem', flexShrink: 0 }}>
                      {b.couple.split('&')[0].trim().slice(0, 2).toUpperCase()}
                    </div>
                    <div style={{ flex: 1, minWidth: 160 }}>
                      <div style={{ fontFamily: F, color: '#2C2C2C', fontSize: '0.87rem', marginBottom: '0.15rem' }}>{b.couple}</div>
                      <div style={{ fontFamily: F, color: '#7A7068', fontSize: '0.77rem', fontWeight: 300 }}>{b.date} · {b.venue}</div>
                    </div>
                    <span style={{ fontFamily: F, color: '#C9A84C', fontSize: '0.8rem' }}>{b.budget}</span>
                    <Badge status={b.status} />
                  </div>
                ))}
              </div>

              {/* Quick actions */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(160px,1fr))', gap: '1rem' }}>
                {[
                  { label: 'New Booking',    tab: 'bookings',  action: () => { setActiveTab('bookings'); setModal('newBooking') } },
                  { label: 'New Blog Post',  tab: 'blog',      action: () => { setActiveTab('blog');     setModal('newBlog') } },
                  { label: 'Add to Portfolio', tab: 'portfolio', action: () => { setActiveTab('portfolio'); setModal('newPortfolio') } },
                  { label: 'Add Vendor',     tab: 'vendors',   action: () => { setActiveTab('vendors');  setModal('newVendor') } },
                ].map(q => (
                  <button key={q.label} onClick={q.action}
                    style={{ background: '#2C2C2C', color: '#F5E6C8', fontFamily: F, fontSize: '0.68rem', letterSpacing: '0.1em', textTransform: 'uppercase', padding: '1.1rem 1rem', border: 'none', cursor: 'pointer', textAlign: 'center' }}>
                    + {q.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* ══ BOOKINGS ══ */}
          {activeTab === 'bookings' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <BtnPrimary onClick={() => setModal('newBooking')}><Plus size={12} style={{ display: 'inline', marginRight: 6 }} />New Booking</BtnPrimary>
              </div>
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', background: '#FFFDF7', border: '1px solid #E2D9CC' }}>
                  <thead>
                    <tr style={{ background: '#FAF6EF', borderBottom: '1px solid #E2D9CC' }}>
                      {['Couple / Client', 'Date', 'Service', 'Venue', 'Budget', 'Planner', 'Status', ''].map(h => (
                        <th key={h} style={{ textAlign: 'left', padding: '0.9rem 1rem', fontFamily: F, color: '#C9A84C', fontSize: '0.56rem', letterSpacing: '0.22em', textTransform: 'uppercase', fontWeight: 400, whiteSpace: 'nowrap' }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {bookings.map((b, i) => (
                      <tr key={i} style={{ borderBottom: '1px solid #E2D9CC' }}>
                        <td style={{ padding: '0.9rem 1rem', fontFamily: F, color: '#2C2C2C', fontSize: '0.84rem' }}>{b.couple}</td>
                        <td style={{ padding: '0.9rem 1rem', fontFamily: F, color: '#7A7068', fontSize: '0.8rem', fontWeight: 300, whiteSpace: 'nowrap' }}>{b.date}</td>
                        <td style={{ padding: '0.9rem 1rem', fontFamily: F, color: '#7A7068', fontSize: '0.8rem', fontWeight: 300, whiteSpace: 'nowrap' }}>{b.service}</td>
                        <td style={{ padding: '0.9rem 1rem', fontFamily: F, color: '#7A7068', fontSize: '0.8rem', fontWeight: 300 }}>{b.venue}</td>
                        <td style={{ padding: '0.9rem 1rem', fontFamily: F, color: '#C9A84C', fontSize: '0.8rem', whiteSpace: 'nowrap' }}>{b.budget}</td>
                        <td style={{ padding: '0.9rem 1rem', fontFamily: F, color: '#7A7068', fontSize: '0.8rem', fontWeight: 300 }}>{b.planner}</td>
                        <td style={{ padding: '0.9rem 1rem' }}><Badge status={b.status} /></td>
                        <td style={{ padding: '0.9rem 1rem' }}>
                          <div style={{ display: 'flex', gap: '0.4rem' }}>
                            <button onClick={() => { setSelected(b); setModal('viewBooking') }} style={{ padding: '0.4rem 0.7rem', border: '1px solid #E2D9CC', background: 'transparent', color: '#C9A84C', cursor: 'pointer', display: 'flex' }}><Eye size={12} /></button>
                            <button onClick={() => { setBookings(bks => bks.filter((_, j) => j !== i)); showToast('Booking removed') }} style={{ padding: '0.4rem 0.7rem', border: '1px solid #E2D9CC', background: 'transparent', color: '#D97070', cursor: 'pointer', display: 'flex' }}><Trash2 size={12} /></button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ══ CLIENTS ══ */}
          {activeTab === 'clients' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {bookings.map((b, i) => (
                <div key={i} style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '1rem', padding: '1.25rem 1.5rem', background: '#FFFDF7', border: '1px solid #E2D9CC' }}>
                  <div style={{ width: 42, height: 42, borderRadius: '50%', background: 'linear-gradient(135deg,#9B7A2F,#C9A84C)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FFFDF7', fontFamily: F, fontSize: '0.63rem', flexShrink: 0 }}>
                    {b.couple.split('&')[0].trim().slice(0, 2).toUpperCase()}
                  </div>
                  <div style={{ flex: 1, minWidth: 180 }}>
                    <div style={{ fontFamily: F, color: '#2C2C2C', fontSize: '0.87rem', marginBottom: '0.2rem' }}>{b.couple}</div>
                    <div style={{ fontFamily: F, color: '#7A7068', fontSize: '0.75rem', fontWeight: 300 }}>{b.service} · {b.date} · {b.venue}</div>
                  </div>
                  {b.email && <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontFamily: F, color: '#7A7068', fontSize: '0.75rem' }}><Mail size={11} />{b.email}</div>}
                  {b.phone && <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontFamily: F, color: '#7A7068', fontSize: '0.75rem' }}><Phone size={11} />{b.phone}</div>}
                  <span style={{ fontFamily: F, color: '#C9A84C', fontSize: '0.82rem' }}>{b.budget}</span>
                  <Badge status={b.status} />
                  <button onClick={() => { setSelected(b); setModal('viewBooking') }} style={{ padding: '0.45rem 0.9rem', border: '1px solid #E2D9CC', background: 'transparent', color: '#C9A84C', fontFamily: F, fontSize: '0.65rem', cursor: 'pointer' }}>
                    View
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* ══ MESSAGES ══ */}
          {activeTab === 'messages' && (
            <div style={{ display: 'grid', gridTemplateColumns: activeMsg ? '1fr 1fr' : '1fr', gap: '1.25rem' }}>
              <div style={{ background: '#FFFDF7', border: '1px solid #E2D9CC' }}>
                <div style={{ padding: '1.1rem 1.5rem', borderBottom: '1px solid #E2D9CC' }}>
                  <h3 style={{ fontFamily: S, color: '#2C2C2C', fontSize: '0.95rem', fontWeight: 400 }}>
                    Client Messages <span style={{ fontFamily: F, color: '#B5AFA8', fontSize: '0.75rem', fontWeight: 300 }}>({messages.filter(m => !m.read).length} unread)</span>
                  </h3>
                </div>
                {messages.map(msg => (
                  <div key={msg.id} onClick={() => { setActiveMsg(msg); setMessages(ms => ms.map(m => m.id === msg.id ? { ...m, read: true } : m)) }}
                    style={{ padding: '1rem 1.5rem', borderBottom: '1px solid #F0EBE3', cursor: 'pointer', background: activeMsg?.id === msg.id ? 'rgba(201,168,76,0.07)' : msg.read ? 'transparent' : 'rgba(201,168,76,0.04)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.3rem' }}>
                      <span style={{ fontFamily: F, color: '#2C2C2C', fontSize: '0.85rem', fontWeight: msg.read ? 300 : 500 }}>{msg.from}</span>
                      <span style={{ fontFamily: F, color: '#B5AFA8', fontSize: '0.72rem' }}>{msg.time}</span>
                    </div>
                    <div style={{ fontFamily: F, color: '#7A7068', fontSize: '0.78rem', fontWeight: 300 }}>{msg.subject}</div>
                    {!msg.read && <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#C9A84C', marginTop: '0.4rem' }} />}
                  </div>
                ))}
              </div>

              {activeMsg && (
                <div style={{ background: '#FFFDF7', border: '1px solid #E2D9CC', display: 'flex', flexDirection: 'column' }}>
                  <div style={{ padding: '1.1rem 1.5rem', borderBottom: '1px solid #E2D9CC', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <div style={{ fontFamily: S, color: '#2C2C2C', fontSize: '0.95rem', fontWeight: 400 }}>{activeMsg.subject}</div>
                      <div style={{ fontFamily: F, color: '#B5AFA8', fontSize: '0.73rem', marginTop: '0.2rem' }}>From: {activeMsg.from} · {activeMsg.time}</div>
                    </div>
                    <button onClick={() => setActiveMsg(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#7A7068', display: 'flex' }}><X size={15} /></button>
                  </div>
                  <div style={{ padding: '1.5rem', flex: 1 }}>
                    <p style={{ fontFamily: F, color: '#2C2C2C', fontSize: '0.85rem', lineHeight: 1.8, fontWeight: 300, marginBottom: '1.5rem' }}>{activeMsg.body}</p>
                    {replySent.includes(activeMsg.id) ? (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontFamily: F, color: '#3A7A3A', fontSize: '0.8rem' }}><CheckCircle size={14} /> Reply sent</div>
                    ) : (
                      <div style={{ borderTop: '1px solid #E2D9CC', paddingTop: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                        <FieldLabel text="Reply" />
                        <textarea value={replyText} onChange={e => setReplyText(e.target.value)} rows={4} placeholder="Type your reply..."
                          style={{ width: '100%', background: '#FAF6EF', border: '1px solid #E2D9CC', padding: '0.75rem 1rem', fontSize: '0.85rem', color: '#2C2C2C', fontFamily: F, fontWeight: 300, outline: 'none', resize: 'none', boxSizing: 'border-box' }} />
                        <BtnPrimary onClick={() => { if (replyText.trim()) { setReplySent(r => [...r, activeMsg.id]); setReplyText(''); showToast('Reply sent to ' + activeMsg.from) } }}>Send Reply</BtnPrimary>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ══ PORTFOLIO ══ */}
          {activeTab === 'portfolio' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <BtnPrimary onClick={() => setModal('newPortfolio')}><Plus size={12} style={{ display: 'inline', marginRight: 6 }} />Add Portfolio Item</BtnPrimary>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(240px,1fr))', gap: '1.25rem' }}>
                {portfolio.map(item => (
                  <div key={item.id} style={{ background: '#FFFDF7', border: '1px solid #E2D9CC', overflow: 'hidden' }}>
                    <div style={{ position: 'relative', height: 170 }}>
                      <img src={item.image} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      <div style={{ position: 'absolute', top: '0.6rem', right: '0.6rem' }}><Badge status={item.published ? 'published' : 'draft'} /></div>
                    </div>
                    <div style={{ padding: '1rem 1.1rem' }}>
                      <div style={{ fontFamily: S, color: '#2C2C2C', fontSize: '0.95rem', marginBottom: '0.2rem' }}>{item.title}</div>
                      <div style={{ fontFamily: F, color: '#B5AFA8', fontSize: '0.72rem', fontWeight: 300, marginBottom: '1rem' }}>{item.venue} · {item.style}</div>
                      <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <button onClick={() => { setPortfolio(p => p.map(x => x.id === item.id ? { ...x, published: !x.published } : x)); showToast(item.published ? 'Item hidden from portfolio' : 'Item published to portfolio') }}
                          style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.35rem', padding: '0.5rem', border: '1px solid #E2D9CC', background: 'transparent', color: '#7A7068', fontFamily: F, fontSize: '0.65rem', cursor: 'pointer' }}>
                          {item.published ? <><EyeOff size={11} /> Hide</> : <><Eye size={11} /> Publish</>}
                        </button>
                        <button onClick={() => { setPortfolio(p => p.filter(x => x.id !== item.id)); showToast('Portfolio item deleted') }}
                          style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0.5rem 0.75rem', border: '1px solid #E2D9CC', background: 'transparent', color: '#D97070', cursor: 'pointer' }}>
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ══ BLOG ══ */}
          {activeTab === 'blog' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <BtnPrimary onClick={() => setModal('newBlog')}><Plus size={12} style={{ display: 'inline', marginRight: 6 }} />New Post</BtnPrimary>
              </div>
              <div style={{ background: '#FFFDF7', border: '1px solid #E2D9CC' }}>
                {blogs.map((post, i) => (
                  <div key={post.id} style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '1rem', padding: '1.1rem 1.5rem', borderBottom: i < blogs.length - 1 ? '1px solid #E2D9CC' : 'none' }}>
                    <div style={{ flex: 1, minWidth: 200 }}>
                      <div style={{ fontFamily: F, color: '#2C2C2C', fontSize: '0.87rem', marginBottom: '0.25rem' }}>{post.title}</div>
                      <div style={{ fontFamily: F, color: '#B5AFA8', fontSize: '0.73rem', fontWeight: 300 }}>
                        {post.category} · {post.date}{post.status === 'published' ? ` · ${post.views.toLocaleString()} views` : ''}
                      </div>
                    </div>
                    <Badge status={post.status} />
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <button onClick={() => { setBlogs(b => b.map(x => x.id === post.id ? { ...x, status: x.status === 'published' ? 'draft' : 'published' } : x)); showToast(post.status === 'published' ? 'Post unpublished' : 'Post published') }}
                        style={{ padding: '0.45rem 0.9rem', border: '1px solid #E2D9CC', background: 'transparent', color: '#7A7068', fontFamily: F, fontSize: '0.65rem', cursor: 'pointer', whiteSpace: 'nowrap' }}>
                        {post.status === 'published' ? 'Unpublish' : 'Publish'}
                      </button>
                      <button onClick={() => { setBlogs(b => b.filter(x => x.id !== post.id)); showToast('Post deleted') }}
                        style={{ display: 'flex', alignItems: 'center', padding: '0.45rem 0.7rem', border: '1px solid #E2D9CC', background: 'transparent', color: '#D97070', cursor: 'pointer' }}>
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ══ SERVICES ══ */}
          {activeTab === 'services' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', maxWidth: 760 }}>
              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <BtnPrimary onClick={() => setModal('newService')}><Plus size={12} style={{ display: 'inline', marginRight: 6 }} />Add Service</BtnPrimary>
              </div>
              <div style={{ background: '#FFFDF7', border: '1px solid #E2D9CC' }}>
                {services.map((svc, i) => (
                  <div key={svc.id} style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '1rem', padding: '1.1rem 1.5rem', borderBottom: i < services.length - 1 ? '1px solid #E2D9CC' : 'none' }}>
                    <div style={{ flex: 1, minWidth: 200 }}>
                      <div style={{ fontFamily: F, color: '#2C2C2C', fontSize: '0.87rem', marginBottom: '0.2rem' }}>{svc.title}</div>
                      <div style={{ fontFamily: F, color: '#7A7068', fontSize: '0.77rem', fontWeight: 300, marginBottom: '0.2rem' }}>{svc.description}</div>
                      <div style={{ fontFamily: F, color: '#C9A84C', fontSize: '0.77rem' }}>{svc.price}</div>
                    </div>
                    <Badge status={svc.status === 'active' ? 'active' : 'disabled'} />
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <button onClick={() => { setServices(s => s.map(x => x.id === svc.id ? { ...x, status: x.status === 'active' ? 'disabled' : 'active' } : x)); showToast(svc.status === 'active' ? 'Service disabled' : 'Service enabled') }}
                        style={{ padding: '0.45rem 0.9rem', border: '1px solid #E2D9CC', background: 'transparent', color: '#7A7068', fontFamily: F, fontSize: '0.65rem', cursor: 'pointer' }}>
                        {svc.status === 'active' ? 'Disable' : 'Enable'}
                      </button>
                      <button onClick={() => { setServices(s => s.filter(x => x.id !== svc.id)); showToast('Service deleted') }}
                        style={{ display: 'flex', alignItems: 'center', padding: '0.45rem 0.7rem', border: '1px solid #E2D9CC', background: 'transparent', color: '#D97070', cursor: 'pointer' }}>
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ══ VENDORS ══ */}
          {activeTab === 'vendors' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <BtnPrimary onClick={() => setModal('newVendor')}><Plus size={12} style={{ display: 'inline', marginRight: 6 }} />Add Vendor</BtnPrimary>
              </div>
              {vendors.map((v, i) => (
                <div key={i} style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '1rem', padding: '1.25rem 1.5rem', background: '#FFFDF7', border: '1px solid #E2D9CC' }}>
                  <div style={{ width: 40, height: 40, borderRadius: '50%', background: '#F5E6C8', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#9B7A2F', fontFamily: F, fontSize: '0.67rem', fontWeight: 500, flexShrink: 0 }}>
                    {v.name.split(' ').map(w => w[0]).join('').slice(0, 2)}
                  </div>
                  <div style={{ flex: 1, minWidth: 180 }}>
                    <div style={{ fontFamily: F, color: '#2C2C2C', fontSize: '0.87rem', marginBottom: '0.15rem' }}>{v.name}</div>
                    <div style={{ fontFamily: F, color: '#7A7068', fontSize: '0.75rem', fontWeight: 300 }}>{v.category} · {v.contact}</div>
                  </div>
                  <div style={{ display: 'flex', gap: 2 }}>
                    {Array.from({ length: 5 }).map((_, s) => <Star key={s} size={11} fill={s < v.rating ? '#C9A84C' : 'transparent'} color="#C9A84C" />)}
                  </div>
                  <span style={{ fontFamily: F, color: '#B5AFA8', fontSize: '0.75rem' }}>{v.weddings} events</span>
                  <Badge status={v.status} />
                  <button onClick={() => { setVendors(vs => vs.filter((_, j) => j !== i)); showToast('Vendor removed') }}
                    style={{ display: 'flex', alignItems: 'center', padding: '0.45rem 0.7rem', border: '1px solid #E2D9CC', background: 'transparent', color: '#D97070', cursor: 'pointer' }}>
                    <Trash2 size={13} />
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* ══ ANALYTICS ══ */}
          {activeTab === 'analytics' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: '1rem' }}>
                {[
                  { label: '2025 Revenue Target', current: 124000, target: 200000, fmt: (v: number) => `$${(v/1000).toFixed(0)}K` },
                  { label: 'Bookings Target',     current: bookings.length, target: 12, fmt: (v: number) => `${v}` },
                  { label: 'Blog Views',          current: blogs.reduce((s, b) => s + b.views, 0), target: 5000, fmt: (v: number) => v.toLocaleString() },
                ].map(item => (
                  <div key={item.label} style={{ background: '#FFFDF7', border: '1px solid #E2D9CC', padding: '1.5rem' }}>
                    <FieldLabel text={item.label} />
                    <div style={{ fontFamily: S, color: '#2C2C2C', fontSize: '1.8rem', marginBottom: '0.5rem' }}>
                      {item.fmt(item.current)}<span style={{ fontFamily: F, color: '#B5AFA8', fontSize: '0.9rem', fontWeight: 300 }}> / {item.fmt(item.target)}</span>
                    </div>
                    <div style={{ height: 5, background: '#E2D9CC', borderRadius: 3, marginBottom: '0.5rem' }}>
                      <div style={{ height: '100%', width: `${Math.min(Math.round((item.current / item.target) * 100), 100)}%`, background: 'linear-gradient(to right,#9B7A2F,#C9A84C)', borderRadius: 3 }} />
                    </div>
                    <div style={{ fontFamily: F, color: '#B5AFA8', fontSize: '0.72rem' }}>{Math.min(Math.round((item.current / item.target) * 100), 100)}% of target</div>
                  </div>
                ))}
              </div>

              <div style={{ background: '#FFFDF7', border: '1px solid #E2D9CC' }}>
                <div style={{ padding: '1.1rem 1.5rem', borderBottom: '1px solid #E2D9CC' }}>
                  <h3 style={{ fontFamily: S, color: '#2C2C2C', fontSize: '0.95rem', fontWeight: 400 }}>Bookings by Service</h3>
                </div>
                {[
                  { label: 'Full Event Planning',  count: bookings.filter(b => b.service.includes('Full')).length,        color: '#C9A84C' },
                  { label: 'Partial Planning',      count: bookings.filter(b => b.service.includes('Partial')).length,      color: '#E2C97E' },
                  { label: 'Day-of Coordination',   count: bookings.filter(b => b.service.includes('Day')).length,          color: '#E8C4C4' },
                  { label: 'Rental Service',        count: bookings.filter(b => b.service.includes('Rental')).length,       color: '#9B7A2F' },
                  { label: 'Destination Events',    count: bookings.filter(b => b.service.includes('Destination')).length,  color: '#D4A5A5' },
                ].map(item => (
                  <div key={item.label} style={{ padding: '1rem 1.5rem', borderBottom: '1px solid #F0EBE3' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                      <span style={{ fontFamily: F, color: '#2C2C2C', fontSize: '0.82rem', fontWeight: 300 }}>{item.label}</span>
                      <span style={{ fontFamily: F, color: '#C9A84C', fontSize: '0.82rem' }}>{item.count}</span>
                    </div>
                    <div style={{ height: 4, background: '#E2D9CC', borderRadius: 3 }}>
                      <div style={{ height: '100%', width: `${(item.count / bookings.length) * 100}%`, background: item.color, borderRadius: 3, transition: 'width 0.6s ease' }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ══ SETTINGS ══ */}
          {activeTab === 'settings' && (
            <div style={{ maxWidth: 680, display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div style={{ background: '#FFFDF7', border: '1px solid #E2D9CC' }}>
                <div style={{ padding: '1.1rem 1.5rem', borderBottom: '1px solid #E2D9CC' }}><h3 style={{ fontFamily: S, color: '#2C2C2C', fontSize: '0.95rem', fontWeight: 400 }}>Business Information</h3></div>
                <div style={{ padding: '1.75rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  <Input label="Business Name"  value={settings.businessName} onChange={v => setSettings(s => ({ ...s, businessName: v }))} />
                  <Input label="Owner Names"    value={settings.owners}       onChange={v => setSettings(s => ({ ...s, owners: v }))} />
                  <Input label="Email"          value={settings.email}        onChange={v => setSettings(s => ({ ...s, email: v }))} type="email" />
                  <Input label="Phone"          value={settings.phone}        onChange={v => setSettings(s => ({ ...s, phone: v }))} />
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <Input label="Instagram"    value={settings.instagram}    onChange={v => setSettings(s => ({ ...s, instagram: v }))} />
                    <Input label="Website"      value={settings.website}      onChange={v => setSettings(s => ({ ...s, website: v }))} />
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'flex-end', paddingTop: '0.5rem' }}>
                    <BtnPrimary onClick={() => showToast('Business information saved')}><Save size={12} style={{ display: 'inline', marginRight: 6 }} />Save Changes</BtnPrimary>
                  </div>
                </div>
              </div>
              <div style={{ background: '#FFFDF7', border: '1px solid #E2D9CC' }}>
                <div style={{ padding: '1.1rem 1.5rem', borderBottom: '1px solid #E2D9CC' }}><h3 style={{ fontFamily: S, color: '#2C2C2C', fontSize: '0.95rem', fontWeight: 400 }}>Studio Address</h3></div>
                <div style={{ padding: '1.75rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  <Input label="Street"       value={settings.street} onChange={v => setSettings(s => ({ ...s, street: v }))} />
                  <Input label="City / State" value={settings.city}   onChange={v => setSettings(s => ({ ...s, city: v }))} />
                  <div style={{ display: 'flex', justifyContent: 'flex-end', paddingTop: '0.5rem' }}>
                    <BtnPrimary onClick={() => showToast('Address saved')}><Save size={12} style={{ display: 'inline', marginRight: 6 }} />Save Address</BtnPrimary>
                  </div>
                </div>
              </div>
              <div style={{ background: '#FFFDF7', border: '1px solid #E2D9CC' }}>
                <div style={{ padding: '1.1rem 1.5rem', borderBottom: '1px solid #E2D9CC' }}><h3 style={{ fontFamily: S, color: '#2C2C2C', fontSize: '0.95rem', fontWeight: 400 }}>Change Password</h3></div>
                <div style={{ padding: '1.75rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  <Input label="Current Password" value="" onChange={() => {}} type="password" />
                  <Input label="New Password"     value="" onChange={() => {}} type="password" />
                  <Input label="Confirm Password" value="" onChange={() => {}} type="password" />
                  <div style={{ display: 'flex', justifyContent: 'flex-end', paddingTop: '0.5rem' }}>
                    <BtnPrimary onClick={() => showToast('Password updated')}><Save size={12} style={{ display: 'inline', marginRight: 6 }} />Update Password</BtnPrimary>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>
      </main>

      {/* ══ MODALS ══ */}

      {/* New Booking */}
      {modal === 'newBooking' && (
        <Modal title="New Booking" onClose={() => setModal(null)}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
            <Input label="Couple / Client Name" value={nb.couple} onChange={v => setNb(p => ({ ...p, couple: v }))} placeholder="e.g. Sophia & James Hartley" />
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <Input label="Email"          value={nb.email}  onChange={v => setNb(p => ({ ...p, email: v }))}  type="email" />
              <Input label="Phone"          value={nb.phone}  onChange={v => setNb(p => ({ ...p, phone: v }))}  />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <Input label="Event Date"     value={nb.date}   onChange={v => setNb(p => ({ ...p, date: v }))}   placeholder="e.g. Oct 4, 2025" />
              <Input label="Budget"         value={nb.budget} onChange={v => setNb(p => ({ ...p, budget: v }))} placeholder="e.g. $50,000" />
            </div>
            <SelectField label="Service" value={nb.service} onChange={v => setNb(p => ({ ...p, service: v }))} options={['Full Planning', 'Partial Planning', 'Day-of Coordination', 'Destination Event', 'Rental Service', 'Cleaning Service']} />
            <SelectField label="Assign Planner" value={nb.planner} onChange={v => setNb(p => ({ ...p, planner: v }))} options={['Emmanuel', 'Melisa', 'Unassigned']} />
            <Input label="Venue"  value={nb.venue} onChange={v => setNb(p => ({ ...p, venue: v }))} placeholder="Venue name or TBD" />
            <Textarea label="Notes" value={nb.notes} onChange={v => setNb(p => ({ ...p, notes: v }))} rows={3} />
            <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end', paddingTop: '0.5rem' }}>
              <BtnGhost onClick={() => setModal(null)}>Cancel</BtnGhost>
              <BtnPrimary onClick={() => {
                if (!nb.couple) return
                setBookings(b => [...b, { ...nb, status: 'active' }])
                setModal(null)
                setNb({ couple: '', email: '', phone: '', date: '', service: 'Full Planning', venue: '', budget: '', planner: 'Emmanuel', notes: '' })
                showToast('Booking created for ' + nb.couple)
              }}>Create Booking</BtnPrimary>
            </div>
          </div>
        </Modal>
      )}

      {/* View Booking */}
      {modal === 'viewBooking' && selected && (
        <Modal title={selected.couple} onClose={() => { setModal(null); setSelected(null) }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {[
              { label: 'Service',  value: selected.service },
              { label: 'Date',     value: selected.date },
              { label: 'Venue',    value: selected.venue },
              { label: 'Budget',   value: selected.budget },
              { label: 'Planner',  value: selected.planner },
              { label: 'Email',    value: selected.email || '—' },
              { label: 'Phone',    value: selected.phone || '—' },
            ].map(r => (
              <div key={r.label} style={{ display: 'flex', borderBottom: '1px solid #F0EBE3', paddingBottom: '0.75rem' }}>
                <FieldLabel text={r.label} />
                <span style={{ fontFamily: F, color: '#2C2C2C', fontSize: '0.85rem', marginLeft: 'auto' }}>{r.value}</span>
              </div>
            ))}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', paddingTop: '0.25rem' }}>
              <FieldLabel text="Status" />
              <span style={{ marginLeft: 'auto' }}><Badge status={selected.status} /></span>
            </div>
            <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end', paddingTop: '0.75rem' }}>
              <BtnGhost onClick={() => { setModal(null); setSelected(null) }}>Close</BtnGhost>
              <BtnPrimary onClick={() => { setBookings(bks => bks.map(b => b.couple === selected.couple ? { ...b, status: 'active', planner: 'Emmanuel' } : b)); setModal(null); showToast('Booking confirmed') }}>Mark Active</BtnPrimary>
            </div>
          </div>
        </Modal>
      )}

      {/* New Blog Post */}
      {modal === 'newBlog' && (
        <Modal title="New Blog Post" onClose={() => setModal(null)}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
            <Input label="Post Title" value={bf.title} onChange={v => setBf(p => ({ ...p, title: v }))} placeholder="Enter post title..." />
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <SelectField label="Category" value={bf.category} onChange={v => setBf(p => ({ ...p, category: v }))} options={['Planning Tips', 'Rentals & Decor', 'Cleaning & Logistics', 'Venue Guides', 'Design Trends', 'Destination']} />
              <SelectField label="Status"   value={bf.status}   onChange={v => setBf(p => ({ ...p, status: v }))}   options={['draft', 'published']} />
            </div>
            <Textarea label="Excerpt"      value={bf.excerpt} onChange={v => setBf(p => ({ ...p, excerpt: v }))} rows={2} />
            <Textarea label="Body Content" value={bf.body}    onChange={v => setBf(p => ({ ...p, body: v }))}    rows={5} />
            <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end', paddingTop: '0.5rem' }}>
              <BtnGhost onClick={() => setModal(null)}>Cancel</BtnGhost>
              <BtnPrimary onClick={() => {
                if (!bf.title) return
                const now = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
                setBlogs(b => [...b, { id: Date.now(), title: bf.title, category: bf.category, status: bf.status, date: now, views: 0 }])
                setModal(null)
                setBf({ title: '', category: 'Planning Tips', status: 'draft', excerpt: '', body: '' })
                showToast('Blog post created')
              }}>Save Post</BtnPrimary>
            </div>
          </div>
        </Modal>
      )}

      {/* New Portfolio Item */}
      {modal === 'newPortfolio' && (
        <Modal title="Add Portfolio Item" onClose={() => setModal(null)}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
            <Input label="Couple Name"  value={pf.title} onChange={v => setPf(p => ({ ...p, title: v }))} placeholder="e.g. Claire & William" />
            <Input label="Venue"        value={pf.venue} onChange={v => setPf(p => ({ ...p, venue: v }))} />
            <Input label="Style / Theme" value={pf.style} onChange={v => setPf(p => ({ ...p, style: v }))} placeholder="e.g. Rustic Luxe" />
            <Input label="Image URL"    value={pf.image} onChange={v => setPf(p => ({ ...p, image: v }))} placeholder="https://..." />
            {pf.image && <img src={pf.image} alt="preview" style={{ width: '100%', height: 180, objectFit: 'cover' }} />}
            <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end', paddingTop: '0.5rem' }}>
              <BtnGhost onClick={() => setModal(null)}>Cancel</BtnGhost>
              <BtnPrimary onClick={() => {
                if (!pf.title) return
                setPortfolio(p => [...p, { id: Date.now(), ...pf, published: false }])
                setModal(null)
                setPf({ title: '', venue: '', style: '', image: '' })
                showToast('Portfolio item added (draft — publish to make visible)')
              }}>Add Item</BtnPrimary>
            </div>
          </div>
        </Modal>
      )}

      {/* New Service */}
      {modal === 'newService' && (
        <Modal title="Add New Service" onClose={() => setModal(null)}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
            <Input label="Service Title"   value={sf.title}       onChange={v => setSf(p => ({ ...p, title: v }))}       placeholder="e.g. Corporate Event Planning" />
            <Input label="Starting Price"  value={sf.price}       onChange={v => setSf(p => ({ ...p, price: v }))}       placeholder="e.g. From $1,500 or Custom Quote" />
            <Textarea label="Description"  value={sf.description} onChange={v => setSf(p => ({ ...p, description: v }))} rows={3} />
            <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end', paddingTop: '0.5rem' }}>
              <BtnGhost onClick={() => setModal(null)}>Cancel</BtnGhost>
              <BtnPrimary onClick={() => {
                if (!sf.title) return
                setServices(s => [...s, { id: Date.now(), ...sf, status: 'active' }])
                setModal(null)
                setSf({ title: '', price: '', description: '' })
                showToast('Service added')
              }}>Add Service</BtnPrimary>
            </div>
          </div>
        </Modal>
      )}

      {/* New Vendor */}
      {modal === 'newVendor' && (
        <Modal title="Add Vendor" onClose={() => setModal(null)}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
            <Input label="Vendor Name"    value={vf.name}    onChange={v => setVf(p => ({ ...p, name: v }))}    placeholder="e.g. Bloom & Co. Florals" />
            <SelectField label="Category" value={vf.category} onChange={v => setVf(p => ({ ...p, category: v }))} options={['Florals', 'Photography', 'Catering', 'Entertainment', 'Lighting', 'Rentals', 'Cleaning', 'Transport', 'Other']} />
            <Input label="Contact Email"  value={vf.contact}  onChange={v => setVf(p => ({ ...p, contact: v }))}  type="email" />
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <SelectField label="Rating (1–5)" value={vf.rating} onChange={v => setVf(p => ({ ...p, rating: v }))} options={['5', '4', '3', '2', '1']} />
              <Input label="Events Worked" value={vf.weddings} onChange={v => setVf(p => ({ ...p, weddings: v }))} placeholder="0" />
            </div>
            <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end', paddingTop: '0.5rem' }}>
              <BtnGhost onClick={() => setModal(null)}>Cancel</BtnGhost>
              <BtnPrimary onClick={() => {
                if (!vf.name) return
                setVendors(vs => [...vs, { name: vf.name, category: vf.category, contact: vf.contact, rating: Number(vf.rating), weddings: Number(vf.weddings), status: 'approved' }])
                setModal(null)
                setVf({ name: '', category: 'Florals', contact: '', rating: '5', weddings: '0' })
                showToast('Vendor added')
              }}>Add Vendor</BtnPrimary>
            </div>
          </div>
        </Modal>
      )}

      {/* Toast */}
      {toast && <Toast msg={toast} />}
    </div>
  )
}
