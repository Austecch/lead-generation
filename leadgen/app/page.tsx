import Link from 'next/link'

export default function RootPage() {
  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(to bottom right, #0f172a, #581c87, #0f172a)', color: 'white', padding: '80px 20px' }}>
      <div style={{ maxWidth: '56rem', margin: '0 auto', textAlign: 'center' }}>
        <h1 style={{ fontSize: '3rem', fontWeight: 'bold', marginBottom: '24px' }}>
          Emily Experience
        </h1>
        
        <h2 style={{ fontSize: '2rem', background: 'linear-gradient(to right, #fbbf24, #fde047, #fbbf24)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: '24px' }}>
          Lead Generation Platform
        </h2>
        
        <p style={{ fontSize: '1.25rem', color: '#cbd5e1', marginBottom: '48px', maxWidth: '42rem', margin: '0 auto 48px' }}>
          Complete lead capture, scoring, email automation, and consultation booking system
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '24px', marginBottom: '48px' }}>
          <Link
            href="/leadgen/checklist"
            style={{ padding: '16px 32px', background: 'linear-gradient(to right, #fbbf24, #f59e0b)', color: '#1e293b', fontWeight: 'bold', borderRadius: '8px', textDecoration: 'none', display: 'inline-block' }}
          >
            Event Planning Checklist →
          </Link>
          
          <Link
            href="/leadgen/calculator"
            style={{ padding: '16px 32px', background: 'linear-gradient(to right, #a855f7, #9333ea)', color: 'white', fontWeight: 'bold', borderRadius: '8px', textDecoration: 'none', display: 'inline-block' }}
          >
            Budget Calculator →
          </Link>
          
          <Link
            href="/leadgen/guide"
            style={{ padding: '16px 32px', background: 'linear-gradient(to right, #3b82f6, #1d4ed8)', color: 'white', fontWeight: 'bold', borderRadius: '8px', textDecoration: 'none', display: 'inline-block' }}
          >
            Vendor Selection Guide →
          </Link>
          
          <Link
            href="/leadgen/consultation"
            style={{ padding: '16px 32px', background: 'linear-gradient(to right, #10b981, #059669)', color: 'white', fontWeight: 'bold', borderRadius: '8px', textDecoration: 'none', display: 'inline-block' }}
          >
            Free Consultation →
          </Link>
        </div>

        <Link
          href="/leadgen/dashboard"
          style={{ padding: '12px 24px', background: '#475569', color: '#f1f5f9', fontWeight: '600', borderRadius: '8px', textDecoration: 'none', display: 'inline-block' }}
        >
          Dashboard (Admin)
        </Link>

        <p style={{ color: '#94a3b8', fontSize: '0.875rem', marginTop: '48px' }}>
          ✅ API endpoints • ✅ Email automation • ✅ Lead scoring • ✅ Analytics
        </p>
      </div>
    </div>
  )
}
