'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { ChevronDown, ArrowRight, Star, Check } from 'lucide-react'

const services = [
  { num: '01', title: 'Full Wedding Planning', desc: 'End-to-end design and management of your entire wedding journey — from first vision to final farewell.', img: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=600&h=750&fit=crop' },
  { num: '02', title: 'Partial Planning', desc: 'You have started the process. We step in to refine, coordinate, and elevate every element you need support with.', img: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=600&h=750&fit=crop' },
  { num: '03', title: 'Day-of Coordination', desc: 'Your vision, perfectly executed. We manage every timeline, vendor, and detail so you can be fully present.', img: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=600&h=750&fit=crop' },
  { num: '04', title: 'Destination Weddings', desc: 'Dream beyond New Jersey. Intimate vineyard ceremonies, coastal celebrations, or European escapes — all impeccably planned.', img: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=600&h=750&fit=crop' },
]

const gallery = [
  { src: 'https://images.unsplash.com/photo-1606800052052-a08af7148866?w=560&h=700&fit=crop', label: 'Garden Estate · Peapack, NJ', tall: true },
  { src: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?w=560&h=360&fit=crop', label: 'Detail', tall: false },
  { src: 'https://images.unsplash.com/photo-1470116945706-e6bf5d5a53ca?w=560&h=360&fit=crop', label: 'Grand Ballroom · Florham Park, NJ', tall: false },
  { src: 'https://images.unsplash.com/photo-1529636798458-92182e662485?w=560&h=700&fit=crop', label: 'Vineyard · Hunterdon County, NJ', tall: true },
  { src: 'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=560&h=360&fit=crop', label: 'Sweet Table', tall: false },
  { src: 'https://images.unsplash.com/photo-1507504031003-b417219a0fde?w=560&h=360&fit=crop', label: 'Reception · Princeton, NJ', tall: false },
]

const testimonials = [
  { name: 'Sophia & James L.', venue: 'Park Chateau Estate, NJ', quote: 'Veil & Bloom transformed our dream into a reality more stunning than we could have ever imagined. Every single moment felt like a scene from a film.', year: '2024' },
  { name: 'Natalie & Marcus W.', venue: 'The Ryland Inn, NJ', quote: 'Working with the V&B team was like having a fairy godmother. They handled everything with such elegance and expertise. Our guests are still talking about it.', year: '2024' },
  { name: 'Claire & Ethan K.', venue: 'Pleasantdale Chateau, NJ', quote: 'The most stress-free, beautiful day of our lives. The planning process itself felt like a luxury experience. We are forever grateful.', year: '2023' },
]

const steps = [
  { num: '01', title: 'Discovery Call', desc: 'We learn your vision, values, and love story. This is where the magic begins.' },
  { num: '02', title: 'Design & Concept', desc: 'We craft a personalised concept — mood boards, palettes, and aesthetic direction.' },
  { num: '03', title: 'Vendor Curation', desc: "Access our curated network of NJ's finest photographers, florists and caterers." },
  { num: '04', title: 'Full Coordination', desc: 'We manage every detail, timeline, and communication so nothing falls through the cracks.' },
  { num: '05', title: 'Your Perfect Day', desc: 'Relax, be present, and let us orchestrate every breathtaking moment of your celebration.' },
]

const stats = [
  { value: '200+', label: 'Weddings Planned' },
  { value: '12+', label: 'Years of Excellence' },
  { value: '98%', label: 'Client Satisfaction' },
  { value: '50+', label: 'Trusted Vendors' },
]

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.js-reveal')
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target) } })
    }, { threshold: 0.12 })
    els.forEach((el) => obs.observe(el))
    return () => obs.disconnect()
  }, [])
}

