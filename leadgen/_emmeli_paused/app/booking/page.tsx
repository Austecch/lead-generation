'use client'

import { useState } from 'react'
import { Check, ChevronRight, User, Heart, DollarSign } from 'lucide-react'

type FormData = {
  firstName: string; lastName: string; email: string; phone: string
  partnerFirstName: string; partnerLastName: string
  weddingDate: string; guestCount: string; venue: string; service: string; style: string
  budget: string; heardFrom: string; additionalInfo: string
}

const initialData: FormData = {
  firstName: '', lastName: '', email: '', phone: '',
  partnerFirstName: '', partnerLastName: '',
  weddingDate: '', guestCount: '', venue: '', service: '', style: '',
  budget: '', heardFrom: '', additionalInfo: '',
}

const steps = [
  { id: 1, label: 'Your Info',       icon: User },
  { id: 2, label: 'Wedding Details', icon: Heart },
  { id: 3, label: 'Budget & Notes',  icon: DollarSign },
]

export default function BookingPage() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState<FormData>(initialData)
  const [submitted, setSubmitted] = useState(false)

  const update = (field: keyof FormData, value: string) =>
    setFormData((prev) => ({ ...prev, [field]: value }))

  /* ── shared input/label styles ── */
  const inputStyle: React.CSSProperties = {
    width: '100%',
    background: '#FFFDF7',
    border: '1px solid #E2D9CC',
    padding: '0.85rem 1rem',
    fontSize: '0.85rem',
    color: '#2C2C2C',
    fontFamily: 'var(--font-jost)',
    fontWeight: 300,
    outline: 'none',
    transition: 'border-color 0.3s',
  }
  const labelStyle: React.CSSProperties = {
    display: 'block',
    fontFamily: 'var(--font-jost)',
    color: '#C9A84C',
    fontSize: '0.58rem',
    letterSpacing: '0.25em',
    textTransform: 'uppercase',
    marginBottom: '0.5rem',
  }
  const fieldStyle: React.CSSProperties = { display: 'flex', flexDirection: 'column' }

  return (
    <div>

      {/* ── HERO ── */}
      <section
        className="relative"
        style={{
          minHeight: '55vh',
          background: '#1C1610',
          paddingTop: 'calc(76px + 7rem)',
          paddingBottom: '7rem',
          paddingLeft: 'clamp(1.5rem, 6vw, 7rem)',
          paddingRight: 'clamp(1.5rem, 6vw, 7rem)',
        }}
      >
        <img
          src="https://images.unsplash.com/photo-1591604466107-ec97de577aff?w=1920&h=700&fit=crop"
          alt="Luxury wedding consultation session"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ opacity: 0.18 }}
        />
        <div className="relative z-10 text-center" style={{ maxWidth: 720, margin: '0 auto' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2rem' }}>
            <div style={{ width: 40, height: 1, background: '#C9A84C' }} />
            <span style={{ fontFamily: 'var(--font-jost)', color: '#C9A84C', fontSize: '0.6rem', letterSpacing: '0.4em', textTransform: 'uppercase' }}>
              Begin Your Journey
            </span>
            <div style={{ width: 40, height: 1, background: '#C9A84C' }} />
          </div>
          <h1
            style={{
              fontFamily: 'var(--font-playfair)',
              color: '#FFFDF7',
              fontSize: 'clamp(2.6rem, 7vw, 5.5rem)',
              lineHeight: 1.08,
              fontWeight: 400,
              marginBottom: '1.5rem',
            }}
          >
            Request a<br />
            <em style={{ color: '#C9A84C' }}>Complimentary Consultation</em>
          </h1>
          <p
            style={{
              color: '#B5AFA8',
              fontFamily: 'var(--font-jost)',
              fontWeight: 300,
              lineHeight: 1.9,
              fontSize: '0.95rem',
              maxWidth: 500,
              margin: '0 auto',
            }}
          >
            We accept a limited number of weddings each year to ensure every couple receives
            our full attention and artistry. Complete this form to begin.
          </p>
        </div>
      </section>

      {/* ── FORM ── */}
      <section
        style={{
          background: '#FAF6EF',
          paddingTop: '6rem',
          paddingBottom: '7rem',
          paddingLeft: 'clamp(1.5rem, 6vw, 7rem)',
          paddingRight: 'clamp(1.5rem, 6vw, 7rem)',
        }}
      >
        <div style={{ maxWidth: 760, margin: '0 auto' }}>

          {submitted ? (

            /* ── SUCCESS ── */
            <div
              style={{
                background: '#FFFDF7',
                border: '1px solid #E2D9CC',
                textAlign: 'center',
                padding: '5rem 3rem',
              }}
            >
              <div
                style={{
                  width: 80, height: 80, borderRadius: '50%',
                  background: 'linear-gradient(135deg, #9B7A2F, #C9A84C, #E2C97E)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  margin: '0 auto 2rem',
                }}
              >
                <Check size={32} color="#FFFDF7" strokeWidth={2.5} />
              </div>
              <h2
                style={{
                  fontFamily: 'var(--font-playfair)', color: '#2C2C2C',
                  fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', fontWeight: 400, marginBottom: '1rem',
                }}
              >
                Your Request Has Been Sent
              </h2>
              <div style={{ width: 48, height: 1, background: '#C9A84C', margin: '0 auto 1.5rem' }} />
              <p
                style={{
                  color: '#7A7068', fontFamily: 'var(--font-jost)', fontWeight: 300,
                  lineHeight: 1.9, fontSize: '0.9rem', maxWidth: 380, margin: '0 auto 1rem',
                }}
              >
                Thank you, <strong>{formData.firstName}</strong>. Our team will be in touch within
                24 hours to schedule your discovery call.
              </p>
              <p style={{ fontFamily: 'var(--font-jost)', color: '#C9A84C', fontSize: '0.6rem', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '2.5rem' }}>
                Check your email at {formData.email}
              </p>
              <a href="/" className="btn-outline-gold">Return to Home</a>
            </div>

          ) : (
            <>
              {/* ── STEP INDICATOR ── */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '3.5rem',
                }}
              >
                {steps.map((s, i) => (
                  <div key={s.id} style={{ display: 'flex', alignItems: 'center' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
                      <div
                        style={{
                          width: 42, height: 42, borderRadius: '50%',
                          border: `2px solid ${step >= s.id ? '#C9A84C' : '#E2D9CC'}`,
                          background: step > s.id ? '#C9A84C' : 'transparent',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          transition: 'all 0.35s',
                        }}
                      >
                        {step > s.id
                          ? <Check size={14} color="#FFFDF7" />
                          : <s.icon size={14} style={{ color: step === s.id ? '#C9A84C' : '#B5AFA8' }} />
                        }
                      </div>
                      <span
                        style={{
                          fontFamily: 'var(--font-jost)',
                          color: step === s.id ? '#C9A84C' : '#B5AFA8',
                          fontSize: '0.55rem',
                          letterSpacing: '0.2em',
                          textTransform: 'uppercase',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {s.label}
                      </span>
                    </div>
                    {i < steps.length - 1 && (
                      <div
                        style={{
                          width: 80, height: 1,
                          background: step > s.id ? '#C9A84C' : '#E2D9CC',
                          margin: '0 0.75rem',
                          marginBottom: '1.5rem',
                          transition: 'background 0.4s',
                        }}
                      />
                    )}
                  </div>
                ))}
              </div>

              {/* ── FORM CARD ── */}
              <div style={{ background: '#FFFDF7', border: '1px solid #E2D9CC', padding: 'clamp(2rem, 5vw, 4rem)' }}>

                {/* STEP 1 */}
                {step === 1 && (
                  <div>
                    <h2 style={{ fontFamily: 'var(--font-playfair)', color: '#2C2C2C', fontSize: 'clamp(1.4rem, 3vw, 2rem)', fontWeight: 400, marginBottom: '0.5rem' }}>
                      Tell Us About Yourselves
                    </h2>
                    <p style={{ fontFamily: 'var(--font-jost)', color: '#B5AFA8', fontWeight: 300, fontSize: '0.85rem', marginBottom: '2.5rem' }}>
                      A little about the beautiful couple
                    </p>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem' }}>
                      {[
                        { label: "Your First Name",     field: 'firstName',      placeholder: 'Sophia' },
                        { label: "Your Last Name",      field: 'lastName',       placeholder: 'Hartley' },
                        { label: "Partner's First Name",field: 'partnerFirstName',placeholder: 'James' },
                        { label: "Partner's Last Name", field: 'partnerLastName', placeholder: 'Hartley' },
                        { label: "Email Address",       field: 'email',          placeholder: 'hello@youremail.com', type: 'email' },
                        { label: "Phone Number",        field: 'phone',          placeholder: '+1 (908) 555-0100', type: 'tel' },
                      ].map(({ label, field, placeholder, type = 'text' }) => (
                        <div key={field} style={fieldStyle}>
                          <label style={labelStyle}>{label}</label>
                          <input
                            type={type}
                            style={inputStyle}
                            value={formData[field as keyof FormData]}
                            onChange={(e) => update(field as keyof FormData, e.target.value)}
                            placeholder={placeholder}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* STEP 2 */}
                {step === 2 && (
                  <div>
                    <h2 style={{ fontFamily: 'var(--font-playfair)', color: '#2C2C2C', fontSize: 'clamp(1.4rem, 3vw, 2rem)', fontWeight: 400, marginBottom: '0.5rem' }}>
                      Your Wedding Details
                    </h2>
                    <p style={{ fontFamily: 'var(--font-jost)', color: '#B5AFA8', fontWeight: 300, fontSize: '0.85rem', marginBottom: '2.5rem' }}>
                      Help us understand your vision
                    </p>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem' }}>
                      <div style={fieldStyle}>
                        <label style={labelStyle}>Wedding Date</label>
                        <input type="date" style={inputStyle} value={formData.weddingDate} onChange={(e) => update('weddingDate', e.target.value)} />
                      </div>
                      <div style={fieldStyle}>
                        <label style={labelStyle}>Expected Guest Count</label>
                        <select style={inputStyle} value={formData.guestCount} onChange={(e) => update('guestCount', e.target.value)}>
                          <option value="">Select range</option>
                          {['Under 50','50 – 100','100 – 150','150 – 250','250+'].map(o => <option key={o}>{o}</option>)}
                        </select>
                      </div>
                      <div style={{ ...fieldStyle, gridColumn: '1 / -1' }}>
                        <label style={labelStyle}>Venue (if known)</label>
                        <input style={inputStyle} value={formData.venue} onChange={(e) => update('venue', e.target.value)} placeholder="e.g. Park Chateau Estate, or still searching" />
                      </div>
                      <div style={fieldStyle}>
                        <label style={labelStyle}>Service Interested In</label>
                        <select style={inputStyle} value={formData.service} onChange={(e) => update('service', e.target.value)}>
                          <option value="">Select service</option>
                          {['Full Wedding Planning','Partial Planning','Day-of Coordination','Destination Wedding','Not Sure Yet'].map(o => <option key={o}>{o}</option>)}
                        </select>
                      </div>
                      <div style={fieldStyle}>
                        <label style={labelStyle}>Wedding Style</label>
                        <select style={inputStyle} value={formData.style} onChange={(e) => update('style', e.target.value)}>
                          <option value="">Select style</option>
                          {['Garden Romance','Black Tie Elegance','Rustic Luxe','Modern Minimalist','Destination / Tropical','South Asian Fusion','Vintage Romantic','Still Deciding'].map(o => <option key={o}>{o}</option>)}
                        </select>
                      </div>
                    </div>
                  </div>
                )}

                {/* STEP 3 */}
                {step === 3 && (
                  <div>
                    <h2 style={{ fontFamily: 'var(--font-playfair)', color: '#2C2C2C', fontSize: 'clamp(1.4rem, 3vw, 2rem)', fontWeight: 400, marginBottom: '0.5rem' }}>
                      Budget &amp; Final Notes
                    </h2>
                    <p style={{ fontFamily: 'var(--font-jost)', color: '#B5AFA8', fontWeight: 300, fontSize: '0.85rem', marginBottom: '2.5rem' }}>
                      Almost there — a few final details
                    </p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                      <div style={fieldStyle}>
                        <label style={labelStyle}>Estimated Wedding Budget</label>
                        <select style={inputStyle} value={formData.budget} onChange={(e) => update('budget', e.target.value)}>
                          <option value="">Select range</option>
                          {['Under $25,000','$25,000 – $50,000','$50,000 – $100,000','$100,000 – $150,000','$150,000+','Prefer not to say'].map(o => <option key={o}>{o}</option>)}
                        </select>
                      </div>
                      <div style={fieldStyle}>
                        <label style={labelStyle}>How Did You Hear About Us?</label>
                        <select style={inputStyle} value={formData.heardFrom} onChange={(e) => update('heardFrom', e.target.value)}>
                          <option value="">Select one</option>
                          {['Instagram','Pinterest','The Knot','Google Search','Friend / Family Referral','Past Client Referral','Wedding Publication','Other'].map(o => <option key={o}>{o}</option>)}
                        </select>
                      </div>
                      <div style={fieldStyle}>
                        <label style={labelStyle}>Anything Else We Should Know?</label>
                        <textarea
                          style={{ ...inputStyle, resize: 'none' }}
                          rows={5}
                          value={formData.additionalInfo}
                          onChange={(e) => update('additionalInfo', e.target.value)}
                          placeholder="Share your vision, any challenges, or anything that will help us understand your dream wedding..."
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* ── NAV BUTTONS ── */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginTop: '3rem',
                    paddingTop: '2rem',
                    borderTop: '1px solid #E2D9CC',
                  }}
                >
                  {step > 1 ? (
                    <button onClick={() => setStep((s) => s - 1)} className="btn-outline-gold">
                      Back
                    </button>
                  ) : <div />}

                  {step < 3 ? (
                    <button
                      onClick={() => setStep((s) => s + 1)}
                      className="btn-gold"
                      style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}
                    >
                      Continue <ChevronRight size={13} />
                    </button>
                  ) : (
                    <button
                      onClick={() => setSubmitted(true)}
                      className="btn-gold"
                      style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}
                    >
                      Submit Request <Check size={13} />
                    </button>
                  )}
                </div>
              </div>

              <p
                style={{
                  textAlign: 'center',
                  marginTop: '1.5rem',
                  fontFamily: 'var(--font-jost)',
                  color: '#B5AFA8',
                  fontSize: '0.6rem',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                }}
              >
                We respond to all inquiries within 24 hours
              </p>
            </>
          )}
        </div>
      </section>

    </div>
  )
}
