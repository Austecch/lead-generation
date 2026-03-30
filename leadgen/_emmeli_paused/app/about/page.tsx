'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'

const team = [
  {
    name: 'Isabelle Laurent',
    role: 'Founder & Lead Planner',
    bio: 'With 12 years shaping New Jersey\'s luxury wedding scene, Isabelle founded Veil & Bloom on the belief that every love story deserves a cinematic telling.',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=500&h=600&fit=crop',
    alt: 'Isabelle Laurent, founder and lead planner',
  },
  {
    name: 'Charlotte Vance',
    role: 'Creative Director',
    bio: 'Charlotte\'s editorial eye and deep knowledge of florals, lighting, and design transforms each wedding into a breathtaking visual narrative.',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=500&h=600&fit=crop',
    alt: 'Charlotte Vance, creative director',
  },
  {
    name: 'Naomi Rivers',
    role: 'Senior Event Coordinator',
    bio: 'Naomi\'s meticulous logistics expertise ensures that no detail falls through the cracks — from vendor timelines to the final song of the night.',
    image: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=500&h=600&fit=crop',
    alt: 'Naomi Rivers, senior event coordinator',
  },
]

const values = [
  { num: '01', title: 'Intentional Design', text: 'We believe a wedding should feel like an extension of who you are — beautifully designed with purpose, never generic.' },
  { num: '02', title: 'Emotional Storytelling', text: 'Every element we place, every moment we craft, is designed to evoke genuine emotion in you and your guests.' },
  { num: '03', title: 'Flawless Execution', text: 'Behind every seamless wedding day is weeks of meticulous planning, vendor coordination, and contingency thinking.' },
  { num: '04', title: 'Devoted Partnership', text: 'We become your most trusted advocates — championing your vision, protecting your budget, and celebrating your love.' },
]

