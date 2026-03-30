'use client'

import { useState, useRef } from 'react'
import Link from 'next/link'
import {
  LayoutDashboard, CheckSquare, DollarSign, Calendar,
  FileText, MessageCircle, LogOut, ChevronRight, Bell,
  Menu, X, CheckCircle2, Clock, Circle, Download, Upload,
  Eye, EyeOff, ArrowRight, Send, Paperclip, AlertCircle,
  User, Lock, Mail, Phone, Heart, Star
} from 'lucide-react'

// ─── DATA ────────────────────────────────────────────────────────────────────

const navItems = [
  { icon: LayoutDashboard, label: 'Overview',    id: 'overview'   },
  { icon: CheckSquare,     label: 'My Progress', id: 'progress'   },
  { icon: DollarSign,      label: 'Budget',      id: 'budget'     },
  { icon: Calendar,        label: 'Timeline',    id: 'timeline'   },
  { icon: FileText,        label: 'Documents',   id: 'documents'  },
  { icon: MessageCircle,   label: 'Messages',    id: 'messages'   },
]

const progressItems = [
  { label: 'Contract Signed',        done: true  },
  { label: 'Retainer Paid',          done: true  },
  { label: 'Venue Confirmed',        done: true  },
  { label: 'Catering Booked',        done: true  },
  { label: 'Photography Booked',     done: true  },
  { label: 'Floral Design Approved', done: false, active: true },
  { label: 'Invitations Sent',       done: false },
  { label: 'Guest RSVP Deadline',    done: false },
  { label: 'Final Payments Due',     done: false },
  { label: 'Event Day',              done: false },
]

const budgetItems = [
  { category: 'Venue',           budgeted: 18000, spent: 18000, color: '#C9A84C' },
  { category: 'Catering',        budgeted: 22000, spent: 19500, color: '#E8C4C4' },
  { category: 'Photography',     budgeted: 6000,  spent: 6000,  color: '#9B7A2F' },
  { category: 'Florals & Decor', budgeted: 12000, spent: 4200,  color: '#E2C97E' },
  { category: 'Music / DJ',      budgeted: 4000,  spent: 0,     color: '#D4A5A5' },
  { category: 'Hair & Makeup',   budgeted: 2500,  spent: 800,   color: '#B5AFA8' },
]

const timelineEvents = [
  { date: 'Jan 2025', label: 'Signed with Emmeli Experience',  done: true  },
  { date: 'Feb 2025', label: 'Vision Meeting & Mood Board',    done: true  },
  { date: 'Mar 2025', label: 'Venue Tour & Confirmation',      done: true  },
  { date: 'Apr 2025', label: 'Vendor Team Finalized',          done: true  },
  { date: 'May 2025', label: 'Design Review & Approval',       done: false, active: true },
  { date: 'Jun 2025', label: 'Invitations Mail Out',           done: false },
  { date: 'Aug 2025', label: 'RSVP Deadline',                  done: false },
  { date: 'Sep 2025', label: 'Final Walkthrough & Tasting',    done: false },
  { date: 'Oct 4, 2025', label: 'Your Event Day',              done: false, special: true },
]

const initialMessages = [
  {
    id: 1,
    from: 'Melisa Ogedegbe',
    role: 'Lead Planner',
    time: '2h ago',
    avatar: 'MO',
    preview: 'Hi! Just confirming the floral design meeting for Thursday at 2pm. So excited to show you the final mockups!',
    unread: true,
    replies: [] as string[],
  },
  {
    id: 2,
    from: 'Emmanuel Ogedegbe',
    role: 'Creative Director',
    time: '1d ago',
    avatar: 'EO',
    preview: 'The mood board updates are ready for your review. Three new tablescape concepts you are going to love.',
    unread: false,
    replies: [] as string[],
  },
  {
    id: 3,
    from: 'Team Coordinator',
    role: 'Logistics',
    time: '2d ago',
    avatar: 'TC',
    preview: 'All vendor confirmations are in for October. Timeline is set. Everything is perfectly on track!',
    unread: false,
    replies: [] as string[],
  },
]

const initialDocuments = [
  { name: 'Service Contract.pdf',        date: 'Jan 12, 2025', size: '240 KB',  type: 'pdf' },
  { name: 'Venue Contract.pdf',          date: 'Mar 3, 2025',  size: '1.2 MB',  type: 'pdf' },
  { name: 'Design Mood Board v2.pdf',    date: 'Apr 18, 2025', size: '8.4 MB',  type: 'pdf' },
  { name: 'Vendor Contact Sheet.xlsx',   date: 'Apr 20, 2025', size: '44 KB',   type: 'xls' },
  { name: 'Event Day Timeline Draft.pdf',date: 'May 1, 2025',  size: '320 KB',  type: 'pdf' },
]

const notifications = [
  { id: 1, text: 'Floral design meeting confirmed for Thursday 2pm', time: '2h ago', read: false },
  { id: 2, text: 'Mood board v3 is ready for your review', time: '1d ago', read: false },
  { id: 3, text: 'Final venue payment due in 14 days', time: '3d ago', read: true },
]

// ─── DEMO CREDENTIALS ────────────────────────────────────────────────────────
const DEMO_EMAIL    = 'client@emmeliexperience.com'
const DEMO_PASSWORD = 'emmeli2025'

