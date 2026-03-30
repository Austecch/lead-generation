'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { Check } from 'lucide-react'

const services = [
  {
    id: 'full-planning',
    tag: 'Most Comprehensive',
    title: 'Full Event Planning',
    subtitle: 'From the first spark to the final farewell',
    description:
      'Our signature full planning experience is a complete, start-to-finish partnership. We immerse ourselves in your vision from the very first consultation and remain by your side through every milestone — securing the perfect venue, curating an elite vendor team, designing every visual element, and flawlessly orchestrating your event day.',
    image: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=900&h=700&fit=crop',
    alt: 'Full event planning ceremony setup with elegant florals',
    priceHint: 'Starting at $8,500',
    features: [
      'Unlimited planning meetings & consultations',
      'Complete venue sourcing & contract review',
      'Full vendor team curation & negotiation',
      'Custom design concept & mood board',
      'Budget creation & management',
      'Guest experience coordination',
      'Rehearsal & rehearsal dinner planning',
      'Full event day management (12 hrs)',
    ],
    reverse: false,
  },
  {
    id: 'partial-planning',
    tag: 'Flexible Partnership',
    title: 'Partial Planning',
    subtitle: 'Already started? Let us elevate what you have.',
    description:
      'The Partial Planning package is designed for clients who have made some key decisions but need an expert to refine the vision, close the vendor gaps, and ensure everything comes together seamlessly. We step in where you need us most, providing structure, design guidance, and professional oversight.',
    image: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=900&h=700&fit=crop',
    alt: 'Event planner reviewing layout plans with couple',
    priceHint: 'Starting at $4,500',
    features: [
      'Up to 12 planning meetings',
      'Vendor recommendations & booking assistance',
      'Design concept refinement',
      'Month-of planning & logistics',
      'Final vendor confirmations',
      'Detailed day-of timeline',
      'Rehearsal coordination',
      'Full event day management (10 hrs)',
    ],
    reverse: true,
  },
  {
    id: 'day-of',
    tag: 'Stress-Free',
    title: 'Day-of Coordination',
    subtitle: 'Your vision. Our execution. Your presence.',
    description:
      "You have planned every detail — now let us take the reins so you can breathe, be present, and enjoy every moment. Our Day-of Coordination begins 6 weeks before your event, allowing us to deeply understand your plans, confirm all vendors, and create a seamless timeline that ensures everything unfolds exactly as you envisioned.",
    image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=900&h=700&fit=crop',
    alt: 'Event ceremony in an elegant venue with white florals',
    priceHint: 'Starting at $2,200',
    features: [
      '6-week lead-in planning sessions',
      'Vendor contact collection & confirmations',
      'Detailed timeline creation',
      'Ceremony rehearsal direction',
      'Venue setup oversight',
      'Full event day management (10 hrs)',
      'Emergency kit & contingency planning',
      'Post-event vendor gratuity distribution',
    ],
    reverse: false,
  },
  {
    id: 'destination',
    tag: 'Worldwide',
    title: 'Destination Events',
    subtitle: 'Extraordinary places. Extraordinary love.',
    description:
      'Whether you dream of exchanging vows on an Amalfi Coast terrace, a Caribbean beach, or a Tuscan vineyard, our Destination Event service handles every logistical and design challenge that comes with celebrating abroad. We leverage our international vendor network to ensure your guests experience a seamless, awe-inspiring celebration no matter where in the world it takes place.',
    image: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=900&h=700&fit=crop',
    alt: 'Destination beach wedding at sunset with floral arch',
    priceHint: 'Custom Quote',
    features: [
      'International venue scouting & booking',
      'Local vendor network coordination',
      'Guest travel & accommodation management',
      'Legal requirements & documentation',
      'Custom cultural ceremony integration',
      'Pre-event welcome dinner planning',
      'On-site planning team',
      'Full destination event management',
    ],
    reverse: true,
  },
  {
    id: 'rental',
    tag: 'Premium Inventory',
    title: 'Rental Service',
    subtitle: 'Elevate your event with curated, premium pieces.',
    description:
      'Our curated rental collection features an exquisite range of furniture, linen, tableware, floral vessels, lighting rigs, backdrops, arches, and centrepiece items to transform any space into a breathtaking setting. Whether you need a single statement piece or a complete venue dressing, our rental service is available for weddings, corporate events, private parties, and more.',
    image: 'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=900&h=700&fit=crop',
    alt: 'Elegant event rental items — centrepieces, arches and luxury table settings',
    priceHint: 'From $500 / event',
    features: [
      'Premium furniture & seating',
      'Luxury linen & table settings',
      'Floral arches & backdrop structures',
      'Statement centrepiece collection',
      'Lighting rigs & fairy light canopies',
      'Charger plates, glassware & cutlery',
      'Delivery, setup & collection included',
      'Custom inventory on request',
    ],
    reverse: false,
  },
  {
    id: 'cleaning',
    tag: 'Before · During · After',
    title: 'Cleaning Service',
    subtitle: 'Immaculate spaces — corporate or event, every time.',
    description:
      'Our professional cleaning team ensures every venue is spotless from the moment guests arrive to the very last goodbye. We offer comprehensive event cleaning — pre-event deep cleans, discreet during-event maintenance, and thorough post-event restoration — as well as regular corporate office cleaning packages. No job is too large or too small.',
    image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=900&h=700&fit=crop',
    alt: 'Professional cleaning team preparing an elegant event venue',
    priceHint: 'Custom Quote',
    features: [
      'Pre-event deep clean & preparation',
      'During-event discreet maintenance crew',
      'Post-event full venue restoration',
      'Corporate office regular cleaning',
      'Industrial & large-scale venue cleaning',
      'Eco-friendly products on request',
      'Fully insured & uniformed staff',
      'Flexible scheduling — 24/7 availability',
    ],
    reverse: true,
  },
]

