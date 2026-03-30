'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'

const links = [
  { label: 'About', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Portfolio', href: '/portfolio' },
  { label: 'Blog', href: '/blog' },
  { label: 'FAQ', href: '/faq' },
  { label: 'Contact', href: '/contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const isHome = pathname === '/'
  const isDash = pathname?.startsWith('/dashboard') || pathname?.startsWith('/admin')
  const transparent = isHome && !scrolled

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', fn, { passive: true })
    fn()
    return () => window.removeEventListener('scroll', fn)
  }, [])

  useEffect(() => { setOpen(false) }, [pathname])
  useEffect(() => { document.body.style.overflow = open ? 'hidden' : '' }, [open])

  if (isDash) return null

  const navBg = transparent ? 'transparent' : 'rgba(255,253,247,0.96)'
  const textColor = transparent ? '#FFFDF7' : '#2C2C2C'

  return (
    <>
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        background: navBg, backdropFilter: transparent ? 'none' : 'blur(12px)',
        borderBottom: transparent ? 'none' : '1px solid rgba(226,217,204,0.5)',
        boxShadow: transparent ? 'none' : '0 1px 20px rgba(44,44,44,0.06)',
        transition: 'background 0.6s ease, box-shadow 0.6s ease',
        height: 76,
      }}>
        <div style={{ maxWidth: 1400, margin: '0 auto', padding: '0 2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '100%' }}>
          {/* Logo */}
          <Link href="/" style={{ textDecoration: 'none', display: 'flex', flexDirection: 'column', lineHeight: 1.1 }}>
            <span style={{ fontFamily: 'var(--font-serif)', fontSize: '1.3rem', letterSpacing: '0.06em', color: textColor, transition: 'color 0.5s ease' }}>Emmeli Experience</span>
            <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.52rem', letterSpacing: '0.32em', textTransform: 'uppercase', color: '#C9A84C', fontWeight: 300 }}>Event &amp; Wedding Planning</span>
          </Link>

          {/* Desktop links */}
          <ul style={{ display: 'none', gap: '2.2rem', listStyle: 'none', margin: 0, padding: 0 }} className="hidden lg:flex">
            {links.map((l) => (
              <li key={l.href}>
                <Link href={l.href} style={{
                  fontFamily: 'var(--font-sans)', fontSize: '0.66rem', letterSpacing: '0.22em',
                  textTransform: 'uppercase', fontWeight: 300,
                  color: pathname === l.href ? '#C9A84C' : textColor,
                  transition: 'color 0.3s ease',
                }}>
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Desktop CTA */}
          <div className="hidden lg:flex" style={{ display: 'none', alignItems: 'center', gap: '1.25rem' }}>
            <Link href="/dashboard" style={{ fontFamily: 'var(--font-sans)', fontSize: '0.63rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: transparent ? 'rgba(245,230,200,0.7)' : '#7A7068', transition: 'color 0.3s ease' }}>
              Client Login
            </Link>
            <Link href="/booking" className="btn-gold"><span>Start Planning</span></Link>
          </div>

          {/* Mobile hamburger */}
          <button onClick={() => setOpen(v => !v)} aria-label="Toggle menu" style={{ padding: 8, background: 'none', border: 'none', display: 'flex' }} className="lg:hidden">
            {open ? <X size={22} color="#2C2C2C" /> : <Menu size={22} color={textColor} />}
          </button>
        </div>
      </nav>

      {/* Mobile overlay */}
      {open && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 99, background: '#FFFDF7', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <span style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', color: '#2C2C2C', marginBottom: '0.5rem' }}>Emmeli Experience</span>
          <div style={{ width: 32, height: 1, background: '#C9A84C', marginBottom: '1.75rem' }} />
          {links.map((l) => (
            <Link key={l.href} href={l.href} style={{ fontFamily: 'var(--font-sans)', fontSize: '0.75rem', letterSpacing: '0.28em', textTransform: 'uppercase', color: pathname === l.href ? '#C9A84C' : '#2C2C2C', padding: '0.75rem 0', display: 'block' }}>
              {l.label}
            </Link>
          ))}
          <div style={{ width: 32, height: 1, background: '#C9A84C', margin: '1.25rem 0' }} />
          <Link href="/booking" className="btn-gold" style={{ marginBottom: '1rem' }}><span>Start Planning</span></Link>
          <Link href="/dashboard" style={{ fontFamily: 'var(--font-sans)', fontSize: '0.63rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#7A7068' }}>Client Login</Link>
          <button onClick={() => setOpen(false)} aria-label="Close" style={{ position: 'absolute', top: 24, right: 24, padding: 8, background: 'none', border: 'none' }}>
            <X size={22} color="#2C2C2C" />
          </button>
        </div>
      )}
    </>
  )
}