// ─── COMPONENT ───────────────────────────────────────────────────────────────
export default function DashboardPage() {
  // Auth state
  const [authMode, setAuthMode]       = useState<'login' | 'signup'>('login')
  const [loggedIn, setLoggedIn]       = useState(false)
  const [authError, setAuthError]     = useState('')
  const [authLoading, setAuthLoading] = useState(false)
  const [showPass, setShowPass]       = useState(false)

  // Login fields
  const [email, setEmail]       = useState('')
  const [password, setPassword] = useState('')

  // Signup fields
  const [signupName,  setSignupName]  = useState('')
  const [signupEmail, setSignupEmail] = useState('')
  const [signupPhone, setSignupPhone] = useState('')
  const [signupPass,  setSignupPass]  = useState('')
  const [signupEvent, setSignupEvent] = useState('')

  // Dashboard state
  const [activeTab,    setActiveTab]    = useState('overview')
  const [sidebarOpen,  setSidebarOpen]  = useState(false)
  const [showNotifs,   setShowNotifs]   = useState(false)
  const [notifs,       setNotifs]       = useState(notifications)
  const [messages,     setMessages]     = useState(initialMessages)
  const [replyTexts,   setReplyTexts]   = useState<Record<number, string>>({})
  const [documents,    setDocuments]    = useState(initialDocuments)
  const [uploadMsg,    setUploadMsg]    = useState('')
  const [sentReplies,  setSentReplies]  = useState<Record<number, boolean>>({})
  const fileInputRef = useRef<HTMLInputElement>(null)

  const doneCount    = progressItems.filter(p => p.done).length
  const progressPct  = Math.round((doneCount / progressItems.length) * 100)
  const totalBudgeted = budgetItems.reduce((s, i) => s + i.budgeted, 0)
  const totalSpent    = budgetItems.reduce((s, i) => s + i.spent, 0)
  const unreadCount   = notifs.filter(n => !n.read).length

  // ── AUTH HANDLERS ──────────────────────────────────────────────────────────
  function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setAuthError('')
    setAuthLoading(true)
    setTimeout(() => {
      if (email === DEMO_EMAIL && password === DEMO_PASSWORD) {
        setLoggedIn(true)
      } else {
        setAuthError('Incorrect email or password. Try: client@emmeliexperience.com / emmeli2025')
      }
      setAuthLoading(false)
    }, 1200)
  }

  function handleSignup(e: React.FormEvent) {
    e.preventDefault()
    setAuthError('')
    if (!signupName || !signupEmail || !signupPass) {
      setAuthError('Please fill in all required fields.')
      return
    }
    setAuthLoading(true)
    setTimeout(() => {
      setLoggedIn(true)
      setAuthLoading(false)
    }, 1400)
  }

  // ── DASHBOARD HANDLERS ────────────────────────────────────────────────────
  function handleSendReply(msgId: number) {
    const text = replyTexts[msgId]?.trim()
    if (!text) return
    setMessages(prev => prev.map(m =>
      m.id === msgId
        ? { ...m, unread: false, replies: [...m.replies, text] }
        : m
    ))
    setReplyTexts(prev => ({ ...prev, [msgId]: '' }))
    setSentReplies(prev => ({ ...prev, [msgId]: true }))
    setTimeout(() => setSentReplies(prev => ({ ...prev, [msgId]: false })), 3000)
  }

  function handleMarkAllRead() {
    setNotifs(prev => prev.map(n => ({ ...n, read: true })))
  }

  function handleDownload(docName: string) {
    const el = document.createElement('a')
    el.href = '#'
    alert(`Downloading "${docName}" — in a live environment this would trigger a real file download.`)
  }

  function handleUploadClick() {
    fileInputRef.current?.click()
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setUploadMsg(`"${file.name}" uploaded successfully.`)
    setDocuments(prev => [
      { name: file.name, date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }), size: `${(file.size / 1024).toFixed(0)} KB`, type: file.name.endsWith('.pdf') ? 'pdf' : 'xls' },
      ...prev,
    ])
    setTimeout(() => setUploadMsg(''), 4000)
    e.target.value = ''
  }

  // ── SIDEBAR ────────────────────────────────────────────────────────────────
  const SidebarContent = () => (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* Brand */}
      <div style={{ padding: '2rem 1.5rem', borderBottom: '1px solid rgba(201,168,76,0.2)' }}>
        <Link href="/" style={{ textDecoration: 'none' }}>
          <div style={{ fontFamily: 'var(--font-serif)', color: '#F5E6C8', fontSize: '1.15rem', letterSpacing: '0.04em', marginBottom: '0.2rem' }}>Emmeli Experience</div>
          <div style={{ fontFamily: 'var(--font-sans)', color: '#C9A84C', fontSize: '0.5rem', letterSpacing: '0.3em', textTransform: 'uppercase' }}>Client Portal</div>
        </Link>
      </div>

      {/* Client info */}
      <div style={{ padding: '1.25rem 1.5rem', borderBottom: '1px solid rgba(201,168,76,0.15)', display: 'flex', alignItems: 'center', gap: '0.875rem' }}>
        <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'linear-gradient(135deg, #9B7A2F, #C9A84C)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FFFDF7', fontFamily: 'var(--font-sans)', fontSize: '0.7rem', flexShrink: 0 }}>S&amp;J</div>
        <div>
          <div style={{ fontFamily: 'var(--font-sans)', color: '#F5E6C8', fontSize: '0.83rem' }}>Sophia &amp; James</div>
          <div style={{ fontFamily: 'var(--font-sans)', color: '#C9A84C', fontSize: '0.58rem', letterSpacing: '0.1em' }}>Oct 4, 2025</div>
        </div>
      </div>

      {/* Nav */}
      <nav style={{ padding: '1rem 0.75rem', flex: 1, overflowY: 'auto' }}>
        {navItems.map(item => (
          <button
            key={item.id}
            onClick={() => { setActiveTab(item.id); setSidebarOpen(false) }}
            style={{
              width: '100%', display: 'flex', alignItems: 'center', gap: '0.75rem',
              padding: '0.75rem 1rem', marginBottom: '0.15rem',
              background: activeTab === item.id ? 'rgba(201,168,76,0.12)' : 'transparent',
              borderLeft: `2px solid ${activeTab === item.id ? '#C9A84C' : 'transparent'}`,
              color: activeTab === item.id ? '#C9A84C' : '#7A7068',
              border: 'none', borderLeftWidth: 2, borderLeftStyle: 'solid',
              cursor: 'pointer', textAlign: 'left', transition: 'all 0.2s',
            }}
          >
            <item.icon size={15} />
            <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.78rem', fontWeight: 300, letterSpacing: '0.05em' }}>{item.label}</span>
          </button>
        ))}
      </nav>

      {/* Sign out */}
      <div style={{ padding: '1.25rem 1.5rem', borderTop: '1px solid rgba(201,168,76,0.1)' }}>
        <button
          onClick={() => setLoggedIn(false)}
          style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: '#5C5248', fontFamily: 'var(--font-sans)', fontSize: '0.75rem', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
        >
          <LogOut size={13} /> Sign Out
        </button>
      </div>
    </div>
  )

  // ═══════════════════════════════════════════════════════════════════════════
  // AUTH SCREEN
  // ═══════════════════════════════════════════════════════════════════════════
  if (!loggedIn) {
    return (
      <div style={{ minHeight: '100vh', background: '#1C1610', display: 'flex' }}>
        {/* Left panel — decorative */}
        <div style={{ flex: 1, display: 'none', position: 'relative', overflow: 'hidden' }} className="lg:block">
          <img
            src="https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=1200&h=1600&fit=crop"
            alt="Emmeli Experience wedding planning"
            style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.55 }}
          />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, transparent, #1C1610)' }} />
          <div style={{ position: 'absolute', bottom: '3rem', left: '2.5rem', right: '2.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
              <div style={{ width: 32, height: 1, background: '#C9A84C' }} />
              <span style={{ fontFamily: 'var(--font-sans)', color: '#C9A84C', fontSize: '0.55rem', letterSpacing: '0.35em', textTransform: 'uppercase' }}>Client Portal</span>
            </div>
            <h2 style={{ fontFamily: 'var(--font-serif)', color: '#F5E6C8', fontSize: 'clamp(1.8rem, 3vw, 2.6rem)', lineHeight: 1.15, fontWeight: 400, marginBottom: '1rem' }}>
              Your celebration,<br /><em style={{ color: '#C9A84C' }}>beautifully managed.</em>
            </h2>
            <p style={{ fontFamily: 'var(--font-sans)', color: '#B5AFA8', fontSize: '0.85rem', lineHeight: 1.8, fontWeight: 300 }}>
              Track progress, view your budget, access documents, and stay connected with the Emmeli Experience team — all in one place.
            </p>
            {[
              { icon: CheckCircle2, text: 'Real-time planning progress tracker' },
              { icon: DollarSign,   text: 'Live budget & payment overview'      },
              { icon: MessageCircle,text: 'Direct messaging with your planner'  },
              { icon: FileText,     text: 'Secure document sharing & storage'   },
            ].map((f, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginTop: '0.875rem' }}>
                <f.icon size={14} style={{ color: '#C9A84C', flexShrink: 0 }} />
                <span style={{ fontFamily: 'var(--font-sans)', color: '#B5AFA8', fontSize: '0.8rem', fontWeight: 300 }}>{f.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right panel — form */}
        <div style={{ width: '100%', maxWidth: 520, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '3rem 2.5rem' }} className="lg:max-w-[520px]">
          {/* Logo */}
          <Link href="/" style={{ textDecoration: 'none', display: 'inline-block', marginBottom: '3rem' }}>
            <div style={{ fontFamily: 'var(--font-serif)', color: '#F5E6C8', fontSize: '1.4rem', letterSpacing: '0.04em' }}>Emmeli Experience</div>
            <div style={{ fontFamily: 'var(--font-sans)', color: '#C9A84C', fontSize: '0.5rem', letterSpacing: '0.3em', textTransform: 'uppercase', marginTop: '0.2rem' }}>Client Portal</div>
          </Link>

          {/* Tab toggle */}
          <div style={{ display: 'flex', background: 'rgba(255,253,247,0.06)', padding: '0.25rem', marginBottom: '2.5rem', borderRadius: 2 }}>
            {(['login', 'signup'] as const).map(mode => (
              <button
                key={mode}
                onClick={() => { setAuthMode(mode); setAuthError('') }}
                style={{
                  flex: 1, padding: '0.7rem', fontFamily: 'var(--font-sans)', fontSize: '0.63rem',
                  letterSpacing: '0.2em', textTransform: 'uppercase', border: 'none', cursor: 'pointer',
                  background: authMode === mode ? '#C9A84C' : 'transparent',
                  color: authMode === mode ? '#1C1610' : '#7A7068',
                  fontWeight: authMode === mode ? 500 : 300,
                  transition: 'all 0.25s',
                }}
              >
                {mode === 'login' ? 'Sign In' : 'Request Access'}
              </button>
            ))}
          </div>

          {/* Error */}
          {authError && (
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem', background: 'rgba(200,80,60,0.12)', border: '1px solid rgba(200,80,60,0.3)', padding: '0.85rem 1rem', marginBottom: '1.5rem' }}>
              <AlertCircle size={14} style={{ color: '#E07060', flexShrink: 0, marginTop: 2 }} />
              <span style={{ fontFamily: 'var(--font-sans)', color: '#E07060', fontSize: '0.8rem', fontWeight: 300, lineHeight: 1.6 }}>{authError}</span>
            </div>
          )}

          {/* ── LOGIN FORM ── */}
          {authMode === 'login' && (
            <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div>
                <label style={{ display: 'block', fontFamily: 'var(--font-sans)', color: '#B5AFA8', fontSize: '0.6rem', letterSpacing: '0.25em', textTransform: 'uppercase', marginBottom: '0.6rem' }}>Email Address</label>
                <div style={{ position: 'relative' }}>
                  <Mail size={14} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#5C5248' }} />
                  <input
                    type="email" value={email} onChange={e => setEmail(e.target.value)} required
                    placeholder="your@email.com"
                    style={{ width: '100%', background: 'rgba(255,253,247,0.06)', border: '1px solid rgba(226,217,204,0.2)', padding: '0.9rem 1rem 0.9rem 2.75rem', color: '#F5E6C8', fontFamily: 'var(--font-sans)', fontSize: '0.87rem', fontWeight: 300, outline: 'none', boxSizing: 'border-box' }}
                  />
                </div>
              </div>
              <div>
                <label style={{ display: 'block', fontFamily: 'var(--font-sans)', color: '#B5AFA8', fontSize: '0.6rem', letterSpacing: '0.25em', textTransform: 'uppercase', marginBottom: '0.6rem' }}>Password</label>
                <div style={{ position: 'relative' }}>
                  <Lock size={14} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#5C5248' }} />
                  <input
                    type={showPass ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)} required
                    placeholder="Enter your password"
                    style={{ width: '100%', background: 'rgba(255,253,247,0.06)', border: '1px solid rgba(226,217,204,0.2)', padding: '0.9rem 3rem 0.9rem 2.75rem', color: '#F5E6C8', fontFamily: 'var(--font-sans)', fontSize: '0.87rem', fontWeight: 300, outline: 'none', boxSizing: 'border-box' }}
                  />
                  <button type="button" onClick={() => setShowPass(v => !v)} style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#5C5248', padding: 0, display: 'flex' }}>
                    {showPass ? <EyeOff size={14} /> : <Eye size={14} />}
                  </button>
                </div>
              </div>

              {/* Demo hint */}
              <div style={{ background: 'rgba(201,168,76,0.08)', border: '1px solid rgba(201,168,76,0.2)', padding: '0.75rem 1rem' }}>
                <div style={{ fontFamily: 'var(--font-sans)', color: '#C9A84C', fontSize: '0.6rem', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '0.4rem' }}>Demo Credentials</div>
                <div style={{ fontFamily: 'var(--font-sans)', color: '#B5AFA8', fontSize: '0.75rem', fontWeight: 300, lineHeight: 1.7 }}>
                  Email: <span style={{ color: '#E2C97E' }}>client@emmeliexperience.com</span><br />
                  Password: <span style={{ color: '#E2C97E' }}>emmeli2025</span>
                </div>
              </div>

              <button
                type="submit" disabled={authLoading}
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.6rem', background: '#C9A84C', color: '#1C1610', fontFamily: 'var(--font-sans)', fontSize: '0.65rem', letterSpacing: '0.25em', textTransform: 'uppercase', padding: '1.1rem', border: 'none', cursor: authLoading ? 'not-allowed' : 'pointer', opacity: authLoading ? 0.7 : 1, fontWeight: 500, marginTop: '0.25rem' }}
              >
                {authLoading ? 'Signing in...' : (<>Sign In to Portal <ArrowRight size={13} /></>)}
              </button>

              <p style={{ fontFamily: 'var(--font-sans)', color: '#5C5248', fontSize: '0.75rem', textAlign: 'center', fontWeight: 300 }}>
                Not yet a client?{' '}
                <button type="button" onClick={() => setAuthMode('signup')} style={{ background: 'none', border: 'none', color: '#C9A84C', cursor: 'pointer', fontFamily: 'var(--font-sans)', fontSize: '0.75rem', padding: 0 }}>
                  Request access
                </button>
              </p>
            </form>
          )}

          {/* ── SIGNUP FORM ── */}
          {authMode === 'signup' && (
            <form onSubmit={handleSignup} style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
              <p style={{ fontFamily: 'var(--font-sans)', color: '#7A7068', fontSize: '0.82rem', fontWeight: 300, lineHeight: 1.7, marginBottom: '0.5rem' }}>
                Already booked with us? Fill in your details and we&apos;ll set up your portal access within 24 hours.
              </p>
              <div>
                <label style={{ display: 'block', fontFamily: 'var(--font-sans)', color: '#B5AFA8', fontSize: '0.58rem', letterSpacing: '0.25em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Full Name(s) *</label>
                <div style={{ position: 'relative' }}>
                  <User size={13} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#5C5248' }} />
                  <input type="text" value={signupName} onChange={e => setSignupName(e.target.value)} required placeholder="e.g. Sophia & James Anderson"
                    style={{ width: '100%', background: 'rgba(255,253,247,0.06)', border: '1px solid rgba(226,217,204,0.2)', padding: '0.85rem 1rem 0.85rem 2.75rem', color: '#F5E6C8', fontFamily: 'var(--font-sans)', fontSize: '0.85rem', fontWeight: 300, outline: 'none', boxSizing: 'border-box' }}
                  />
                </div>
              </div>
              <div>
                <label style={{ display: 'block', fontFamily: 'var(--font-sans)', color: '#B5AFA8', fontSize: '0.58rem', letterSpacing: '0.25em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Email Address *</label>
                <div style={{ position: 'relative' }}>
                  <Mail size={13} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#5C5248' }} />
                  <input type="email" value={signupEmail} onChange={e => setSignupEmail(e.target.value)} required placeholder="your@email.com"
                    style={{ width: '100%', background: 'rgba(255,253,247,0.06)', border: '1px solid rgba(226,217,204,0.2)', padding: '0.85rem 1rem 0.85rem 2.75rem', color: '#F5E6C8', fontFamily: 'var(--font-sans)', fontSize: '0.85rem', fontWeight: 300, outline: 'none', boxSizing: 'border-box' }}
                  />
                </div>
              </div>
              <div>
                <label style={{ display: 'block', fontFamily: 'var(--font-sans)', color: '#B5AFA8', fontSize: '0.58rem', letterSpacing: '0.25em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Phone Number</label>
                <div style={{ position: 'relative' }}>
                  <Phone size={13} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#5C5248' }} />
                  <input type="tel" value={signupPhone} onChange={e => setSignupPhone(e.target.value)} placeholder="+1 (555) 000-0000"
                    style={{ width: '100%', background: 'rgba(255,253,247,0.06)', border: '1px solid rgba(226,217,204,0.2)', padding: '0.85rem 1rem 0.85rem 2.75rem', color: '#F5E6C8', fontFamily: 'var(--font-sans)', fontSize: '0.85rem', fontWeight: 300, outline: 'none', boxSizing: 'border-box' }}
                  />
                </div>
              </div>
              <div>
                <label style={{ display: 'block', fontFamily: 'var(--font-sans)', color: '#B5AFA8', fontSize: '0.58rem', letterSpacing: '0.25em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Event Type</label>
                <select value={signupEvent} onChange={e => setSignupEvent(e.target.value)}
                  style={{ width: '100%', background: 'rgba(28,22,16,0.95)', border: '1px solid rgba(226,217,204,0.2)', padding: '0.85rem 1rem', color: signupEvent ? '#F5E6C8' : '#5C5248', fontFamily: 'var(--font-sans)', fontSize: '0.85rem', fontWeight: 300, outline: 'none', boxSizing: 'border-box', appearance: 'none' }}>
                  <option value="" disabled>Select your event type</option>
                  <option value="wedding">Full Wedding Planning</option>
                  <option value="partial">Partial Planning</option>
                  <option value="day-of">Day-of Coordination</option>
                  <option value="destination">Destination Wedding</option>
                  <option value="corporate">Corporate Event</option>
                  <option value="rental">Rental Service</option>
                  <option value="cleaning">Cleaning Service</option>
                </select>
              </div>
              <div>
                <label style={{ display: 'block', fontFamily: 'var(--font-sans)', color: '#B5AFA8', fontSize: '0.58rem', letterSpacing: '0.25em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Create Password *</label>
                <div style={{ position: 'relative' }}>
                  <Lock size={13} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#5C5248' }} />
                  <input type={showPass ? 'text' : 'password'} value={signupPass} onChange={e => setSignupPass(e.target.value)} required placeholder="Min. 8 characters"
                    style={{ width: '100%', background: 'rgba(255,253,247,0.06)', border: '1px solid rgba(226,217,204,0.2)', padding: '0.85rem 3rem 0.85rem 2.75rem', color: '#F5E6C8', fontFamily: 'var(--font-sans)', fontSize: '0.85rem', fontWeight: 300, outline: 'none', boxSizing: 'border-box' }}
                  />
                  <button type="button" onClick={() => setShowPass(v => !v)} style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#5C5248', padding: 0, display: 'flex' }}>
                    {showPass ? <EyeOff size={13} /> : <Eye size={13} />}
                  </button>
                </div>
              </div>
              <button type="submit" disabled={authLoading}
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.6rem', background: '#C9A84C', color: '#1C1610', fontFamily: 'var(--font-sans)', fontSize: '0.65rem', letterSpacing: '0.25em', textTransform: 'uppercase', padding: '1.1rem', border: 'none', cursor: authLoading ? 'not-allowed' : 'pointer', opacity: authLoading ? 0.7 : 1, fontWeight: 500 }}
              >
                {authLoading ? 'Creating your account...' : (<>Request Portal Access <ArrowRight size={13} /></>)}
              </button>
              <p style={{ fontFamily: 'var(--font-sans)', color: '#5C5248', fontSize: '0.75rem', textAlign: 'center', fontWeight: 300 }}>
                Already have an account?{' '}
                <button type="button" onClick={() => setAuthMode('login')} style={{ background: 'none', border: 'none', color: '#C9A84C', cursor: 'pointer', fontFamily: 'var(--font-sans)', fontSize: '0.75rem', padding: 0 }}>
                  Sign in
                </button>
              </p>
            </form>
          )}
        </div>
      </div>
    )
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // PORTAL SCREEN
  // ═══════════════════════════════════════════════════════════════════════════
  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#FAF6EF' }}>
      {/* Hidden file input */}
      <input ref={fileInputRef} type="file" style={{ display: 'none' }} onChange={handleFileChange} />

      {/* Desktop sidebar */}
      <aside style={{ width: 240, flexShrink: 0, background: '#1C1610', borderRight: '1px solid rgba(201,168,76,0.15)', position: 'fixed', top: 0, left: 0, height: '100%', zIndex: 30, display: 'none' }} className="lg:block">
        <SidebarContent />
      </aside>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 40, display: 'flex' }}>
          <div style={{ width: 240, background: '#1C1610', flexShrink: 0 }}><SidebarContent /></div>
          <div style={{ flex: 1, background: 'rgba(0,0,0,0.5)' }} onClick={() => setSidebarOpen(false)} />
        </div>
      )}

      {/* Main content */}
      <main style={{ flex: 1, marginLeft: 0 }} className="lg:ml-[240px]">

        {/* Topbar */}
        <div style={{ position: 'sticky', top: 0, zIndex: 20, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.875rem 1.75rem', background: '#FFFDF7', borderBottom: '1px solid #E2D9CC', boxShadow: '0 1px 12px rgba(44,44,44,0.05)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <button onClick={() => setSidebarOpen(true)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4, display: 'flex' }} className="lg:hidden" aria-label="Open menu">
              <Menu size={20} style={{ color: '#2C2C2C' }} />
            </button>
            <h1 style={{ fontFamily: 'var(--font-serif)', color: '#2C2C2C', fontSize: '1.2rem', fontWeight: 400 }}>
              {navItems.find(n => n.id === activeTab)?.label}
            </h1>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            {/* Notifications */}
            <div style={{ position: 'relative' }}>
              <button
                onClick={() => setShowNotifs(v => !v)}
                style={{ position: 'relative', background: 'none', border: 'none', cursor: 'pointer', padding: 6, display: 'flex' }}
                aria-label="Notifications"
              >
                <Bell size={18} style={{ color: '#7A7068' }} />
                {unreadCount > 0 && (
                  <span style={{ position: 'absolute', top: 4, right: 4, width: 8, height: 8, borderRadius: '50%', background: '#C9A84C', border: '2px solid #FFFDF7' }} />
                )}
              </button>

              {/* Notification dropdown */}
              {showNotifs && (
                <div style={{ position: 'absolute', top: 'calc(100% + 8px)', right: 0, width: 320, background: '#FFFDF7', border: '1px solid #E2D9CC', boxShadow: '0 8px 32px rgba(44,44,44,0.12)', zIndex: 50 }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem 1.25rem', borderBottom: '1px solid #E2D9CC' }}>
                    <span style={{ fontFamily: 'var(--font-sans)', color: '#2C2C2C', fontSize: '0.78rem', letterSpacing: '0.05em' }}>Notifications</span>
                    <button onClick={handleMarkAllRead} style={{ fontFamily: 'var(--font-sans)', color: '#C9A84C', fontSize: '0.65rem', background: 'none', border: 'none', cursor: 'pointer', letterSpacing: '0.1em' }}>Mark all read</button>
                  </div>
                  {notifs.map(n => (
                    <div key={n.id} style={{ display: 'flex', gap: '0.75rem', padding: '0.875rem 1.25rem', borderBottom: '1px solid #F0EBE3', background: n.read ? 'transparent' : 'rgba(201,168,76,0.05)' }}>
                      <div style={{ width: 7, height: 7, borderRadius: '50%', background: n.read ? 'transparent' : '#C9A84C', flexShrink: 0, marginTop: 5 }} />
                      <div>
                        <p style={{ fontFamily: 'var(--font-sans)', color: '#2C2C2C', fontSize: '0.78rem', fontWeight: 300, lineHeight: 1.6, marginBottom: '0.2rem' }}>{n.text}</p>
                        <span style={{ fontFamily: 'var(--font-sans)', color: '#B5AFA8', fontSize: '0.68rem' }}>{n.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Avatar */}
            <div style={{ width: 34, height: 34, borderRadius: '50%', background: 'linear-gradient(135deg, #9B7A2F, #C9A84C)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FFFDF7', fontFamily: 'var(--font-sans)', fontSize: '0.68rem', cursor: 'pointer' }}>S</div>
          </div>
        </div>

        {/* Content area */}
        <div style={{ padding: 'clamp(1.5rem, 3vw, 2.5rem)', maxWidth: 1100, margin: '0 auto' }}>

          {/* ── OVERVIEW ── */}
          {activeTab === 'overview' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              {/* Welcome banner */}
              <div style={{ position: 'relative', overflow: 'hidden', background: '#1C1610', padding: 'clamp(1.5rem, 4vw, 2.5rem)', borderRadius: 2 }}>
                <img src="https://images.unsplash.com/photo-1519741497674-611481863552?w=1200&h=300&fit=crop" alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.15 }} />
                <div style={{ position: 'relative', zIndex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.75rem' }}>
                    <Heart size={12} style={{ color: '#C9A84C' }} />
                    <span style={{ fontFamily: 'var(--font-sans)', color: '#C9A84C', fontSize: '0.58rem', letterSpacing: '0.3em', textTransform: 'uppercase' }}>Welcome Back</span>
                  </div>
                  <h2 style={{ fontFamily: 'var(--font-serif)', color: '#F5E6C8', fontSize: 'clamp(1.4rem, 3vw, 2rem)', marginBottom: '0.6rem', fontWeight: 400 }}>Sophia &amp; James</h2>
                  <p style={{ fontFamily: 'var(--font-sans)', color: '#B5AFA8', fontWeight: 300, fontSize: '0.85rem', lineHeight: 1.7 }}>
                    Your event is in <strong style={{ color: '#E2C97E' }}>127 days</strong>. Everything is beautifully on track.
                  </p>
                </div>
              </div>

              {/* Stats grid */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem' }}>
                {[
                  { label: 'Days to Event',      value: '127',                              sub: 'October 4, 2025'                          },
                  { label: 'Planning Progress',  value: `${progressPct}%`,                  sub: `${doneCount} of ${progressItems.length} tasks done` },
                  { label: 'Budget Spent',       value: `$${totalSpent.toLocaleString()}`,  sub: `of $${totalBudgeted.toLocaleString()}`    },
                  { label: 'Vendors Confirmed',  value: '8 / 11',                           sub: '3 pending'                                },
                ].map(stat => (
                  <div key={stat.label} style={{ background: '#FFFDF7', border: '1px solid #E2D9CC', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                    <span style={{ fontFamily: 'var(--font-sans)', color: '#C9A84C', fontSize: '0.54rem', letterSpacing: '0.25em', textTransform: 'uppercase' }}>{stat.label}</span>
                    <span style={{ fontFamily: 'var(--font-serif)', color: '#2C2C2C', fontSize: '1.7rem' }}>{stat.value}</span>
                    <span style={{ fontFamily: 'var(--font-sans)', color: '#B5AFA8', fontSize: '0.73rem', fontWeight: 300 }}>{stat.sub}</span>
                  </div>
                ))}
              </div>

              {/* Progress bar */}
              <div style={{ background: '#FFFDF7', border: '1px solid #E2D9CC', padding: '1.75rem 2rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                  <span style={{ fontFamily: 'var(--font-sans)', color: '#2C2C2C', fontSize: '0.83rem', fontWeight: 300 }}>Overall Planning Progress</span>
                  <span style={{ fontFamily: 'var(--font-serif)', color: '#C9A84C', fontSize: '1.1rem' }}>{progressPct}%</span>
                </div>
                <div style={{ height: 8, background: '#E2D9CC', borderRadius: 4, overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${progressPct}%`, background: 'linear-gradient(to right, #9B7A2F, #C9A84C, #E2C97E)', transition: 'width 1s ease' }} />
                </div>
              </div>

              {/* Quick actions */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                {[
                  { label: 'View Progress',   tab: 'progress',  icon: CheckSquare     },
                  { label: 'Check Budget',    tab: 'budget',    icon: DollarSign      },
                  { label: 'View Timeline',   tab: 'timeline',  icon: Calendar        },
                  { label: 'My Documents',    tab: 'documents', icon: FileText        },
                ].map(a => (
                  <button
                    key={a.tab}
                    onClick={() => setActiveTab(a.tab)}
                    style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '1.1rem 1.25rem', background: '#FFFDF7', border: '1px solid #E2D9CC', cursor: 'pointer', fontFamily: 'var(--font-sans)', color: '#2C2C2C', fontSize: '0.8rem', fontWeight: 300, textAlign: 'left', transition: 'border-color 0.2s' }}
                    onMouseEnter={e => (e.currentTarget.style.borderColor = '#C9A84C')}
                    onMouseLeave={e => (e.currentTarget.style.borderColor = '#E2D9CC')}
                  >
                    <a.icon size={15} style={{ color: '#C9A84C' }} />
                    {a.label}
                    <ChevronRight size={13} style={{ marginLeft: 'auto', color: '#B5AFA8' }} />
                  </button>
                ))}
              </div>

              {/* Recent messages */}
              <div style={{ background: '#FFFDF7', border: '1px solid #E2D9CC' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1.25rem 1.75rem', borderBottom: '1px solid #E2D9CC' }}>
                  <h3 style={{ fontFamily: 'var(--font-serif)', color: '#2C2C2C', fontSize: '1rem', fontWeight: 400 }}>Recent Messages</h3>
                  <button onClick={() => setActiveTab('messages')} style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', color: '#C9A84C', fontFamily: 'var(--font-sans)', fontSize: '0.7rem', background: 'none', border: 'none', cursor: 'pointer', letterSpacing: '0.08em' }}>
                    View All <ChevronRight size={12} />
                  </button>
                </div>
                {messages.slice(0, 2).map((msg, i) => (
                  <div key={msg.id} style={{ display: 'flex', gap: '1rem', padding: '1.25rem 1.75rem', borderBottom: i < 1 ? '1px solid #E2D9CC' : 'none', opacity: msg.unread ? 1 : 0.7 }}>
                    <div style={{ width: 38, height: 38, borderRadius: '50%', background: '#F5E6C8', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, color: '#9B7A2F', fontFamily: 'var(--font-sans)', fontSize: '0.62rem', fontWeight: 500 }}>{msg.avatar}</div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.3rem' }}>
                        <span style={{ fontFamily: 'var(--font-sans)', color: '#2C2C2C', fontSize: '0.82rem', fontWeight: 400 }}>{msg.from}</span>
                        {msg.unread && <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#C9A84C', flexShrink: 0 }} />}
                        <span style={{ marginLeft: 'auto', color: '#B5AFA8', fontFamily: 'var(--font-sans)', fontSize: '0.7rem' }}>{msg.time}</span>
                      </div>
                      <p style={{ fontFamily: 'var(--font-sans)', color: '#7A7068', fontSize: '0.8rem', fontWeight: 300, lineHeight: 1.6, overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' as const }}>{msg.preview}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── PROGRESS ── */}
          {activeTab === 'progress' && (
            <div style={{ maxWidth: 680, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ background: '#FFFDF7', border: '1px solid #E2D9CC', padding: '1.75rem 2rem', marginBottom: '0.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                  <span style={{ fontFamily: 'var(--font-sans)', color: '#2C2C2C', fontSize: '0.85rem', fontWeight: 300 }}>Overall Progress</span>
                  <span style={{ fontFamily: 'var(--font-serif)', color: '#C9A84C' }}>{progressPct}%</span>
                </div>
                <div style={{ height: 8, background: '#E2D9CC', borderRadius: 4, overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${progressPct}%`, background: 'linear-gradient(to right, #9B7A2F, #C9A84C)' }} />
                </div>
                <div style={{ fontFamily: 'var(--font-sans)', color: '#B5AFA8', fontSize: '0.73rem', fontWeight: 300, marginTop: '0.6rem' }}>{doneCount} of {progressItems.length} milestones complete</div>
              </div>
              {progressItems.map((item, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1.1rem 1.5rem', background: item.active ? '#FFFCF3' : '#FFFDF7', border: `1px solid ${item.active ? '#C9A84C' : '#E2D9CC'}` }}>
                  {item.done
                    ? <CheckCircle2 size={18} style={{ color: '#C9A84C', flexShrink: 0 }} />
                    : item.active
                    ? <Clock size={18} style={{ color: '#C9A84C', flexShrink: 0 }} />
                    : <Circle size={18} style={{ color: '#E2D9CC', flexShrink: 0 }} />}
                  <span style={{ fontFamily: 'var(--font-sans)', color: item.done ? '#B5AFA8' : '#2C2C2C', fontSize: '0.85rem', fontWeight: 300, textDecoration: item.done ? 'line-through' : 'none', flex: 1 }}>{item.label}</span>
                  {item.active && <span style={{ background: '#F5E6C8', color: '#9B7A2F', fontFamily: 'var(--font-sans)', fontSize: '0.54rem', letterSpacing: '0.15em', textTransform: 'uppercase', padding: '0.25rem 0.6rem', flexShrink: 0 }}>In Progress</span>}
                  {item.done && <span style={{ fontFamily: 'var(--font-sans)', color: '#C9A84C', fontSize: '0.7rem', flexShrink: 0 }}>Done</span>}
                </div>
              ))}
            </div>
          )}

          {/* ── BUDGET ── */}
          {activeTab === 'budget' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', maxWidth: 760 }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '1rem' }}>
                {[
                  { label: 'Total Budget', value: `$${totalBudgeted.toLocaleString()}`, highlight: false },
                  { label: 'Spent So Far', value: `$${totalSpent.toLocaleString()}`, highlight: true },
                  { label: 'Remaining', value: `$${(totalBudgeted - totalSpent).toLocaleString()}`, highlight: false },
                ].map(s => (
                  <div key={s.label} style={{ background: '#FFFDF7', border: `1px solid ${s.highlight ? '#C9A84C' : '#E2D9CC'}`, padding: '1.5rem', textAlign: 'center' }}>
                    <div style={{ fontFamily: 'var(--font-sans)', color: '#C9A84C', fontSize: '0.54rem', letterSpacing: '0.25em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>{s.label}</div>
                    <div style={{ fontFamily: 'var(--font-serif)', color: '#2C2C2C', fontSize: '1.5rem' }}>{s.value}</div>
                  </div>
                ))}
              </div>
              <div style={{ background: '#FFFDF7', border: '1px solid #E2D9CC' }}>
                <div style={{ padding: '1.25rem 1.75rem', borderBottom: '1px solid #E2D9CC' }}>
                  <h3 style={{ fontFamily: 'var(--font-serif)', color: '#2C2C2C', fontSize: '1rem', fontWeight: 400 }}>Budget Breakdown</h3>
                </div>
                {budgetItems.map((item, i) => {
                  const pct = item.budgeted > 0 ? Math.round((item.spent / item.budgeted) * 100) : 0
                  return (
                    <div key={item.category} style={{ padding: '1.25rem 1.75rem', borderBottom: i < budgetItems.length - 1 ? '1px solid #E2D9CC' : 'none' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.6rem' }}>
                        <span style={{ fontFamily: 'var(--font-sans)', color: '#2C2C2C', fontSize: '0.83rem', fontWeight: 300 }}>{item.category}</span>
                        <div style={{ display: 'flex', gap: '0.6rem', fontFamily: 'var(--font-sans)', fontSize: '0.8rem' }}>
                          <span style={{ color: '#C9A84C' }}>${item.spent.toLocaleString()}</span>
                          <span style={{ color: '#B5AFA8' }}>/ ${item.budgeted.toLocaleString()}</span>
                          <span style={{ color: '#B5AFA8', fontSize: '0.7rem' }}>({pct}%)</span>
                        </div>
                      </div>
                      <div style={{ height: 6, background: '#E2D9CC', borderRadius: 3, overflow: 'hidden' }}>
                        <div style={{ height: '100%', width: `${pct}%`, background: item.color, borderRadius: 3, transition: 'width 0.8s ease' }} />
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          {/* ── TIMELINE ── */}
          {activeTab === 'timeline' && (
            <div style={{ maxWidth: 600 }}>
              <div style={{ paddingLeft: '2rem', borderLeft: '2px solid #E2D9CC', position: 'relative' }}>
                {timelineEvents.map((ev, i) => (
                  <div key={i} style={{ position: 'relative', marginBottom: '1.25rem' }}>
                    <div style={{ position: 'absolute', left: '-2.55rem', top: '1rem', width: 14, height: 14, borderRadius: '50%', border: `2px solid ${ev.done || ev.active ? '#C9A84C' : '#E2D9CC'}`, background: ev.done ? '#C9A84C' : ev.special ? '#1C1610' : '#FFFDF7', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      {ev.done && <Star size={6} color="#FFFDF7" />}
                      {ev.special && <Heart size={6} color="#C9A84C" />}
                    </div>
                    <div style={{ padding: '1rem 1.5rem', background: ev.active ? '#FFFCF3' : ev.special ? '#1C1610' : '#FFFDF7', border: `1px solid ${ev.active || ev.special ? '#C9A84C' : '#E2D9CC'}` }}>
                      <div style={{ fontFamily: 'var(--font-sans)', color: '#C9A84C', fontSize: '0.58rem', letterSpacing: '0.25em', textTransform: 'uppercase', marginBottom: '0.3rem' }}>{ev.date}</div>
                      <div style={{ fontFamily: ev.special ? 'var(--font-serif)' : 'var(--font-sans)', color: ev.special ? '#F5E6C8' : ev.done ? '#B5AFA8' : '#2C2C2C', fontSize: ev.special ? '1rem' : '0.85rem', fontWeight: ev.special ? 400 : 300 }}>{ev.label}</div>
                      {ev.active && <div style={{ fontFamily: 'var(--font-sans)', color: '#9B7A2F', fontSize: '0.65rem', marginTop: '0.3rem' }}>Currently in progress</div>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── DOCUMENTS ── */}
          {activeTab === 'documents' && (
            <div style={{ maxWidth: 700, display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
                <p style={{ fontFamily: 'var(--font-sans)', color: '#7A7068', fontSize: '0.85rem', fontWeight: 300, lineHeight: 1.7 }}>
                  All documents shared between you and the Emmeli Experience team.
                </p>
                <button
                  onClick={handleUploadClick}
                  style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: '#2C2C2C', color: '#FFFDF7', fontFamily: 'var(--font-sans)', fontSize: '0.62rem', letterSpacing: '0.15em', textTransform: 'uppercase', padding: '0.75rem 1.5rem', border: 'none', cursor: 'pointer' }}
                >
                  <Upload size={13} /> Upload File
                </button>
              </div>

              {uploadMsg && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', background: 'rgba(100,160,80,0.1)', border: '1px solid rgba(100,160,80,0.3)', padding: '0.75rem 1rem' }}>
                  <CheckCircle2 size={14} style={{ color: '#5A9A50', flexShrink: 0 }} />
                  <span style={{ fontFamily: 'var(--font-sans)', color: '#5A9A50', fontSize: '0.8rem', fontWeight: 300 }}>{uploadMsg}</span>
                </div>
              )}

              <div style={{ background: '#FFFDF7', border: '1px solid #E2D9CC' }}>
                {documents.map((doc, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1.1rem 1.5rem', borderBottom: i < documents.length - 1 ? '1px solid #E2D9CC' : 'none' }}>
                    <div style={{ width: 36, height: 36, background: doc.type === 'pdf' ? '#F5E6C8' : '#E8F5E8', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <FileText size={15} style={{ color: doc.type === 'pdf' ? '#9B7A2F' : '#4A7A4A' }} />
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontFamily: 'var(--font-sans)', color: '#2C2C2C', fontSize: '0.83rem', fontWeight: 400, marginBottom: '0.2rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{doc.name}</div>
                      <div style={{ fontFamily: 'var(--font-sans)', color: '#B5AFA8', fontSize: '0.7rem', fontWeight: 300 }}>{doc.date} · {doc.size}</div>
                    </div>
                    <button
                      onClick={() => handleDownload(doc.name)}
                      style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#C9A84C', fontFamily: 'var(--font-sans)', fontSize: '0.68rem', background: 'none', border: 'none', cursor: 'pointer', flexShrink: 0, letterSpacing: '0.08em', textTransform: 'uppercase' }}
                    >
                      <Download size={13} /> Download
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── MESSAGES ── */}
          {activeTab === 'messages' && (
            <div style={{ maxWidth: 700, display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <p style={{ fontFamily: 'var(--font-sans)', color: '#7A7068', fontSize: '0.85rem', fontWeight: 300, lineHeight: 1.7 }}>
                Your direct line to the Emmeli Experience team. Replies are monitored Mon–Fri, 9am–6pm.
              </p>
              {messages.map(msg => (
                <div key={msg.id} style={{ background: '#FFFDF7', border: `1px solid ${msg.unread ? '#C9A84C' : '#E2D9CC'}` }}>
                  {/* Message header */}
                  <div style={{ display: 'flex', gap: '1rem', padding: '1.5rem' }}>
                    <div style={{ width: 42, height: 42, borderRadius: '50%', background: '#F5E6C8', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, color: '#9B7A2F', fontFamily: 'var(--font-sans)', fontSize: '0.68rem', fontWeight: 500 }}>{msg.avatar}</div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.3rem', flexWrap: 'wrap' }}>
                        <span style={{ fontFamily: 'var(--font-sans)', color: '#2C2C2C', fontSize: '0.85rem', fontWeight: 500 }}>{msg.from}</span>
                        <span style={{ fontFamily: 'var(--font-sans)', color: '#B5AFA8', fontSize: '0.7rem', fontWeight: 300 }}>{msg.role}</span>
                        {msg.unread && <span style={{ background: '#F5E6C8', color: '#9B7A2F', fontFamily: 'var(--font-sans)', fontSize: '0.52rem', letterSpacing: '0.15em', textTransform: 'uppercase', padding: '0.2rem 0.5rem' }}>New</span>}
                        <span style={{ marginLeft: 'auto', color: '#B5AFA8', fontFamily: 'var(--font-sans)', fontSize: '0.7rem' }}>{msg.time}</span>
                      </div>
                      <p style={{ fontFamily: 'var(--font-sans)', color: '#7A7068', fontSize: '0.83rem', fontWeight: 300, lineHeight: 1.75 }}>{msg.preview}</p>
                    </div>
                  </div>

                  {/* Previous replies */}
                  {msg.replies.length > 0 && (
                    <div style={{ borderTop: '1px solid #F0EBE3', background: '#FAF6EF', padding: '1rem 1.5rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                      {msg.replies.map((r, ri) => (
                        <div key={ri} style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                          <div style={{ width: 30, height: 30, borderRadius: '50%', background: 'linear-gradient(135deg, #9B7A2F, #C9A84C)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, color: '#FFFDF7', fontFamily: 'var(--font-sans)', fontSize: '0.6rem' }}>You</div>
                          <div style={{ background: '#FFFDF7', border: '1px solid #E2D9CC', padding: '0.65rem 1rem', flex: 1 }}>
                            <p style={{ fontFamily: 'var(--font-sans)', color: '#2C2C2C', fontSize: '0.82rem', fontWeight: 300, lineHeight: 1.6 }}>{r}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Reply input */}
                  <div style={{ borderTop: '1px solid #F0EBE3', padding: '1rem 1.5rem' }}>
                    {sentReplies[msg.id] && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
                        <CheckCircle2 size={13} style={{ color: '#5A9A50' }} />
                        <span style={{ fontFamily: 'var(--font-sans)', color: '#5A9A50', fontSize: '0.75rem', fontWeight: 300 }}>Reply sent successfully!</span>
                      </div>
                    )}
                    <textarea
                      value={replyTexts[msg.id] || ''}
                      onChange={e => setReplyTexts(prev => ({ ...prev, [msg.id]: e.target.value }))}
                      placeholder="Type your reply..."
                      rows={2}
                      style={{ width: '100%', background: '#FAF6EF', border: '1px solid #E2D9CC', padding: '0.75rem 1rem', fontSize: '0.83rem', fontFamily: 'var(--font-sans)', fontWeight: 300, color: '#2C2C2C', resize: 'none', outline: 'none', boxSizing: 'border-box', lineHeight: 1.6 }}
                    />
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '0.6rem' }}>
                      <button style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#B5AFA8', fontFamily: 'var(--font-sans)', fontSize: '0.7rem', background: 'none', border: 'none', cursor: 'pointer' }}>
                        <Paperclip size={13} /> Attach file
                      </button>
                      <button
                        onClick={() => handleSendReply(msg.id)}
                        style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: '#2C2C2C', color: '#FFFDF7', fontFamily: 'var(--font-sans)', fontSize: '0.62rem', letterSpacing: '0.15em', textTransform: 'uppercase', padding: '0.65rem 1.25rem', border: 'none', cursor: 'pointer' }}
                      >
                        <Send size={12} /> Send Reply
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>
      </main>
    </div>
  )
}
