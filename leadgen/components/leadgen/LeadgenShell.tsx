'use client'
import { useState, useContext, createContext, useEffect } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'

/* ── Types ── */
export type User = { name: string; email: string; role: string }
export type AuthCtx = { user: User | null; login: (e: string, p: string) => boolean; logout: () => void }

export const AuthContext = createContext<AuthCtx>({ user: null, login: () => false, logout: () => {} })
export function useAuth() { return useContext(AuthContext) }

/* ── Icons ── */
function GridIcon()    { return <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg> }
function SearchIcon()  { return <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg> }
function SendIcon()    { return <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg> }
function InboxIcon()   { return <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><polyline points="22 12 16 12 14 15 10 15 8 12 2 12"/><path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"/></svg> }
function CalIcon()     { return <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg> }
function UsersIcon()   { return <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg> }
function CardIcon()    { return <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg> }
function ChartIcon()   { return <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg> }
function GearIcon()    { return <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg> }
function LogoutIcon()  { return <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg> }
function MenuIcon()    { return <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg> }
function EyeIcon()     { return <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg> }
function EyeOffIcon()  { return <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/></svg> }

const NAV = [
  { label: 'Dashboard',      href: '/leadgen/dashboard',    icon: GridIcon,   group: 'main' },
  { label: 'Lead Discovery', href: '/leadgen/leads',        icon: SearchIcon, group: 'main' },
  { label: 'Campaigns',      href: '/leadgen/campaigns',    icon: SendIcon,   group: 'main' },
  { label: 'Replies',        href: '/leadgen/replies',      icon: InboxIcon,  group: 'main' },
  { label: 'Appointments',   href: '/leadgen/appointments', icon: CalIcon,    group: 'main' },
  { label: 'Clients',        href: '/leadgen/clients',      icon: UsersIcon,  group: 'mgmt' },
  { label: 'Billing',        href: '/leadgen/billing',      icon: CardIcon,   group: 'mgmt' },
  { label: 'Analytics',      href: '/leadgen/analytics',    icon: ChartIcon,  group: 'mgmt' },
  { label: 'Settings',       href: '/leadgen/settings',     icon: GearIcon,   group: 'mgmt' },
]

/* ── Sidebar ── */
function Sidebar({ onClose, user, logout }: { onClose?: () => void; user: User; logout: () => void }) {
  const pathname = usePathname()
  const mainNav = NAV.filter(n => n.group === 'main')
  const mgmtNav = NAV.filter(n => n.group === 'mgmt')

  return (
    <aside style={{ width: 220, height: '100vh', background: '#0D1017', borderRight: '1px solid #1E2330', display: 'flex', flexDirection: 'column', overflowY: 'auto' }}>
      {/* Logo */}
      <div style={{ padding: '1.125rem 1rem', borderBottom: '1px solid #1E2330', flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <div style={{ width: 32, height: 32, background: 'linear-gradient(135deg,#3B82F6,#8B5CF6)', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <svg width="16" height="16" fill="none" stroke="#fff" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>
          </div>
          <div>
            <div style={{ fontSize: '0.875rem', fontWeight: 700, color: '#F0F2F8' }}>LeadForge AI</div>
            <div style={{ fontSize: '0.58rem', color: '#4A5168', letterSpacing: '0.04em' }}>Real Estate Edition</div>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, padding: '0.75rem 0.5rem' }}>
        <div style={{ fontSize: '0.58rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#4A5168', padding: '0.5rem 0.5rem 0.3rem' }}>Main</div>
        {mainNav.map(({ label, href, icon: Icon }) => (
          <Link key={href} href={href} onClick={onClose} style={{ textDecoration: 'none', display: 'block' }}>
            <div className={`nav-item${pathname === href ? ' active' : ''}`}>
              <Icon />{label}
            </div>
          </Link>
        ))}
        <div style={{ fontSize: '0.58rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#4A5168', padding: '0.75rem 0.5rem 0.3rem', marginTop: '0.5rem' }}>Management</div>
        {mgmtNav.map(({ label, href, icon: Icon }) => (
          <Link key={href} href={href} onClick={onClose} style={{ textDecoration: 'none', display: 'block' }}>
            <div className={`nav-item${pathname === href ? ' active' : ''}`}>
              <Icon />{label}
            </div>
          </Link>
        ))}
      </nav>

      {/* User footer */}
      <div style={{ padding: '0.75rem', borderTop: '1px solid #1E2330', flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', padding: '0.5rem', borderRadius: 6, background: '#111318' }}>
          <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'linear-gradient(135deg,#3B82F6,#8B5CF6)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.72rem', fontWeight: 700, color: '#fff', flexShrink: 0 }}>
            {user.name.charAt(0)}
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 600, color: '#F0F2F8', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{user.name}</div>
            <div style={{ fontSize: '0.6rem', color: '#4A5168' }}>{user.role}</div>
          </div>
          <button onClick={logout} title="Sign out" style={{ background: 'none', border: 'none', color: '#4A5168', cursor: 'pointer', padding: 2, flexShrink: 0 }}>
            <LogoutIcon />
          </button>
        </div>
      </div>
    </aside>
  )
}

/* ── Login Gate ── */
function LoginGate({ onLogin }: { onLogin: (e: string, p: string) => boolean }) {
  const [email, setEmail]       = useState('')
  const [password, setPassword] = useState('')
  const [show, setShow]         = useState(false)
  const [error, setError]       = useState('')
  const [loading, setLoading]   = useState(false)

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true); setError('')
    await new Promise(r => setTimeout(r, 800))
    if (!onLogin(email, password)) setError('Invalid credentials. Use the demo login below.')
    setLoading(false)
  }

  return (
    <div style={{ minHeight: '100vh', background: '#0A0C10', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1.5rem' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) minmax(0,1fr)', maxWidth: 900, width: '100%', borderRadius: 14, overflow: 'hidden', border: '1px solid #1E2330', boxShadow: '0 24px 64px rgba(0,0,0,0.5)' }}>
        {/* Left — Branding */}
        <div style={{ background: 'linear-gradient(145deg,#0D1832,#050C1A)', padding: '3rem 2.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: -80, right: -80, width: 260, height: 260, background: 'radial-gradient(circle,rgba(59,130,246,0.2) 0%,transparent 70%)', borderRadius: '50%', pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', bottom: -60, left: -60, width: 220, height: 220, background: 'radial-gradient(circle,rgba(139,92,246,0.15) 0%,transparent 70%)', borderRadius: '50%', pointerEvents: 'none' }} />
          <div style={{ position: 'relative' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '2.5rem' }}>
              <div style={{ width: 38, height: 38, background: 'linear-gradient(135deg,#3B82F6,#8B5CF6)', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <svg width="20" height="20" fill="none" stroke="#fff" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>
              </div>
              <span style={{ fontSize: '1.1rem', fontWeight: 700, color: '#F0F2F8' }}>LeadForge AI</span>
            </div>
            <h2 style={{ fontSize: 'clamp(1.4rem,2.5vw,1.875rem)', fontWeight: 700, color: '#F0F2F8', lineHeight: 1.3, marginBottom: '1rem' }}>
              AI-Powered Lead Generation for Real Estate
            </h2>
            <p style={{ color: '#8B92A5', fontSize: '0.825rem', lineHeight: 1.75, marginBottom: '2rem' }}>
              Discover, qualify, and close real estate leads automatically with AI-personalized outreach.
            </p>
            {[
              ['Discover leads from LinkedIn, Instagram & Google', '#3B82F6'],
              ['Hot / Warm / Cold AI qualification scoring',       '#10B981'],
              ['Personalized outreach — not generic templates',    '#8B5CF6'],
              ['Full reply management & appointment tracking',     '#F59E0B'],
            ].map(([txt, col]) => (
              <div key={txt} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.65rem', marginBottom: '0.65rem' }}>
                <div style={{ width: 6, height: 6, borderRadius: '50%', background: col, flexShrink: 0, marginTop: '0.35rem' }} />
                <span style={{ color: '#8B92A5', fontSize: '0.775rem', lineHeight: 1.5 }}>{txt}</span>
              </div>
            ))}
          </div>
          <div style={{ fontSize: '0.68rem', color: '#4A5168', position: 'relative' }}>Trusted by 500+ real estate agents across the US</div>
        </div>

        {/* Right — Form */}
        <div style={{ background: '#111318', padding: '3rem 2.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <h3 style={{ fontSize: '1.375rem', fontWeight: 700, color: '#F0F2F8', marginBottom: '0.4rem' }}>Sign in to your workspace</h3>
          <p style={{ color: '#8B92A5', fontSize: '0.8rem', marginBottom: '2rem' }}>Enter your credentials to access the dashboard</p>
          <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
              <label style={{ fontSize: '0.75rem', fontWeight: 500, color: '#8B92A5', display: 'block', marginBottom: '0.4rem' }}>Email Address</label>
              <input className="lg-input" type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="admin@leadforge.ai" required />
            </div>
            <div>
              <label style={{ fontSize: '0.75rem', fontWeight: 500, color: '#8B92A5', display: 'block', marginBottom: '0.4rem' }}>Password</label>
              <div style={{ position: 'relative' }}>
                <input className="lg-input" type={show ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" required style={{ paddingRight: '2.75rem' }} />
                <button type="button" onClick={() => setShow(s => !s)} style={{ position: 'absolute', right: '0.75rem', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: '#4A5168', cursor: 'pointer' }}>
                  {show ? <EyeOffIcon /> : <EyeIcon />}
                </button>
              </div>
            </div>
            {error && (
              <div style={{ background: 'rgba(244,63,94,0.08)', border: '1px solid rgba(244,63,94,0.25)', borderRadius: 6, padding: '0.6rem 0.75rem', fontSize: '0.75rem', color: '#F87171' }}>{error}</div>
            )}
            <button className="lg-btn-primary" type="submit" disabled={loading} style={{ marginTop: '0.25rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
              {loading
                ? <><span style={{ width: 14, height: 14, border: '2px solid rgba(255,255,255,0.25)', borderTopColor: '#fff', borderRadius: '50%', display: 'inline-block', animation: 'lg-spin 0.7s linear infinite' }} /> Signing in...</>
                : 'Sign In to LeadForge'}
            </button>
          </form>
          <div style={{ marginTop: '1.5rem', padding: '0.875rem', background: '#0A0C10', borderRadius: 8, border: '1px solid #1E2330' }}>
            <div style={{ fontSize: '0.68rem', color: '#4A5168', marginBottom: '0.35rem', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Demo Credentials</div>
            <div style={{ fontSize: '0.775rem', color: '#8B92A5' }}>admin@leadforge.ai &nbsp;/&nbsp; admin123</div>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ── Main Shell ── */
export default function LeadgenShell({ children }: { children: React.ReactNode }) {
  const [user, setUser]         = useState<User | null>(null)
  const [mobileOpen, setMobileOpen] = useState(false)
  const router = useRouter()

  // Persist login in sessionStorage
  useEffect(() => {
    const stored = sessionStorage.getItem('lg_user')
    if (stored) { try { setUser(JSON.parse(stored)) } catch {} }
  }, [])

  const login = (email: string, password: string) => {
    if (email === 'admin@leadforge.ai' && password === 'admin123') {
      const u = { name: 'Admin User', email, role: 'Super Admin' }
      setUser(u)
      sessionStorage.setItem('lg_user', JSON.stringify(u))
      router.push('/leadgen/dashboard')
      return true
    }
    return false
  }

  const logout = () => {
    setUser(null)
    sessionStorage.removeItem('lg_user')
    router.push('/leadgen')
  }

  if (!user) return <LoginGate onLogin={login} />

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      <div style={{ display: 'flex', minHeight: '100vh', background: '#0A0C10', fontFamily: 'Inter, system-ui, sans-serif' }}>
        {/* Desktop sidebar — fixed */}
        <div style={{ position: 'fixed', top: 0, left: 0, height: '100vh', zIndex: 50, display: 'none' }} className="lg-sidebar">
          <Sidebar user={user} logout={logout} />
        </div>

        {/* Mobile overlay */}
        {mobileOpen && (
          <div style={{ position: 'fixed', inset: 0, zIndex: 200 }}>
            <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.65)' }} onClick={() => setMobileOpen(false)} />
            <div style={{ position: 'relative', zIndex: 1, width: 220, height: '100%' }}>
              <Sidebar user={user} logout={logout} onClose={() => setMobileOpen(false)} />
            </div>
          </div>
        )}

        {/* Content area */}
        <div style={{ flex: 1, minWidth: 0 }} className="lg-main">
          {/* Top bar */}
          <header style={{ position: 'sticky', top: 0, zIndex: 40, background: 'rgba(10,12,16,0.92)', backdropFilter: 'blur(12px)', borderBottom: '1px solid #1E2330', padding: '0.75rem 1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <button onClick={() => setMobileOpen(true)} className="lg-btn-ghost lg-mobile-menu" style={{ padding: '0.4rem' }}>
              <MenuIcon />
            </button>
            <div style={{ flex: 1 }} />
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', padding: '0.3rem 0.75rem', background: 'rgba(16,185,129,0.1)', borderRadius: 9999, border: '1px solid rgba(16,185,129,0.2)' }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#10B981', display: 'inline-block' }} />
                <span style={{ fontSize: '0.68rem', color: '#34D399', fontWeight: 500 }}>System Active</span>
              </div>
              <span style={{ fontSize: '0.75rem', color: '#8B92A5' }}>{user.name}</span>
              <button onClick={logout} title="Sign out" className="lg-btn-ghost" style={{ padding: '0.35rem 0.5rem', fontSize: '0.7rem', color: '#4A5168', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                <LogoutIcon /> Sign out
              </button>
            </div>
          </header>

          {/* Page content */}
          <main style={{ padding: '1.5rem', maxWidth: 1400, margin: '0 auto' }}>{children}</main>
        </div>
      </div>
    </AuthContext.Provider>
  )
}
