'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'

const allWeddings = [
  {
    id: 1, title: 'Sophia & James', venue: 'Park Chateau Estate', style: 'Garden Romance', season: 'Fall',
    image: 'https://images.unsplash.com/photo-1606800052052-a08af7148866?w=800&h=1000&fit=crop',
    alt: 'Sophia and James outdoor ceremony with ivory lace gown and floral arch', tall: true,
  },
  {
    id: 2, title: 'Elena & Marcus', venue: 'The Grand Ballroom', style: 'Black Tie Elegance', season: 'Summer',
    image: 'https://images.unsplash.com/photo-1470116945706-e6bf5d5a53ca?w=800&h=600&fit=crop',
    alt: 'Elena and Marcus black tie ballroom reception with gold chandeliers', tall: false,
  },
  {
    id: 3, title: 'Amara & Daniel', venue: 'Natirar Mansion', style: 'Rustic Luxe', season: 'Fall',
    image: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=800&h=800&fit=crop',
    alt: 'Amara and Daniel rustic luxury wedding at Natirar Mansion', tall: false,
  },
  {
    id: 4, title: 'Claire & William', venue: 'Liberty House', style: 'Modern Minimalist', season: 'Spring',
    image: 'https://images.unsplash.com/photo-1529636798458-92182e662485?w=800&h=1000&fit=crop',
    alt: 'Claire and William modern wedding at Liberty House with city backdrop', tall: true,
  },
  {
    id: 5, title: 'Priya & Rohan', venue: "Nanina's In The Park", style: 'South Asian Fusion', season: 'Spring',
    image: 'https://images.unsplash.com/photo-1507504031003-b417219a0fde?w=800&h=600&fit=crop',
    alt: 'Priya and Rohan South Asian fusion wedding with vibrant marigold garlands', tall: false,
  },
  {
    id: 6, title: 'Natalie & Ryan', venue: 'Crossed Keys Inn', style: 'Vintage Romantic', season: 'Summer',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&h=1000&fit=crop',
    alt: 'Natalie and Ryan vintage romantic wedding at Crossed Keys Inn', tall: true,
  },
  {
    id: 7, title: 'Jasmine & Thomas', venue: 'The Madison Hotel', style: 'Classic Luxury', season: 'Winter',
    image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&h=600&fit=crop',
    alt: 'Jasmine and Thomas classic luxury winter wedding in hotel ballroom', tall: false,
  },
  {
    id: 8, title: 'Mei & David', venue: 'Skylands Manor', style: 'Garden Romance', season: 'Spring',
    image: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=800&h=800&fit=crop',
    alt: 'Mei and David spring garden wedding at Skylands Manor', tall: false,
  },
  {
    id: 9, title: 'Layla & Marcus', venue: 'Teterboro Airport Hangar', style: 'Modern Minimalist', season: 'Fall',
    image: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=800&h=1000&fit=crop',
    alt: 'Layla and Marcus industrial chic wedding with dramatic lighting', tall: true,
  },
]

const styles  = ['All', 'Garden Romance', 'Black Tie Elegance', 'Rustic Luxe', 'Modern Minimalist', 'South Asian Fusion', 'Vintage Romantic', 'Classic Luxury']
const seasons = ['All', 'Spring', 'Summer', 'Fall', 'Winter']