export default function HomePage() {
  const heroRef = useRef<HTMLDivElement>(null)
  const [heroIn, setHeroIn] = useState(false)
  const [activeT, setActiveT] = useState(0)
  useReveal()

  useEffect(() => { const t = setTimeout(() => setHeroIn(true), 100); return () => clearTimeout(t) }, [])
  useEffect(() => { const t = setInterval(() => setActiveT(p => (p + 1) % testimonials.length), 5500); return () => clearInterval(t) }, [])
  useEffect(() => {
    const el = heroRef.current; if (!el) return
    const fn = () => { el.style.transform = `translateY(${window.scrollY * 0.28}px)` }
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  return (
    <>
      {/* ── HERO ── */}
      <section style={{ position: 'relative', height: '100vh', minHeight: 680, overflow: 'hidden', marginTop: -76 }}>
        <div ref={heroRef} style={{ position: 'absolute', inset: 0, willChange: 'transform' }}>
          <img
            src="https://images.unsplash.com/photo-1519741497674-611481863552?w=1920&h=1080&fit=crop"
            alt="Cinematic luxury wedding ceremony in a New Jersey grand ballroom"
            style={{ width: '100%', height: '100%', objectFit: 'cover', transform: 'scale(1.1)' }}
          />
        </div>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(28,22,16,0.15) 0%, rgba(28,22,16,0.52) 55%, rgba(28,22,16,0.88) 100%)' }} />
        <div style={{ position: 'relative', zIndex: 10, height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '0 1.5rem' }}>
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.62rem', letterSpacing: '0.44em', textTransform: 'uppercase', color: '#E2C97E', marginBottom: '1.75rem', opacity: heroIn ? 1 : 0, transform: heroIn ? 'translateY(0)' : 'translateY(20px)', transition: 'all 1s ease 0.2s' }}>
            Luxury Event &amp; Wedding Planning
          </p>
          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2.8rem, 8vw, 5.5rem)', color: '#FFFDF7', lineHeight: 1.06, maxWidth: '880px', marginBottom: '1.75rem', opacity: heroIn ? 1 : 0, transform: heroIn ? 'translateY(0)' : 'translateY(40px)', transition: 'all 1s ease 0.42s' }}>
            The <em className="gold-shimmer">Emmeli</em><br />
            Experience
          </h1>
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: '1rem', color: 'rgba(245,230,200,0.8)', maxWidth: 460, marginBottom: '2.5rem', lineHeight: 1.8, opacity: heroIn ? 1 : 0, transform: heroIn ? 'translateY(0)' : 'translateY(30px)', transition: 'all 1s ease 0.64s' }}>
            By Mr &amp; Mrs Ogedegbe — crafting cinematic, emotion-filled celebrations that tell your most authentic story.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center', opacity: heroIn ? 1 : 0, transform: heroIn ? 'translateY(0)' : 'translateY(30px)', transition: 'all 1s ease 0.86s' }}>
            <Link href="/booking" className="btn-gold"><span>Start Planning</span></Link>
            <Link href="/portfolio" className="btn-ivory"><span>View Our Work</span></Link>
          </div>
        </div>
        <div className="animate-float" style={{ position: 'absolute', bottom: 32, left: '50%', transform: 'translateX(-50%)', zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
          <span style={{ fontSize: '0.55rem', letterSpacing: '0.32em', textTransform: 'uppercase', color: '#E2C97E', fontFamily: 'var(--font-sans)' }}>Scroll</span>
          <ChevronDown size={14} color="#E2C97E" />
        </div>
      </section>

      {/* ── STATS ── */}
      <section style={{ background: '#2C2C2C', padding: '5rem 3rem' }}>
        <div style={{ maxWidth: 1400, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: '3rem' }} className="lg:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} style={{ textAlign: 'center' }}>
              <div className="gold-text" style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.8rem,4vw,2.5rem)', marginBottom: 4 }}>{s.value}</div>
              <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.62rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: '#B5AFA8' }}>{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section style={{ padding: '9rem 3rem', background: '#FFFDF7' }}>
        <div style={{ maxWidth: 1400, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr', gap: '6rem', alignItems: 'center' }} className="lg:grid-cols-2">
          <div className="js-reveal reveal-left" style={{ position: 'relative' }}>
            <div className="img-zoom" style={{ overflow: 'hidden', aspectRatio: '4/5' }}>
              <img src="https://images.unsplash.com/photo-1591604466107-ec97de577aff?w=700&h=875&fit=crop" alt="Veil and Bloom wedding planner with couple in New Jersey studio" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <div style={{ position: 'absolute', bottom: -28, right: -16, background: '#2C2C2C', padding: '1.5rem 2rem', boxShadow: '0 20px 60px rgba(0,0,0,0.18)' }}>
              <p style={{ fontFamily: 'var(--font-serif)', fontSize: '1.9rem', color: '#F5E6C8', lineHeight: 1 }}>12+</p>
              <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.58rem', letterSpacing: '0.26em', textTransform: 'uppercase', color: '#C9A84C', marginTop: 4 }}>Years of Excellence</p>
            </div>
          </div>
          <div className="js-reveal reveal-right" style={{ paddingTop: '2rem' }}>
            <div className="divider-gold">
              <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.6rem', letterSpacing: '0.35em', textTransform: 'uppercase', color: '#C9A84C', whiteSpace: 'nowrap' }}>Our Story</span>
            </div>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2rem,4vw,3rem)', color: '#2C2C2C', lineHeight: 1.18, marginBottom: '1.5rem', marginTop: '0.75rem' }}>
              Every Celebration Deserves a <em className="gold-text">Signature Touch</em>
            </h2>
            <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.88rem', color: '#7A7068', lineHeight: 1.9, marginBottom: '1rem', fontWeight: 300 }}>
              Founded by Mr &amp; Mrs Emmanuel and Melisa Ogedegbe, Emmeli Experience was born from a deep passion for love, design, and the art of storytelling. We are a boutique event planning team who believe your day should feel as emotionally rich as it looks beautiful.
            </p>
            <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.88rem', color: '#7A7068', lineHeight: 1.9, marginBottom: '2.5rem', fontWeight: 300 }}>
              With over 200 events planned across New Jersey&apos;s most coveted venues, we bring unparalleled expertise, a curated vendor network, and genuine care to every celebration we touch.
            </p>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '2.5rem' }}>
              {['Boutique, personalised approach', 'Premier vendor network', 'Cinematic design philosophy', 'White-glove client experience'].map((item) => (
                <li key={item} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontFamily: 'var(--font-sans)', fontSize: '0.82rem', color: '#2C2C2C' }}>
                  <Check size={13} color="#C9A84C" strokeWidth={2.5} style={{ flexShrink: 0 }} />{item}
                </li>
              ))}
            </ul>
            <Link href="/about" className="btn-outline-gold"><span>Our Full Story</span></Link>
          </div>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section style={{ padding: '9rem 3rem', background: '#FAF6EF' }}>
        <div style={{ maxWidth: 1400, margin: '0 auto' }}>
          <div className="js-reveal reveal" style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <div className="divider-gold" style={{ justifyContent: 'center' }}>
              <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.6rem', letterSpacing: '0.35em', textTransform: 'uppercase', color: '#C9A84C', whiteSpace: 'nowrap' }}>What We Offer</span>
            </div>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2rem,4vw,3rem)', color: '#2C2C2C', marginTop: '0.75rem' }}>
              Services Crafted for Every Chapter of <em className="gold-text">Your Story</em>
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))', gap: '1.5rem' }}>
            {services.map((svc, i) => (
              <div key={svc.num} className="js-reveal reveal card-luxury" style={{ background: '#FFFDF7', transitionDelay: `${i * 100}ms`, display: 'flex', flexDirection: 'column' }}>
                <div className="img-zoom" style={{ overflow: 'hidden', aspectRatio: '3/4' }}>
                  <img src={svc.img} alt={svc.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.57rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#C9A84C', marginBottom: '0.5rem' }}>{svc.num}</p>
                  <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.2rem', color: '#2C2C2C', marginBottom: '0.75rem' }}>{svc.title}</h3>
                  <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.8rem', color: '#7A7068', lineHeight: 1.8, flex: 1, fontWeight: 300, marginBottom: '1.25rem' }}>{svc.desc}</p>
                  <Link href="/services" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', fontFamily: 'var(--font-sans)', fontSize: '0.63rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#C9A84C' }}>
                    Learn More <ArrowRight size={11} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
          <div className="js-reveal reveal" style={{ textAlign: 'center', marginTop: '3.5rem' }}>
            <Link href="/services" className="btn-outline-gold"><span>View All Services</span></Link>
          </div>
        </div>
      </section>

      {/* ── GALLERY ── */}
      <section style={{ padding: '9rem 3rem', background: '#FFFDF7' }}>
        <div style={{ maxWidth: 1400, margin: '0 auto' }}>
          <div className="js-reveal reveal" style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-end', justifyContent: 'space-between', gap: '1.5rem', marginBottom: '3.5rem' }}>
            <div>
              <div className="divider-gold">
                <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.6rem', letterSpacing: '0.35em', textTransform: 'uppercase', color: '#C9A84C', whiteSpace: 'nowrap' }}>Our Portfolio</span>
              </div>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2rem,4vw,3rem)', color: '#2C2C2C', marginTop: '0.75rem' }}>
                Featured <em className="gold-text">Celebrations</em>
              </h2>
            </div>
            <Link href="/portfolio" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', fontFamily: 'var(--font-sans)', fontSize: '0.63rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: '#C9A84C', borderBottom: '1px solid rgba(201,168,76,0.4)', paddingBottom: 2 }}>
              View Full Portfolio <ArrowRight size={11} />
            </Link>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.75rem' }} className="lg:grid-cols-3">
            {gallery.map((img, i) => (
              <div key={i} className="js-reveal reveal img-zoom" style={{ position: 'relative', overflow: 'hidden', aspectRatio: img.tall ? '3/4' : '4/3', cursor: 'pointer', transitionDelay: `${i * 80}ms` }}>
                <img src={img.src} alt={img.label} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <div style={{ position: 'absolute', inset: 0, background: 'rgba(28,22,16,0)', display: 'flex', alignItems: 'flex-end', padding: '1.25rem', transition: 'background 0.5s ease' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.background = 'rgba(28,22,16,0.5)'; (e.currentTarget.querySelector('p') as HTMLElement).style.opacity = '1' }}
                  onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.background = 'rgba(28,22,16,0)'; (e.currentTarget.querySelector('p') as HTMLElement).style.opacity = '0' }}>
                  <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.63rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: '#FFFDF7', opacity: 0, transition: 'opacity 0.4s ease' }}>{img.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PARALLAX QUOTE ── */}
      <section style={{ position: 'relative', padding: '10rem 1.5rem', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0 }}>
          <img src="https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=1920&h=800&fit=crop" alt="Romantic outdoor wedding reception at twilight" className="animate-pan" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(28,22,16,0.68)' }} />
        </div>
        <div className="js-reveal reveal" style={{ position: 'relative', zIndex: 10, textAlign: 'center', maxWidth: 760, margin: '0 auto' }}>
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.62rem', letterSpacing: '0.42em', textTransform: 'uppercase', color: '#E2C97E', marginBottom: '1.5rem' }}>Our Philosophy</p>
          <blockquote style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.6rem,3.5vw,2.5rem)', color: '#FFFDF7', lineHeight: 1.4, marginBottom: '2rem', fontStyle: 'italic' }}>
            &ldquo;A wedding is not an event. It is the opening chapter of your greatest love story.&rdquo;
          </blockquote>
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.7rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#E2C97E' }}>
            — Mr &amp; Mrs Ogedegbe, Founders · Emmeli Experience
          </p>
        </div>
      </section>

      {/* ── PROCESS ── */}
      <section style={{ padding: '9rem 3rem', background: '#FAF6EF' }}>
        <div style={{ maxWidth: 1400, margin: '0 auto' }}>
          <div className="js-reveal reveal" style={{ textAlign: 'center', marginBottom: '5rem' }}>
            <div className="divider-gold" style={{ justifyContent: 'center' }}>
              <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.6rem', letterSpacing: '0.35em', textTransform: 'uppercase', color: '#C9A84C', whiteSpace: 'nowrap' }}>How We Work</span>
            </div>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2rem,4vw,3rem)', color: '#2C2C2C', marginTop: '0.75rem' }}>
              The Emmeli <em className="gold-text">Experience</em>
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '2.5rem' }}>
            {steps.map((step, i) => (
              <div key={step.num} className="js-reveal reveal" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', transitionDelay: `${i * 100}ms` }}>
                <div style={{ width: 80, height: 80, borderRadius: '50%', border: '1px solid rgba(201,168,76,0.4)', background: '#FFFDF7', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
                  <span className="gold-text" style={{ fontFamily: 'var(--font-serif)', fontSize: '1.1rem' }}>{step.num}</span>
                </div>
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.1rem', color: '#2C2C2C', marginBottom: '0.75rem' }}>{step.title}</h3>
                <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.78rem', color: '#7A7068', lineHeight: 1.75, fontWeight: 300 }}>{step.desc}</p>
              </div>
            ))}
          </div>
          <div className="js-reveal reveal" style={{ textAlign: 'center', marginTop: '4rem' }}>
            <Link href="/booking" className="btn-gold"><span>Begin Your Journey</span></Link>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section style={{ padding: '9rem 3rem', background: '#2C2C2C' }}>
        <div style={{ maxWidth: 960, margin: '0 auto' }}>
          <div className="js-reveal reveal" style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <div className="divider-gold" style={{ justifyContent: 'center' }}>
              <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.6rem', letterSpacing: '0.35em', textTransform: 'uppercase', color: '#C9A84C', whiteSpace: 'nowrap' }}>Love Notes</span>
            </div>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2rem,4vw,3rem)', color: '#F5E6C8', marginTop: '0.75rem' }}>
              Words from Our <em className="gold-shimmer">Happy Couples</em>
            </h2>
          </div>
          <div style={{ overflow: 'hidden' }}>
            <div style={{ display: 'flex', transition: 'transform 0.7s cubic-bezier(0.16,1,0.3,1)', transform: `translateX(-${activeT * 100}%)` }}>
              {testimonials.map((t) => (
                <div key={t.name} style={{ minWidth: '100%', textAlign: 'center', padding: '0 1rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'center', gap: 4, marginBottom: '1.75rem' }}>
                    {Array.from({ length: 5 }).map((_, i) => <Star key={i} size={13} fill="#C9A84C" color="#C9A84C" />)}
                  </div>
                  <blockquote style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.1rem,2.5vw,1.5rem)', color: '#F5E6C8', fontStyle: 'italic', lineHeight: 1.65, marginBottom: '2rem' }}>
                    &ldquo;{t.quote}&rdquo;
                  </blockquote>
                  <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.7rem', letterSpacing: '0.26em', textTransform: 'uppercase', color: '#C9A84C', marginBottom: 4 }}>{t.name}</p>
                  <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.66rem', color: '#7A7068' }}>{t.venue} · {t.year}</p>
                </div>
              ))}
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginTop: '2.5rem' }}>
            {testimonials.map((_, i) => (
              <button key={i} onClick={() => setActiveT(i)} aria-label={`Testimonial ${i + 1}`}
                style={{ borderRadius: 9999, height: 6, transition: 'all 0.4s ease', background: i === activeT ? '#C9A84C' : '#5C5248', width: i === activeT ? 32 : 8 }} />
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section style={{ position: 'relative', padding: '10rem 1.5rem', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0 }}>
          <img src="https://images.unsplash.com/photo-1550005809-91ad75fb315f?w=1920&h=700&fit=crop" alt="Wedding couple first look at golden hour in New Jersey garden estate" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(28,22,16,0.92) 0%, rgba(28,22,16,0.55) 60%, rgba(28,22,16,0.1) 100%)' }} />
        </div>
        <div style={{ position: 'relative', zIndex: 10, maxWidth: 1400, margin: '0 auto' }}>
          <div className="js-reveal reveal" style={{ maxWidth: 560 }}>
            <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.62rem', letterSpacing: '0.42em', textTransform: 'uppercase', color: '#E2C97E', marginBottom: '1.25rem' }}>Ready to Begin?</p>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2.2rem,5vw,3.8rem)', color: '#FFFDF7', lineHeight: 1.1, marginBottom: '1.5rem' }}>
              Let&apos;s Create Something <em className="gold-shimmer">Extraordinary</em>
            </h2>
            <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.88rem', color: 'rgba(245,230,200,0.75)', lineHeight: 1.9, marginBottom: '2.5rem', fontWeight: 300 }}>
              Consultations are intimate, no-pressure conversations about your vision. We would love to hear your story.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
              <Link href="/booking" className="btn-gold"><span>Book a Consultation</span></Link>
              <Link href="/contact" className="btn-ivory"><span>Get in Touch</span></Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
