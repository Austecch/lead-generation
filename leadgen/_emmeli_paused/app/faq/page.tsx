'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { Plus, Minus } from 'lucide-react'

const faqs = [
  {
    category: 'Getting Started',
    questions: [
      {
        q: 'How far in advance should we book Veil & Bloom?',
        a: 'We recommend reaching out at least 12–18 months before your wedding date, especially for peak seasons (May–October). We accept a limited number of weddings per year to ensure every couple receives our full attention, and popular dates book quickly. That said, we occasionally have availability for shorter timelines — please enquire.',
      },
      {
        q: 'What is included in the initial consultation?',
        a: 'Your complimentary discovery call is a 30-minute conversation where we learn about your vision, answer all your questions, and determine which of our services best fits your needs. There is no commitment or obligation.',
      },
      {
        q: 'Do you work exclusively with weddings in New Jersey?',
        a: 'Our home base is New Jersey and we know every premier venue in the state intimately. However, we regularly plan weddings in New York, Connecticut, and throughout the Northeast. We also offer full destination wedding services internationally.',
      },
    ],
  },
  {
    category: 'Our Services',
    questions: [
      {
        q: 'What is the difference between Full Planning and Partial Planning?',
        a: 'Full Planning is our most comprehensive service — we are involved from day one through your final farewell, handling everything from venue scouting to vendor negotiations to design. Partial Planning is for couples who have already made some key decisions and need an expert to step in, refine the vision, and manage logistics.',
      },
      {
        q: 'Can we customize a package to suit our specific needs?',
        a: "Absolutely. We understand that every couple's needs are unique. After your discovery call, we can tailor a bespoke proposal that combines elements from different service tiers. Our goal is always to give you exactly what you need — no more, no less.",
      },
      {
        q: 'Do you handle the rehearsal dinner as well?',
        a: 'Yes. Our Full Planning package includes rehearsal dinner coordination. For other packages, rehearsal dinner planning can be added as an à la carte service.',
      },
    ],
  },
  {
    category: 'Vendors & Design',
    questions: [
      {
        q: 'Do we have to use your preferred vendors?',
        a: "Not at all. We have a curated network of New Jersey's finest photographers, florists, caterers, and entertainment professionals that we trust and love working with. However, if you have existing relationships with vendors or have already made bookings, we will work seamlessly with your team.",
      },
      {
        q: 'How do you approach wedding design and aesthetics?',
        a: "Design is at the heart of everything we do. We begin with a deep dive into your personal style — your wardrobe, your home, your travels, your Pinterest boards — to develop a bespoke visual concept including mood boards, color palettes, floral direction, and tabletop styling.",
      },
      {
        q: 'Can you source vendors for a destination wedding in another country?',
        a: 'Yes. We have an established international vendor network and relationships with destination wedding specialists across Europe, the Caribbean, Mexico, and beyond. We handle all communication, contracts, and logistical coordination across time zones.',
      },
    ],
  },
  {
    category: 'Budgets & Pricing',
    questions: [
      {
        q: 'What is the starting price for your services?',
        a: 'Our Day-of Coordination starts at $2,200, Partial Planning from $4,500, and Full Wedding Planning from $8,500. Destination wedding pricing is customized based on scale and location.',
      },
      {
        q: 'Do you help manage and track the overall wedding budget?',
        a: 'Yes — budget management is a core part of our Full and Partial Planning services. We create a master budget spreadsheet, track all deposits and payments, flag where costs may escalate, and make recommendations to maximize your investment.',
      },
      {
        q: 'Is a deposit required to secure our date?',
        a: 'Yes. Upon signing your contract, we require a 25% retainer to officially hold your wedding date and begin planning. The remaining balance is structured in installments leading up to your wedding day.',
      },
    ],
  },
  {
    category: 'The Wedding Day',
    questions: [
      {
        q: 'How many coordinators will be present on our wedding day?',
        a: 'The number of coordinators depends on the size and complexity of your event. For most weddings, you will have a lead planner plus one or two assistant coordinators. For larger or multi-venue events, we scale our team accordingly.',
      },
      {
        q: 'What happens if something goes wrong on the day?',
        a: 'Contingency planning is built into everything we do. We maintain an emergency kit, develop backup plans for weather, vendor no-shows, and timeline delays. Our team is trained to handle crises calmly and discreetly so that you never feel the pressure.',
      },
    ],
  },
]