export default function ServicesPage() {
  const pageRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.reveal-on-scroll').forEach((el, i) => {
              setTimeout(() => el.classList.add('revealed'), i * 80)
            })
          }
        })
      },
      { threshold: 0.07 }
    )
    pageRef.current?.querySelectorAll('section').forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={pageRef}>

      {/* PAGE HERO */}
      <section style={{ position: 'relative', minHeight: '70vh', background: '#1C1610', paddingTop: 'calc(76px + 7rem)', paddingBottom: '7rem', paddingLeft: 'clamp(1.5rem, 6vw, 7rem)', paddingRight: 'clamp(1.5rem, 6vw, 7rem)' }}>
        <img
          src="https://images.unsplash.com/photo-1606800052052-a08af7148866?w=1920&h=900&fit=crop"
          alt="Luxury event planning flatlay"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.2 }}
        />
        <div style={{ position: 'relative', zIndex: 10, maxWidth: 760 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2rem' }}>
            <div style={{ height: 1, width: 40, background: '#C9A84C' }} />
            <span style={{ fontFamily: 'var(--font-sans)', color: '#C9A84C', fontSize: '0.6rem', letterSpacing: '0.4em', textTransform: 'uppercase' }}>Our Services</span>
          </div>
          <h1 className="reveal-on-scroll" style={{ fontFamily: 'var(--font-serif)', color: '#FFFDF7', fontSize: 'clamp(3rem, 8vw, 6.5rem)', lineHeight: 1.05, fontWeight: 400 }}>
            Tailored to Every<br /><em style={{ color: '#C9A84C' }}>Experience</em>
          </h1>
          <p className="reveal-on-scroll" style={{ color: '#B5AFA8', fontFamily: 'var(--font-sans)', fontWeight: 300, lineHeight: 1.9, fontSize: '1rem', maxWidth: 520, marginTop: '2rem' }}>
            From comprehensive full planning to rental dressing and professional cleaning — each service is designed to give your event exactly what it deserves.
          </p>
        </div>
      </section>

      {/* SERVICE BLOCKS */}
      {services.map((service, idx) => (
        <section
          key={service.id}
          id={service.id}
          style={{ background: idx % 2 === 0 ? '#FFFDF7' : '#FAF6EF', paddingTop: '7rem', paddingBottom: '7rem', paddingLeft: 'clamp(1.5rem, 6vw, 7rem)', paddingRight: 'clamp(1.5rem, 6vw, 7rem)' }}
        >
          <div style={{ maxWidth: 1300, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '5rem', alignItems: 'center' }}>

            {/* Image */}
            <div className="reveal-on-scroll" style={{ order: service.reverse ? 2 : 1, overflow: 'hidden' }}>
              <img src={service.image} alt={service.alt} style={{ width: '100%', height: 480, objectFit: 'cover', display: 'block', transition: 'transform 0.8s cubic-bezier(0.16,1,0.3,1)' }} className="hover:scale-105" />
            </div>

            {/* Content */}
            <div style={{ order: service.reverse ? 1 : 2 }}>
              <div className="reveal-on-scroll">
                <span style={{ display: 'inline-block', background: '#F5E6C8', color: '#9B7A2F', fontSize: '0.55rem', letterSpacing: '0.3em', textTransform: 'uppercase', padding: '0.3rem 0.85rem', fontFamily: 'var(--font-sans)', marginBottom: '1.5rem' }}>
                  {service.tag}
                </span>
              </div>
              <h2 className="reveal-on-scroll" style={{ fontFamily: 'var(--font-serif)', color: '#2C2C2C', fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', lineHeight: 1.15, fontWeight: 400, marginBottom: '0.6rem' }}>
                {service.title}
              </h2>
              <p className="reveal-on-scroll" style={{ fontFamily: 'var(--font-sans)', color: '#C9A84C', fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '1.75rem' }}>
                {service.subtitle}
              </p>
              <p className="reveal-on-scroll" style={{ color: '#7A7068', fontFamily: 'var(--font-sans)', fontWeight: 300, lineHeight: 1.9, fontSize: '0.9rem', marginBottom: '2rem' }}>
                {service.description}
              </p>
              <ul className="reveal-on-scroll" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.65rem 1.5rem', marginBottom: '2.5rem', listStyle: 'none', padding: 0 }}>
                {service.features.map(f => (
                  <li key={f} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                    <Check size={12} style={{ color: '#C9A84C', flexShrink: 0, marginTop: '0.2rem' }} />
                    <span style={{ color: '#7A7068', fontFamily: 'var(--font-sans)', fontWeight: 300, fontSize: '0.82rem', lineHeight: 1.6 }}>{f}</span>
                  </li>
                ))}
              </ul>
              <div className="reveal-on-scroll" style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
                <Link href="/booking" className="btn-gold">Book a Consultation</Link>
                <span style={{ fontFamily: 'var(--font-serif)', color: '#C9A84C', fontStyle: 'italic', fontSize: '0.9rem' }}>{service.priceHint}</span>
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* BOTTOM CTA */}
      <section style={{ background: '#1C1610', padding: '7rem clamp(1.5rem, 6vw, 7rem)', textAlign: 'center' }}>
        <div style={{ maxWidth: 640, margin: '0 auto' }}>
          <div className="reveal-on-scroll" style={{ display: 'inline-flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
            <div style={{ height: 1, width: 40, background: '#C9A84C' }} />
            <span style={{ fontFamily: 'var(--font-sans)', color: '#C9A84C', fontSize: '0.6rem', letterSpacing: '0.4em', textTransform: 'uppercase' }}>Not Sure?</span>
            <div style={{ height: 1, width: 40, background: '#C9A84C' }} />
          </div>
          <h2 className="reveal-on-scroll" style={{ fontFamily: 'var(--font-serif)', color: '#F5E6C8', fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', fontWeight: 400, lineHeight: 1.2, marginBottom: '1.5rem' }}>
            Let&apos;s Find the Perfect<br /><em style={{ color: '#C9A84C' }}>Package for You</em>
          </h2>
          <p className="reveal-on-scroll" style={{ color: '#B5AFA8', fontFamily: 'var(--font-sans)', fontWeight: 300, lineHeight: 1.9, fontSize: '0.9rem', marginBottom: '2.5rem' }}>
            Every event is different. Book a complimentary discovery call and we&apos;ll guide you to the service that best matches your vision, timeline, and needs.
          </p>
          <Link href="/booking" className="btn-gold">Request a Free Discovery Call</Link>
        </div>
      </section>
    </div>
  )
}
