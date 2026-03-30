import Link from 'next/link'
import { Instagram, Facebook, Mail, Phone, MapPin, Youtube } from 'lucide-react'

const footerLinks = [
  { label: 'About', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Portfolio', href: '/portfolio' },
  { label: 'Blog', href: '/blog' },
  { label: 'FAQ', href: '/faq' },
  { label: 'Book a Consultation', href: '/booking' },
  { label: 'Contact', href: '/contact' },
]

const tickers = Array.from({ length: 8 }, (_, i) => i)

export default function Footer() {
  return (
    <footer style={{ background: '#1C1610', color: '#F5E6C8' }}>
      {/* Ticker */}
      <div style={{ borderTop: '1px solid rgba(201,168,76,0.2)', borderBottom: '1px solid rgba(201,168,76,0.2)', padding: '0.75rem 0', overflow: 'hidden' }}>
        <div className="ticker-track animate-ticker">
          {tickers.map((i) => (
            <span key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: '1.5rem', padding: '0 2rem', fontSize: '0.58rem', letterSpacing: '0.35em', textTransform: 'uppercase', color: '#C9A84C', fontFamily: 'var(--font-sans), sans-serif' }}>
              Emmeli Experience
              <span style={{ display: 'inline-block', width: 4, height: 4, borderRadius: '50%', background: '#C9A84C' }} />
              Luxury Event Planning
              <span style={{ display: 'inline-block', width: 4, height: 4, borderRadius: '50%', background: '#C9A84C' }} />
              Mr &amp; Mrs Ogedegbe
              <span style={{ display: 'inline-block', width: 4, height: 4, borderRadius: '50%', background: '#C9A84C' }} />
            </span>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div style={{ padding: '5rem 1.5rem', textAlign: 'center', borderBottom: '1px solid #2A1E14' }}>
        <p style={{ fontSize: '0.6rem', letterSpacing: '0.35em', textTransform: 'uppercase', color: '#C9A84C', marginBottom: '1rem', fontFamily: 'var(--font-sans), sans-serif' }}>
          Begin Your Journey
        </p>
        <h2 style={{ fontFamily: 'var(--font-serif), serif', fontSize: 'clamp(1.8rem, 4vw, 3rem)', color: '#F5E6C8', marginBottom: '1.5rem', lineHeight: 1.15 }}>
          Your Story Deserves<br /><em>an Unforgettable Experience</em>
        </h2>
        <Link href="/booking" className="btn-gold"><span>Start Planning Today</span></Link>
      </div>

      {/* Main grid */}
      <div style={{ maxWidth: 1400, margin: '0 auto', padding: '4rem 2rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '3rem' }}>
          <div style={{ gridColumn: 'span 2' }}>
            <div style={{ fontFamily: 'var(--font-serif), serif', fontSize: '1.75rem', color: '#F5E6C8', marginBottom: '0.35rem' }}>Emmeli Experience</div>
            <div style={{ fontSize: '0.58rem', letterSpacing: '0.28em', textTransform: 'uppercase', color: '#C9A84C', marginBottom: '0.5rem', fontFamily: 'var(--font-sans), sans-serif' }}>
              By Mr &amp; Mrs Emmanuel &amp; Melisa Ogedegbe
            </div>
            <div style={{ fontSize: '0.58rem', letterSpacing: '0.28em', textTransform: 'uppercase', color: '#7A7068', marginBottom: '1.25rem', fontFamily: 'var(--font-sans), sans-serif' }}>
              Event Planning · Weddings · Corporate Events
            </div>
            <p style={{ fontSize: '0.85rem', color: '#B5AFA8', lineHeight: 1.8, maxWidth: 320, marginBottom: '1.5rem', fontFamily: 'var(--font-sans), sans-serif', fontWeight: 300 }}>
              We craft timeless, cinematic event experiences. From intimate weddings to grand corporate occasions, every detail is curated with passion and precision.
            </p>
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              {[Instagram, Facebook, Youtube, Mail].map((Icon, i) => (
                <a key={i} href="#" aria-label="Social" style={{ width: 38, height: 38, border: '1px solid #2A1E14', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#B5AFA8', transition: 'all 0.3s ease' }}>
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 style={{ fontSize: '0.63rem', letterSpacing: '0.28em', textTransform: 'uppercase', color: '#C9A84C', marginBottom: '1.5rem', fontFamily: 'var(--font-sans), sans-serif' }}>Quick Links</h4>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {footerLinks.map((item) => (
                <li key={item.label}>
                  <Link href={item.href} style={{ fontSize: '0.83rem', color: '#B5AFA8', fontFamily: 'var(--font-sans), sans-serif', fontWeight: 300, letterSpacing: '0.04em', transition: 'color 0.3s ease' }}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 style={{ fontSize: '0.63rem', letterSpacing: '0.28em', textTransform: 'uppercase', color: '#C9A84C', marginBottom: '1.5rem', fontFamily: 'var(--font-sans), sans-serif' }}>Contact</h4>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {[
                { icon: Phone, text: '+1 (908) 555-0192' },
                { icon: Mail, text: 'hello@emmeliexperience.com' },
                { icon: MapPin, text: 'Morristown, New Jersey, USA' },
              ].map(({ icon: Icon, text }) => (
                <li key={text} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                  <Icon size={14} color="#C9A84C" style={{ marginTop: 2, flexShrink: 0 }} />
                  <span style={{ fontSize: '0.83rem', color: '#B5AFA8', fontFamily: 'var(--font-sans), sans-serif', fontWeight: 300 }}>{text}</span>
                </li>
              ))}
            </ul>
            <div style={{ marginTop: '2rem' }}>
              <h4 style={{ fontSize: '0.63rem', letterSpacing: '0.28em', textTransform: 'uppercase', color: '#C9A84C', marginBottom: '0.75rem', fontFamily: 'var(--font-sans), sans-serif' }}>Studio Hours</h4>
              <p style={{ fontSize: '0.83rem', color: '#B5AFA8', fontFamily: 'var(--font-sans), sans-serif', fontWeight: 300, lineHeight: 1.9 }}>
                Mon – Fri: 9am – 6pm<br />Sat: By Appointment<br />Sun: Closed
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{ borderTop: '1px solid #2A1E14', padding: '1.25rem 2rem', maxWidth: 1400, margin: '0 auto' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '1rem' }}>
          <p style={{ fontSize: '0.6rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#4A3E32', fontFamily: 'var(--font-sans), sans-serif' }}>
            &copy; {new Date().getFullYear()} Emmeli Experience. All rights reserved.
          </p>
          <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
            {['Privacy Policy', 'Terms of Service'].map((t) => (
              <a key={t} href="#" style={{ fontSize: '0.6rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#4A3E32', fontFamily: 'var(--font-sans), sans-serif', transition: 'color 0.3s ease' }}>{t}</a>
            ))}
            {/* Divider */}
            <span style={{ display: 'inline-block', width: 1, height: 12, background: '#2A1E14' }} />
            {/* Client Area */}
            <Link
              href="/dashboard"
              style={{
                fontSize: '0.6rem',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: '#B5AFA8',
                fontFamily: 'var(--font-sans), sans-serif',
                transition: 'color 0.3s ease',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
              }}
            >
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
              </svg>
              Client Area
            </Link>
            {/* Divider */}
            <span style={{ display: 'inline-block', width: 1, height: 12, background: '#2A1E14' }} />
            {/* Admin Portal */}
            <Link
              href="/admin"
              style={{
                fontSize: '0.6rem',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: '#C9A84C',
                fontFamily: 'var(--font-sans), sans-serif',
                transition: 'color 0.3s ease',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
              }}
            >
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
              Admin Portal
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