export default function FAQPage() {
  const [open, setOpen] = useState<string | null>(null)
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
      { threshold: 0.05 }
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
          minHeight: '60vh',
          background: '#FAF6EF',
          paddingTop: 'calc(76px + 7rem)',
          paddingBottom: '7rem',
          paddingLeft: 'clamp(1.5rem, 6vw, 7rem)',
          paddingRight: 'clamp(1.5rem, 6vw, 7rem)',
        }}
      >
        <div style={{ maxWidth: 760 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2rem' }}>
            <div style={{ width: 40, height: 1, background: '#C9A84C' }} />
            <span style={{ fontFamily: 'var(--font-jost)', color: '#C9A84C', fontSize: '0.6rem', letterSpacing: '0.4em', textTransform: 'uppercase' }}>
              FAQ
            </span>
          </div>
          <h1
            style={{
              fontFamily: 'var(--font-playfair)',
              color: '#2C2C2C',
              fontSize: 'clamp(3rem, 8vw, 6.5rem)',
              lineHeight: 1.05,
              fontWeight: 400,
              marginBottom: '2rem',
            }}
          >
            Everything You<br />
            <em className="gold-text">Need to Know</em>
          </h1>
          <p
            style={{
              color: '#7A7068',
              fontFamily: 'var(--font-jost)',
              fontWeight: 300,
              lineHeight: 1.9,
              fontSize: '1rem',
              maxWidth: 520,
            }}
          >
            Planning a wedding is full of questions. We have compiled the answers to the ones
            couples ask us most often. Still have questions? We love to talk.
          </p>
        </div>
      </section>

      {/* ── ACCORDION ── */}
      <section
        style={{
          background: '#FFFDF7',
          paddingTop: '6rem',
          paddingBottom: '7rem',
          paddingLeft: 'clamp(1.5rem, 6vw, 7rem)',
          paddingRight: 'clamp(1.5rem, 6vw, 7rem)',
        }}
      >
        <div style={{ maxWidth: 840, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '4rem' }}>
          {faqs.map((group, gi) => (
            <div key={group.category} className="reveal-on-scroll" style={{ transitionDelay: `${gi * 60}ms` }}>

              {/* Category heading */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
                <span
                  style={{
                    fontFamily: 'var(--font-jost)',
                    color: '#C9A84C',
                    fontSize: '0.6rem',
                    letterSpacing: '0.35em',
                    textTransform: 'uppercase',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {group.category}
                </span>
                <div style={{ flex: 1, height: 1, background: 'linear-gradient(to right, #C9A84C44, transparent)' }} />
              </div>

              {/* Questions */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {group.questions.map((item, qi) => {
                  const key = `${gi}-${qi}`
                  const isOpen = open === key
                  return (
                    <div
                      key={qi}
                      style={{
                        border: `1px solid ${isOpen ? '#C9A84C' : '#E2D9CC'}`,
                        background: isOpen ? '#FFFCF3' : '#FFFDF7',
                        transition: 'border-color 0.3s, background 0.3s',
                      }}
                    >
                      <button
                        style={{
                          width: '100%',
                          display: 'flex',
                          alignItems: 'flex-start',
                          justifyContent: 'space-between',
                          gap: '2rem',
                          padding: '1.5rem 1.75rem',
                          textAlign: 'left',
                          background: 'none',
                          border: 'none',
                          cursor: 'pointer',
                        }}
                        onClick={() => setOpen(isOpen ? null : key)}
                        aria-expanded={isOpen}
                      >
                        <span
                          style={{
                            fontFamily: 'var(--font-playfair)',
                            color: '#2C2C2C',
                            fontSize: 'clamp(0.9rem, 2vw, 1.05rem)',
                            lineHeight: 1.45,
                            fontWeight: 400,
                          }}
                        >
                          {item.q}
                        </span>
                        <span
                          style={{
                            flexShrink: 0,
                            width: 28, height: 28,
                            borderRadius: '50%',
                            border: `1px solid ${isOpen ? '#C9A84C' : '#E2D9CC'}`,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: isOpen ? '#C9A84C' : '#7A7068',
                            transition: 'all 0.3s',
                            marginTop: '0.15rem',
                          }}
                        >
                          {isOpen ? <Minus size={12} /> : <Plus size={12} />}
                        </span>
                      </button>

                      <div
                        style={{
                          overflow: 'hidden',
                          maxHeight: isOpen ? 600 : 0,
                          opacity: isOpen ? 1 : 0,
                          transition: 'max-height 0.5s cubic-bezier(0.16,1,0.3,1), opacity 0.4s',
                        }}
                      >
                        <div style={{ padding: '0 1.75rem 1.75rem', paddingTop: 0 }}>
                          <div style={{ width: 24, height: 1, background: '#C9A84C', marginBottom: '1rem' }} />
                          <p
                            style={{
                              color: '#7A7068',
                              fontFamily: 'var(--font-jost)',
                              fontWeight: 300,
                              lineHeight: 1.9,
                              fontSize: '0.88rem',
                            }}
                          >
                            {item.a}
                          </p>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── BOTTOM CTA ── */}
      <section
        style={{
          background: '#FAF6EF',
          borderTop: '1px solid #E2D9CC',
          padding: '6rem clamp(1.5rem, 6vw, 7rem)',
          textAlign: 'center',
        }}
      >
        <div style={{ maxWidth: 560, margin: '0 auto' }}>
          <h2
            style={{
              fontFamily: 'var(--font-playfair)',
              color: '#2C2C2C',
              fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)',
              fontWeight: 400,
              marginBottom: '1rem',
            }}
          >
            Still Have Questions?
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
            Our team is always happy to chat. Reach out directly — we love getting to know
            the couples we work with, even before a commitment is made.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center' }}>
            <Link href="/contact" className="btn-gold">Contact Us</Link>
            <Link href="/booking" className="btn-outline-gold">Book a Discovery Call</Link>
          </div>
        </div>
      </section>

    </div>
  )
}
