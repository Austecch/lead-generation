'use client'

import { useState } from 'react'
import { Mail, Phone, MapPin, Instagram, Facebook, Youtube, Check, Send, AlertCircle } from 'lucide-react'

type FormState = {
  name: string
  email: string
  phone: string
  eventType: string
  eventDate: string
  message: string
}

const initialForm: FormState = {
  name: '', email: '', phone: '', eventType: '', eventDate: '', message: '',
}

export default function ContactPage() {
  const [form, setForm] = useState<FormState>(initialForm)
  const [errors, setErrors] = useState<Partial<FormState>>({})
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle')

  const update = (field: keyof FormState, value: string) => {
    setForm(p => ({ ...p, [field]: value }))
    if (errors[field]) setErrors(p => ({ ...p, [field]: '' }))
  }

  const validate = () => {
    const e: Partial<FormState> = {}
    if (!form.name.trim()) e.name = 'Name is required'
    if (!form.email.trim()) e.email = 'Email is required'
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Enter a valid email'
    if (!form.message.trim()) e.message = 'Please tell us about your event'
    return e
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length > 0) { setErrors(errs); return }
    setStatus('submitting')
    setTimeout(() => { setStatus('success') }, 1400)
  }

  const field = (label: string, key: keyof FormState, props: React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> = {}) => (
    <div>
      <label style={{ display: 'block', fontFamily: 'var(--font-sans)', color: '#7A7068', fontSize: '0.6rem', letterSpacing: '0.25em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
        {label} {props.required && <span style={{ color: '#C9A84C' }}>*</span>}
      </label>
      {props.rows ? (
        <textarea
          {...(props as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
          value={form[key]}
          onChange={e => update(key, e.target.value)}
          style={{ width: '100%', background: '#FFFDF7', border: `1px solid ${errors[key] ? '#D97070' : '#E2D9CC'}`, padding: '0.85rem 1rem', fontSize: '0.87rem', color: '#2C2C2C', fontFamily: 'var(--font-sans)', fontWeight: 300, outline: 'none', resize: 'none', transition: 'border-color 0.3s' }}
        />
      ) : (
        <input
          {...(props as React.InputHTMLAttributes<HTMLInputElement>)}
          value={form[key]}
          onChange={e => update(key, e.target.value)}
          style={{ width: '100%', background: '#FFFDF7', border: `1px solid ${errors[key] ? '#D97070' : '#E2D9CC'}`, padding: '0.85rem 1rem', fontSize: '0.87rem', color: '#2C2C2C', fontFamily: 'var(--font-sans)', fontWeight: 300, outline: 'none', transition: 'border-color 0.3s' }}
        />
      )}
      {errors[key] && (
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginTop: '0.4rem' }}>
          <AlertCircle size={11} style={{ color: '#D97070', flexShrink: 0 }} />
          <span style={{ fontSize: '0.72rem', color: '#D97070', fontFamily: 'var(--font-sans)' }}>{errors[key]}</span>
        </div>
      )}
    </div>
  )

  return (
    <div>
      {/* HERO */}
      <section style={{ position: 'relative', minHeight: '55vh', background: '#1C1610', paddingTop: 'calc(76px + 6rem)', paddingBottom: '6rem', paddingLeft: 'clamp(1.5rem, 6vw, 7rem)', paddingRight: 'clamp(1.5rem, 6vw, 7rem)' }}>
        <img
          src="https://images.unsplash.com/photo-1469371670807-013ccf25f16a?w=1920&h=800&fit=crop"
          alt="Elegant event venue"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.18 }}
        />
        <div style={{ position: 'relative', zIndex: 10, maxWidth: 760 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2rem' }}>
            <div style={{ width: 40, height: 1, background: '#C9A84C' }} />
            <span style={{ fontFamily: 'var(--font-sans)', color: '#C9A84C', fontSize: '0.6rem', letterSpacing: '0.4em', textTransform: 'uppercase' }}>Get In Touch</span>
          </div>
          <h1 style={{ fontFamily: 'var(--font-serif)', color: '#FFFDF7', fontSize: 'clamp(3rem, 8vw, 6rem)', lineHeight: 1.05, fontWeight: 400, marginBottom: '1.75rem' }}>
            Let&apos;s Plan<br /><em style={{ color: '#C9A84C' }}>Your Experience</em>
          </h1>
          <p style={{ color: '#B5AFA8', fontFamily: 'var(--font-sans)', fontWeight: 300, lineHeight: 1.9, fontSize: '1rem', maxWidth: 500 }}>
            Whether you have a question, want to check availability, or are ready to start planning — the Emmeli Experience team is here for you.
          </p>
        </div>
      </section>

      {/* BODY */}
      <section style={{ background: '#FAF6EF', paddingTop: '7rem', paddingBottom: '7rem', paddingLeft: 'clamp(1.5rem, 6vw, 7rem)', paddingRight: 'clamp(1.5rem, 6vw, 7rem)' }}>
        <div style={{ maxWidth: 1300, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '5rem', alignItems: 'flex-start' }}>

          {/* LEFT: Info */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
            <div>
              <h2 style={{ fontFamily: 'var(--font-serif)', color: '#2C2C2C', fontSize: 'clamp(1.8rem, 3vw, 2.5rem)', fontWeight: 400, lineHeight: 1.2, marginBottom: '1.25rem' }}>
                We&apos;d Love to<br /><em style={{ color: '#C9A84C' }}>Hear From You</em>
              </h2>
              <p style={{ color: '#7A7068', fontFamily: 'var(--font-sans)', fontWeight: 300, lineHeight: 1.9, fontSize: '0.9rem' }}>
                Share your vision, ask a question, or simply say hello. We respond within 24 hours on business days.
              </p>
            </div>

            {/* Contact details */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {[
                { icon: Phone, label: 'Call Us', value: '+1 (908) 555-0192', href: 'tel:+19085550192' },
                { icon: Mail, label: 'Email Us', value: 'hello@emmeliexperience.com', href: 'mailto:hello@emmeliexperience.com' },
                { icon: MapPin, label: 'Studio', value: '12 Prospect Street, Morristown, NJ 07960', href: '#map' },
              ].map(({ icon: Icon, label, value, href }) => (
                <a key={label} href={href} style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', textDecoration: 'none' }}>
                  <div style={{ width: 44, height: 44, border: '1px solid #E2D9CC', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, background: '#FFFDF7' }}>
                    <Icon size={16} style={{ color: '#C9A84C' }} />
                  </div>
                  <div>
                    <div style={{ fontFamily: 'var(--font-sans)', color: '#C9A84C', fontSize: '0.58rem', letterSpacing: '0.25em', textTransform: 'uppercase', marginBottom: '0.25rem' }}>{label}</div>
                    <span style={{ fontFamily: 'var(--font-sans)', color: '#2C2C2C', fontSize: '0.88rem', fontWeight: 300 }}>{value}</span>
                  </div>
                </a>
              ))}
            </div>

            {/* Hours */}
            <div style={{ background: '#FFFDF7', border: '1px solid #E2D9CC', padding: '2rem' }}>
              <div style={{ fontFamily: 'var(--font-sans)', color: '#C9A84C', fontSize: '0.58rem', letterSpacing: '0.25em', textTransform: 'uppercase', marginBottom: '1rem' }}>Studio Hours</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {[
                  ['Monday – Friday', '9:00 AM – 6:00 PM'],
                  ['Saturday', 'By Appointment'],
                  ['Sunday', 'Closed'],
                ].map(([day, hrs]) => (
                  <div key={day} style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #F0EBE3', paddingBottom: '0.5rem' }}>
                    <span style={{ fontFamily: 'var(--font-sans)', color: '#7A7068', fontSize: '0.83rem', fontWeight: 300 }}>{day}</span>
                    <span style={{ fontFamily: 'var(--font-sans)', color: '#2C2C2C', fontSize: '0.83rem', fontWeight: 400 }}>{hrs}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Socials */}
            <div>
              <div style={{ fontFamily: 'var(--font-sans)', color: '#C9A84C', fontSize: '0.58rem', letterSpacing: '0.25em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>Follow Our Journey</div>
              <div style={{ display: 'flex', gap: '0.75rem' }}>
                {[{ icon: Instagram, label: 'Instagram' }, { icon: Facebook, label: 'Facebook' }, { icon: Youtube, label: 'Youtube' }].map(({ icon: Icon, label }) => (
                  <a key={label} href="#" aria-label={label} style={{ width: 44, height: 44, border: '1px solid #E2D9CC', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#7A7068', background: '#FFFDF7', transition: 'all 0.3s' }}>
                    <Icon size={16} />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT: Form */}
          <div style={{ background: '#FFFDF7', border: '1px solid #E2D9CC', padding: 'clamp(2rem, 5vw, 3.5rem)' }}>
            {status === 'success' ? (
              <div style={{ textAlign: 'center', padding: '4rem 2rem' }}>
                <div style={{ width: 72, height: 72, borderRadius: '50%', background: 'linear-gradient(135deg, #9B7A2F, #C9A84C)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 2rem' }}>
                  <Check size={28} color="#FFFDF7" />
                </div>
                <h3 style={{ fontFamily: 'var(--font-serif)', color: '#2C2C2C', fontSize: '1.8rem', fontWeight: 400, marginBottom: '1rem' }}>Message Sent!</h3>
                <p style={{ fontFamily: 'var(--font-sans)', color: '#7A7068', fontWeight: 300, fontSize: '0.9rem', lineHeight: 1.9, marginBottom: '2rem' }}>
                  Thank you for reaching out to the Emmeli Experience team. We will be in touch within 24 hours.
                </p>
                <button onClick={() => { setForm(initialForm); setStatus('idle') }} style={{ fontFamily: 'var(--font-sans)', fontSize: '0.63rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#C9A84C', background: 'none', border: '1px solid #C9A84C', padding: '0.75rem 2rem', cursor: 'pointer' }}>
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate>
                <h3 style={{ fontFamily: 'var(--font-serif)', color: '#2C2C2C', fontSize: 'clamp(1.4rem, 2.5vw, 1.8rem)', fontWeight: 400, marginBottom: '0.5rem' }}>
                  Send Us a Message
                </h3>
                <p style={{ fontFamily: 'var(--font-sans)', color: '#B5AFA8', fontWeight: 300, fontSize: '0.85rem', marginBottom: '2.5rem', lineHeight: 1.7 }}>
                  Fields marked with <span style={{ color: '#C9A84C' }}>*</span> are required.
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1.5rem' }}>
                    {field('Full Name', 'name', { required: true, placeholder: 'Your full name' })}
                    {field('Email Address', 'email', { required: true, type: 'email', placeholder: 'hello@example.com' })}
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1.5rem' }}>
                    {field('Phone Number', 'phone', { type: 'tel', placeholder: '+1 (908) 555-0100' })}
                    <div>
                      <label style={{ display: 'block', fontFamily: 'var(--font-sans)', color: '#7A7068', fontSize: '0.6rem', letterSpacing: '0.25em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                        Event Type
                      </label>
                      <select
                        value={form.eventType}
                        onChange={e => update('eventType', e.target.value)}
                        style={{ width: '100%', background: '#FFFDF7', border: '1px solid #E2D9CC', padding: '0.85rem 1rem', fontSize: '0.87rem', color: form.eventType ? '#2C2C2C' : '#B5AFA8', fontFamily: 'var(--font-sans)', fontWeight: 300, outline: 'none' }}
                      >
                        <option value="">Select type...</option>
                        <option>Wedding</option>
                        <option>Corporate Event</option>
                        <option>Private Party</option>
                        <option>Rental Inquiry</option>
                        <option>Cleaning Service</option>
                        <option>Other</option>
                      </select>
                    </div>
                  </div>
                  {field('Preferred Event Date', 'eventDate', { type: 'date' })}
                  {field('Your Message', 'message', { required: true, placeholder: 'Tell us about your event, vision, or questions...', rows: 5 } as any)}
                  <button
                    type="submit"
                    disabled={status === 'submitting'}
                    style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', background: status === 'submitting' ? '#E2D9CC' : '#2C2C2C', color: '#FFFDF7', fontFamily: 'var(--font-sans)', fontSize: '0.63rem', letterSpacing: '0.2em', textTransform: 'uppercase', padding: '1.1rem 2.5rem', border: 'none', cursor: status === 'submitting' ? 'not-allowed' : 'pointer', transition: 'background 0.3s', width: '100%' }}
                  >
                    {status === 'submitting' ? (
                      <>
                        <span style={{ width: 14, height: 14, border: '2px solid #FFFDF7', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 0.6s linear infinite', display: 'inline-block' }} />
                        Sending...
                      </>
                    ) : (
                      <><Send size={13} /> Send Message</>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* MAP */}
      <section id="map" style={{ position: 'relative', height: 420, background: '#E8E0D5' }}>
        <iframe
          title="Emmeli Experience Studio - Morristown, NJ"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3020.7!2d-74.4809!3d40.7968!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c3a82e4e1f0c1f%3A0x1234567890abcdef!2sMorristown%2C%20NJ%2007960!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus"
          width="100%" height="100%"
          style={{ border: 0, filter: 'grayscale(20%) sepia(10%)' }}
          allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"
        />
        <div style={{ position: 'absolute', bottom: '2rem', left: 'clamp(1.5rem, 6vw, 4rem)', zIndex: 10 }}>
          <div style={{ background: '#FFFDF7', border: '1px solid #E2D9CC', padding: '1.1rem 1.5rem', boxShadow: '0 8px 32px rgba(44,44,44,0.12)' }}>
            <div style={{ fontFamily: 'var(--font-sans)', color: '#C9A84C', fontSize: '0.55rem', letterSpacing: '0.25em', textTransform: 'uppercase', marginBottom: '0.3rem' }}>Our Studio</div>
            <div style={{ fontFamily: 'var(--font-serif)', color: '#2C2C2C', fontSize: '0.9rem' }}>12 Prospect Street, Morristown, NJ 07960</div>
          </div>
        </div>
      </section>
    </div>
  )
}