export default function AboutPage() {
  const pageRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.reveal-on-scroll').forEach((el, i) => {
              setTimeout(() => el.classList.add('revealed'), i * 100)
            })
          }
        })
      },
      { threshold: 0.08 }
    )
    pageRef.current?.querySelectorAll('section').forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [])

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
          src="https://images.unsplash.com/photo-1469371670807-013ccf25f16a?w=1920&h=900&fit=crop"
          alt="Veil and Bloom planning studio"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ opacity: 0.22 }}
        />
        <div className="relative z-10" style={{ maxWidth: 760 }}>
          <div className="flex items-center gap-3 mb-8">
            <div className="h-px w-10" style={{ background: '#C9A84C' }} />
            <span className="text-[0.6rem] tracking-[0.4em] uppercase" style={{ color: '#C9A84C', fontFamily: 'var(--font-jost)' }}>
              Our Story
            </span>
          </div>
          <h1
            className="reveal-on-scroll"
            style={{
              fontFamily: 'var(--font-playfair)',
              color: '#FFFDF7',
              fontSize: 'clamp(3rem, 8vw, 6.5rem)',
              lineHeight: 1.05,
              fontWeight: 400,
            }}
          >
            We Believe in<br />
            <em style={{ color: '#C9A84C' }}>Beautiful Beginnings</em>
          </h1>
          <p
            className="reveal-on-scroll mt-8"
            style={{
              color: '#B5AFA8',
              fontFamily: 'var(--font-jost)',
              fontWeight: 300,
              lineHeight: 1.9,
              fontSize: '1rem',
              maxWidth: 520,
            }}
          >
            Veil &amp; Bloom is a luxury wedding planning studio born from the belief that the most
            important day of your life deserves artistry, not just organization.
          </p>
        </div>
      </section>

      {/* ── BRAND STORY ── */}
      <section
        style={{
          background: '#FFFDF7',
          paddingTop: '8rem',
          paddingBottom: '8rem',
          paddingLeft: 'clamp(1.5rem, 6vw, 7rem)',
          paddingRight: 'clamp(1.5rem, 6vw, 7rem)',
        }}
      >
        <div
          style={{
            maxWidth: 1300,
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
            gap: '5rem',
            alignItems: 'center',
          }}
        >
          {/* Text */}
          <div>
            <div className="reveal-on-scroll flex items-center gap-3 mb-8">
              <div className="h-px w-10" style={{ background: '#C9A84C' }} />
              <span className="text-[0.6rem] tracking-[0.4em] uppercase" style={{ color: '#C9A84C', fontFamily: 'var(--font-jost)' }}>
                Our Origin
              </span>
            </div>
            <h2
              className="reveal-on-scroll mb-8"
              style={{
                fontFamily: 'var(--font-playfair)',
                color: '#2C2C2C',
                fontSize: 'clamp(2rem, 4vw, 3rem)',
                lineHeight: 1.2,
                fontWeight: 400,
              }}
            >
              More Than a Wedding Company —{' '}
              <em className="gold-text">We Are Storytellers</em>
            </h2>
            <div
              className="reveal-on-scroll"
              style={{
                color: '#7A7068',
                fontFamily: 'var(--font-jost)',
                fontWeight: 300,
                lineHeight: 1.95,
                fontSize: '0.95rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '1.4rem',
              }}
            >
              <p>
                Veil &amp; Bloom was born from a simple truth: the most important day of your life
                deserves more than just competent execution. It deserves artistry.
              </p>
              <p>
                Founded in 2013 by Isabelle Laurent in Princeton, New Jersey, we set out to redefine
                what luxury wedding planning could feel like — not transactional, but transformational.
                Not just organized, but emotionally resonant.
              </p>
              <p>
                Over the past decade, we have had the extraordinary privilege of crafting over 300
                wedding experiences across New Jersey and beyond. Each one told a unique love story
                through immaculate design, flawless logistics, and genuine human connection.
              </p>
            </div>
            <div className="reveal-on-scroll mt-10">
              <Link href="/booking" className="btn-gold">
                Begin Your Story
              </Link>
            </div>
          </div>

          {/* Images */}
          <div
            className="reveal-on-scroll"
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '1rem',
            }}
          >
            <img
              src="https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=400&h=540&fit=crop"
              alt="Wedding planner consulting with bride"
              style={{ width: '100%', height: 260, objectFit: 'cover' }}
            />
            <img
              src="https://images.unsplash.com/photo-1487530811015-780c6c8cf2c1?w=400&h=540&fit=crop"
              alt="Luxury floral arrangement"
              style={{ width: '100%', height: 260, objectFit: 'cover', marginTop: '3rem' }}
            />
          </div>
        </div>
      </section>

      {/* ── STATS STRIP ── */}
      <section style={{ background: '#2C2C2C', padding: '4.5rem clamp(1.5rem, 6vw, 7rem)' }}>
        <div
          style={{
            maxWidth: 1300,
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
            gap: '3rem',
            textAlign: 'center',
          }}
        >
          {[
            { num: '300+', label: 'Weddings Planned' },
            { num: '12', label: 'Years of Experience' },
            { num: '4', label: 'Team Members' },
            { num: '98%', label: 'Client Satisfaction' },
          ].map((stat) => (
            <div key={stat.label}>
              <div
                style={{
                  fontFamily: 'var(--font-playfair)',
                  color: '#C9A84C',
                  fontSize: 'clamp(2rem, 4vw, 3.2rem)',
                  fontWeight: 400,
                  lineHeight: 1,
                  marginBottom: '0.6rem',
                }}
              >
                {stat.num}
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-jost)',
                  color: '#B5AFA8',
                  fontSize: '0.6rem',
                  letterSpacing: '0.25em',
                  textTransform: 'uppercase',
                  fontWeight: 300,
                }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── PHILOSOPHY ── */}
      <section
        style={{
          background: '#FAF6EF',
          paddingTop: '8rem',
          paddingBottom: '8rem',
          paddingLeft: 'clamp(1.5rem, 6vw, 7rem)',
          paddingRight: 'clamp(1.5rem, 6vw, 7rem)',
        }}
      >
        <div style={{ maxWidth: 1300, margin: '0 auto' }}>
          {/* Section label */}
          <div className="reveal-on-scroll text-center mb-16">
            <div className="inline-flex items-center gap-4 mb-5">
              <div className="h-px w-10" style={{ background: '#C9A84C' }} />
              <span className="text-[0.6rem] tracking-[0.4em] uppercase" style={{ color: '#C9A84C', fontFamily: 'var(--font-jost)' }}>
                Our Philosophy
              </span>
              <div className="h-px w-10" style={{ background: '#C9A84C' }} />
            </div>
            <h2
              style={{
                fontFamily: 'var(--font-playfair)',
                color: '#2C2C2C',
                fontSize: 'clamp(2rem, 4vw, 3rem)',
                fontWeight: 400,
              }}
            >
              Four Pillars of Our Practice
            </h2>
          </div>

          {/* Cards */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: '2rem',
            }}
          >
            {values.map((v, i) => (
              <div
                key={v.title}
                className="reveal-on-scroll"
                style={{
                  borderTop: '2px solid #C9A84C',
                  paddingTop: '2rem',
                  paddingBottom: '2.5rem',
                  paddingLeft: '2rem',
                  paddingRight: '2rem',
                  background: '#FFFDF7',
                  transitionDelay: `${i * 80}ms`,
                }}
              >
                <div
                  style={{
                    fontFamily: 'var(--font-playfair)',
                    color: 'rgba(201,168,76,0.18)',
                    fontSize: '3.5rem',
                    lineHeight: 1,
                    marginBottom: '1.2rem',
                    fontWeight: 400,
                  }}
                >
                  {v.num}
                </div>
                <h3
                  style={{
                    fontFamily: 'var(--font-playfair)',
                    color: '#2C2C2C',
                    fontSize: '1.15rem',
                    fontWeight: 400,
                    marginBottom: '1rem',
                  }}
                >
                  {v.title}
                </h3>
                <p
                  style={{
                    color: '#7A7068',
                    fontFamily: 'var(--font-jost)',
                    fontWeight: 300,
                    lineHeight: 1.85,
                    fontSize: '0.88rem',
                  }}
                >
                  {v.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TEAM ── */}
      <section
        style={{
          background: '#FFFDF7',
          paddingTop: '8rem',
          paddingBottom: '8rem',
          paddingLeft: 'clamp(1.5rem, 6vw, 7rem)',
          paddingRight: 'clamp(1.5rem, 6vw, 7rem)',
        }}
      >
        <div style={{ maxWidth: 1300, margin: '0 auto' }}>
          {/* Section label */}
          <div className="reveal-on-scroll text-center mb-16">
            <div className="inline-flex items-center gap-4 mb-5">
              <div className="h-px w-10" style={{ background: '#C9A84C' }} />
              <span className="text-[0.6rem] tracking-[0.4em] uppercase" style={{ color: '#C9A84C', fontFamily: 'var(--font-jost)' }}>
                The Team
              </span>
              <div className="h-px w-10" style={{ background: '#C9A84C' }} />
            </div>
            <h2
              style={{
                fontFamily: 'var(--font-playfair)',
                color: '#2C2C2C',
                fontSize: 'clamp(2rem, 4vw, 3rem)',
                fontWeight: 400,
              }}
            >
              The Hearts Behind{' '}
              <em className="gold-text">Every Wedding</em>
            </h2>
          </div>

          {/* Cards */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '3rem',
            }}
          >
            {team.map((member, i) => (
              <div
                key={member.name}
                className="reveal-on-scroll group"
                style={{ transitionDelay: `${i * 120}ms` }}
              >
                <div
                  style={{ overflow: 'hidden', height: 420, marginBottom: '1.75rem' }}
                >
                  <img
                    src={member.image}
                    alt={member.alt}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transition: 'transform 0.7s cubic-bezier(0.16,1,0.3,1)',
                    }}
                    className="group-hover:scale-105"
                  />
                </div>
                <div className="h-px w-8 mb-4" style={{ background: '#C9A84C' }} />
                <h3
                  style={{
                    fontFamily: 'var(--font-playfair)',
                    color: '#2C2C2C',
                    fontSize: '1.35rem',
                    fontWeight: 400,
                    marginBottom: '0.35rem',
                  }}
                >
                  {member.name}
                </h3>
                <div
                  style={{
                    fontFamily: 'var(--font-jost)',
                    color: '#C9A84C',
                    fontSize: '0.6rem',
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    marginBottom: '1rem',
                  }}
                >
                  {member.role}
                </div>
                <p
                  style={{
                    color: '#7A7068',
                    fontFamily: 'var(--font-jost)',
                    fontWeight: 300,
                    lineHeight: 1.85,
                    fontSize: '0.88rem',
                  }}
                >
                  {member.bio}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA STRIP ── */}
      <section
        style={{
          background: '#1C1610',
          padding: '6rem clamp(1.5rem, 6vw, 7rem)',
          textAlign: 'center',
        }}
      >
        <div style={{ maxWidth: 640, margin: '0 auto' }}>
          <div className="inline-flex items-center gap-4 mb-6">
            <div className="h-px w-10" style={{ background: '#C9A84C' }} />
            <span className="text-[0.6rem] tracking-[0.4em] uppercase" style={{ color: '#C9A84C', fontFamily: 'var(--font-jost)' }}>
              Let&apos;s Connect
            </span>
            <div className="h-px w-10" style={{ background: '#C9A84C' }} />
          </div>
          <h2
            style={{
              fontFamily: 'var(--font-playfair)',
              color: '#F5E6C8',
              fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)',
              fontWeight: 400,
              marginBottom: '1.5rem',
            }}
          >
            Ready to Write Your<br />
            <em style={{ color: '#C9A84C' }}>Love Story With Us?</em>
          </h2>
          <p
            style={{
              color: '#B5AFA8',
              fontFamily: 'var(--font-jost)',
              fontWeight: 300,
              lineHeight: 1.9,
              fontSize: '0.9rem',
              marginBottom: '2.5rem',
            }}
          >
            Book a complimentary discovery call and let&apos;s explore how Veil &amp; Bloom
            can bring your wedding vision to life.
          </p>
          <Link href="/booking" className="btn-gold">
            Request a Consultation
          </Link>
        </div>
      </section>

    </div>
  )
}