export default function PortfolioPage() {
  const [styleFilter, setStyleFilter]   = useState('All')
  const [seasonFilter, setSeasonFilter] = useState('All')
  const [lightbox, setLightbox]         = useState<number | null>(null)
  const pageRef = useRef<HTMLDivElement>(null)

  const filtered = allWeddings.filter((w) => {
    if (styleFilter  !== 'All' && w.style  !== styleFilter)  return false
    if (seasonFilter !== 'All' && w.season !== seasonFilter) return false
    return true
  })

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightbox(null)
      if (e.key === 'ArrowRight' && lightbox !== null)
        setLightbox((l) => l !== null ? (l + 1) % filtered.length : null)
      if (e.key === 'ArrowLeft' && lightbox !== null)
        setLightbox((l) => l !== null ? (l - 1 + filtered.length) % filtered.length : null)
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [lightbox, filtered.length])

  const selectStyle: React.CSSProperties = {
    background: '#FFFDF7',
    border: '1px solid #E2D9CC',
    color: '#2C2C2C',
    fontFamily: 'var(--font-jost)',
    fontWeight: 300,
    fontSize: '0.78rem',
    letterSpacing: '0.04em',
    padding: '0.7rem 2.5rem 0.7rem 1rem',
    appearance: 'none',
    cursor: 'pointer',
    outline: 'none',
    minWidth: 180,
  }

  return (
    <div ref={pageRef}>

      {/* ── PAGE HERO ── */}
      <section
        className="relative"
        style={{
          minHeight: '70vh',
          background: '#1C1610',
          paddingTop: 'calc(76px + 7rem)',
          paddingBottom: '7rem',
          paddingLeft: 'clamp(1.5rem, 6vw, 7rem)',
          paddingRight: 'clamp(1.5rem, 6vw, 7rem)',
        }}
      >
        <img
          src="https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=1920&h=900&fit=crop"
          alt="Portfolio of luxury New Jersey weddings"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ opacity: 0.22 }}
        />
        <div className="relative z-10" style={{ maxWidth: 760 }}>
          <div className="flex items-center gap-3 mb-8">
            <div className="h-px w-10" style={{ background: '#C9A84C' }} />
            <span className="text-[0.6rem] tracking-[0.4em] uppercase" style={{ color: '#C9A84C', fontFamily: 'var(--font-jost)' }}>
              Our Portfolio
            </span>
          </div>
          <h1
            style={{
              fontFamily: 'var(--font-playfair)',
              color: '#FFFDF7',
              fontSize: 'clamp(3rem, 8vw, 6.5rem)',
              lineHeight: 1.05,
              fontWeight: 400,
            }}
          >
            Real Weddings,<br />
            <em style={{ color: '#C9A84C' }}>Real Magic</em>
          </h1>
          <p
            style={{
              color: '#B5AFA8',
              fontFamily: 'var(--font-jost)',
              fontWeight: 300,
              lineHeight: 1.9,
              fontSize: '1rem',
              maxWidth: 500,
              marginTop: '2rem',
            }}
          >
            A curated selection of the weddings we&apos;ve had the privilege of bringing to life across
            New Jersey and beyond.
          </p>
        </div>
      </section>

      {/* ── FILTER BAR ── */}
      <div
        style={{
          position: 'sticky',
          top: 76,
          zIndex: 40,
          background: '#FFFDF7',
          borderBottom: '1px solid #E2D9CC',
          padding: '1.25rem clamp(1.5rem, 6vw, 7rem)',
        }}
      >
        <div
          style={{
            maxWidth: 1300,
            margin: '0 auto',
            display: 'flex',
            flexWrap: 'wrap',
            gap: '1.25rem',
            alignItems: 'flex-end',
          }}
        >
          {/* Style filter */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
            <span style={{ fontFamily: 'var(--font-jost)', color: '#C9A84C', fontSize: '0.55rem', letterSpacing: '0.3em', textTransform: 'uppercase' }}>
              Style
            </span>
            <div style={{ position: 'relative' }}>
              <select style={selectStyle} value={styleFilter} onChange={(e) => setStyleFilter(e.target.value)}>
                {styles.map((s) => <option key={s}>{s}</option>)}
              </select>
              <span style={{ position: 'absolute', right: '0.85rem', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: '#C9A84C', fontSize: 10 }}>▾</span>
            </div>
          </div>

          {/* Season filter */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
            <span style={{ fontFamily: 'var(--font-jost)', color: '#C9A84C', fontSize: '0.55rem', letterSpacing: '0.3em', textTransform: 'uppercase' }}>
              Season
            </span>
            <div style={{ position: 'relative' }}>
              <select style={selectStyle} value={seasonFilter} onChange={(e) => setSeasonFilter(e.target.value)}>
                {seasons.map((s) => <option key={s}>{s}</option>)}
              </select>
              <span style={{ position: 'absolute', right: '0.85rem', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: '#C9A84C', fontSize: 10 }}>▾</span>
            </div>
          </div>

          {/* Clear */}
          <button
            onClick={() => { setStyleFilter('All'); setSeasonFilter('All') }}
            style={{
              fontFamily: 'var(--font-jost)',
              color: '#B5AFA8',
              fontSize: '0.6rem',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              borderBottom: '1px solid #B5AFA8',
              paddingBottom: '0.15rem',
              background: 'none',
              border: 'none',
              borderBottom: '1px solid #B5AFA8',
              cursor: 'pointer',
              alignSelf: 'flex-end',
              marginBottom: '0.15rem',
            } as React.CSSProperties}
          >
            Clear
          </button>

          {/* Count */}
          <span
            style={{
              fontFamily: 'var(--font-jost)',
              color: '#B5AFA8',
              fontSize: '0.75rem',
              fontWeight: 300,
              marginLeft: 'auto',
              alignSelf: 'flex-end',
              marginBottom: '0.1rem',
            }}
          >
            {filtered.length} {filtered.length === 1 ? 'wedding' : 'weddings'}
          </span>
        </div>
      </div>

      {/* ── GALLERY ── */}
      <section
        style={{
          background: '#FAF6EF',
          paddingTop: '4rem',
          paddingBottom: '6rem',
          paddingLeft: 'clamp(1.5rem, 6vw, 7rem)',
          paddingRight: 'clamp(1.5rem, 6vw, 7rem)',
        }}
      >
        <div style={{ maxWidth: 1300, margin: '0 auto' }}>
          {filtered.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '6rem 0' }}>
              <p style={{ fontFamily: 'var(--font-playfair)', color: '#2C2C2C', fontSize: '1.5rem', marginBottom: '1.5rem' }}>
                No weddings match your filters
              </p>
              <button
                onClick={() => { setStyleFilter('All'); setSeasonFilter('All') }}
                className="btn-outline-gold"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <div
              style={{
                columns: '1',
                columnGap: '1.25rem',
              }}
              className="sm:columns-2 lg:columns-3"
            >
              {filtered.map((wedding, i) => (
                <div
                  key={wedding.id}
                  style={{
                    breakInside: 'avoid',
                    marginBottom: '1.25rem',
                  }}
                >
                  <div
                    className="group"
                    style={{
                      position: 'relative',
                      overflow: 'hidden',
                      cursor: 'pointer',
                      border: '1px solid #E2D9CC',
                    }}
                    onClick={() => setLightbox(i)}
                    role="button"
                    tabIndex={0}
                    aria-label={`View ${wedding.title}`}
                    onKeyDown={(e) => e.key === 'Enter' && setLightbox(i)}
                  >
                    <img
                      src={wedding.image}
                      alt={wedding.alt}
                      style={{
                        width: '100%',
                        height: wedding.tall ? 500 : 320,
                        objectFit: 'cover',
                        display: 'block',
                        transition: 'transform 0.7s cubic-bezier(0.16,1,0.3,1)',
                      }}
                      className="group-hover:scale-105"
                    />
                    {/* Hover overlay */}
                    <div
                      className="group-hover:opacity-100"
                      style={{
                        position: 'absolute',
                        inset: 0,
                        background: 'linear-gradient(to top, rgba(28,22,18,0.88) 0%, transparent 55%)',
                        opacity: 0,
                        transition: 'opacity 0.45s ease',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'flex-end',
                        padding: '1.5rem',
                      }}
                    >
                      <div style={{ width: 24, height: 1, background: '#C9A84C', marginBottom: '0.75rem' }} />
                      <p style={{ fontFamily: 'var(--font-playfair)', color: '#FFFDF7', fontSize: '1.05rem', marginBottom: '0.3rem' }}>
                        {wedding.title}
                      </p>
                      <p style={{ fontFamily: 'var(--font-jost)', color: '#E2C97E', fontSize: '0.6rem', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
                        {wedding.venue} &middot; {wedding.style}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── CTA ── */}
      <section
        style={{
          background: '#FFFDF7',
          padding: '6rem clamp(1.5rem, 6vw, 7rem)',
          textAlign: 'center',
          borderTop: '1px solid #E2D9CC',
        }}
      >
        <div style={{ maxWidth: 560, margin: '0 auto' }}>
          <h2
            style={{
              fontFamily: 'var(--font-playfair)',
              color: '#2C2C2C',
              fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)',
              fontWeight: 400,
              lineHeight: 1.2,
              marginBottom: '1.5rem',
            }}
          >
            Ready to Create Your Own<br />
            <em className="gold-text">Love Story?</em>
          </h2>
          <p
            style={{
              color: '#7A7068',
              fontFamily: 'var(--font-jost)',
              fontWeight: 300,
              lineHeight: 1.9,
              fontSize: '0.9rem',
              marginBottom: '2.5rem',
            }}
          >
            Join over 300 couples who trusted Veil &amp; Bloom to bring their wedding vision to life.
          </p>
          <Link href="/booking" className="btn-gold">
            Start Planning Your Wedding
          </Link>
        </div>
      </section>

      {/* ── LIGHTBOX ── */}
      {lightbox !== null && filtered[lightbox] && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 100,
            background: 'rgba(16,12,8,0.97)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onClick={() => setLightbox(null)}
        >
          <button
            onClick={() => setLightbox(null)}
            aria-label="Close"
            style={{
              position: 'absolute', top: '1.25rem', right: '1.25rem',
              background: 'none', border: 'none', color: '#F5E6C8', cursor: 'pointer', padding: '0.5rem',
            }}
          >
            <X size={26} />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); setLightbox((l) => l !== null ? (l - 1 + filtered.length) % filtered.length : null) }}
            aria-label="Previous"
            style={{
              position: 'absolute', left: '1.25rem', top: '50%', transform: 'translateY(-50%)',
              background: 'none', border: 'none', color: '#F5E6C8', cursor: 'pointer', padding: '0.5rem',
            }}
          >
            <ChevronLeft size={36} />
          </button>

          <div
            style={{ maxWidth: '85vw', maxHeight: '90vh', padding: '0 4rem' }}
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={filtered[lightbox].image}
              alt={filtered[lightbox].alt}
              style={{ maxWidth: '100%', maxHeight: '72vh', objectFit: 'contain', display: 'block', margin: '0 auto' }}
            />
            <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
              <h3 style={{ fontFamily: 'var(--font-playfair)', color: '#F5E6C8', fontSize: '1.5rem', fontWeight: 400, marginBottom: '0.4rem' }}>
                {filtered[lightbox].title}
              </h3>
              <p style={{ fontFamily: 'var(--font-jost)', color: '#C9A84C', fontSize: '0.6rem', letterSpacing: '0.2em', textTransform: 'uppercase' }}>
                {filtered[lightbox].venue} &middot; {filtered[lightbox].style} &middot; {filtered[lightbox].season}
              </p>
            </div>
          </div>

          <button
            onClick={(e) => { e.stopPropagation(); setLightbox((l) => l !== null ? (l + 1) % filtered.length : null) }}
            aria-label="Next"
            style={{
              position: 'absolute', right: '1.25rem', top: '50%', transform: 'translateY(-50%)',
              background: 'none', border: 'none', color: '#F5E6C8', cursor: 'pointer', padding: '0.5rem',
            }}
          >
            <ChevronRight size={36} />
          </button>
        </div>
      )}

    </div>
  )
}
