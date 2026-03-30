'use client'
import { useState } from 'react'
import LeadgenShell from '@/components/leadgen/LeadgenShell'

const monthly = [
  { month: 'Jan', leads: 180, outreach: 820, replies: 92, booked: 8, revenue: 2800 },
  { month: 'Feb', leads: 220, outreach: 1100, replies: 118, booked: 11, revenue: 3850 },
  { month: 'Mar', leads: 310, outreach: 1450, replies: 167, booked: 16, revenue: 5600 },
  { month: 'Apr', leads: 280, outreach: 1300, replies: 142, booked: 14, revenue: 4900 },
  { month: 'May', leads: 400, outreach: 1900, replies: 210, booked: 22, revenue: 7700 },
  { month: 'Jun', leads: 460, outreach: 2200, replies: 248, booked: 28, revenue: 9800 },
  { month: 'Jul', leads: 520, outreach: 2600, replies: 298, booked: 33, revenue: 11550 },
]

const niches = [
  { label: 'Luxury',      leads: 841, pct: 29, color: '#F59E0B' },
  { label: 'Residential', leads: 1104, pct: 38, color: '#3B82F6' },
  { label: 'Commercial',  leads: 520, pct: 18, color: '#8B5CF6' },
  { label: 'Rental',      leads: 290, pct: 10, color: '#10B981' },
  { label: 'Land',        leads: 92,  pct: 3,  color: '#F43F5E' },
  { label: 'Other',       leads: 0,   pct: 2,  color: '#4A5168' },
]

const channels = [
  { label: 'LinkedIn',    sent: 8420, opened: 3200, replied: 780, booked: 54, color: '#3B82F6' },
  { label: 'Gmail',       sent: 6100, opened: 2440, replied: 560, booked: 38, color: '#10B981' },
  { label: 'Instagram',   sent: 2800, opened: 1120, replied: 224, booked: 14, color: '#8B5CF6' },
  { label: 'Directories', sent: 1172, opened: 469,  replied: 88,  booked: 6,  color: '#F59E0B' },
]

const METRICS: Array<{ key: keyof typeof monthly[0]; label: string; color: string }> = [
  { key: 'leads',    label: 'Leads',    color: '#3B82F6' },
  { key: 'outreach', label: 'Outreach', color: '#8B5CF6' },
  { key: 'replies',  label: 'Replies',  color: '#10B981' },
  { key: 'booked',   label: 'Booked',   color: '#F59E0B' },
  { key: 'revenue',  label: 'Revenue',  color: '#F43F5E' },
]

function AnalyticsContent() {
  const [metric, setMetric] = useState<keyof typeof monthly[0]>('leads')
  const active = METRICS.find(m => m.key === metric)!
  const maxVal = Math.max(...monthly.map(d => d[metric] as number))
  const totals = monthly.reduce((a, d) => ({
    leads: a.leads + d.leads, outreach: a.outreach + d.outreach,
    replies: a.replies + d.replies, booked: a.booked + d.booked, revenue: a.revenue + d.revenue,
  }), { leads: 0, outreach: 0, replies: 0, booked: 0, revenue: 0 })

  return (
    <div className="fade-in">
      <div style={{ marginBottom: '1.5rem' }}>
        <h1 style={{ fontSize: '1.375rem', fontWeight: 700, color: '#F0F2F8' }}>Analytics</h1>
        <p style={{ color: '#8B92A5', fontSize: '0.8rem', marginTop: '0.2rem' }}>Performance data across all clients and campaigns</p>
      </div>

      {/* KPI row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(160px,1fr))', gap: '0.875rem', marginBottom: '1.5rem' }}>
        {[
          { l: 'Total Leads',    v: totals.leads.toLocaleString(),    c: '#3B82F6' },
          { l: 'Total Outreach', v: totals.outreach.toLocaleString(), c: '#8B5CF6' },
          { l: 'Total Replies',  v: totals.replies.toLocaleString(),  c: '#10B981' },
          { l: 'Appointments',   v: totals.booked,                    c: '#F59E0B' },
          { l: 'Revenue',        v: `$${totals.revenue.toLocaleString()}`, c: '#F43F5E' },
          { l: 'Reply Rate',     v: `${((totals.replies / totals.outreach) * 100).toFixed(1)}%`, c: '#10B981' },
        ].map(s => (
          <div key={s.l} className="card" style={{ padding: '1rem 1.25rem' }}>
            <div style={{ fontSize: '0.7rem', color: '#8B92A5', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.4rem' }}>{s.l}</div>
            <div style={{ fontSize: '1.5rem', fontWeight: 700, color: s.c }}>{s.v}</div>
          </div>
        ))}
      </div>

      {/* Main chart */}
      <div className="card" style={{ padding: '1.25rem', marginBottom: '1.25rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '0.75rem' }}>
          <div>
            <div style={{ fontSize: '0.875rem', fontWeight: 600, color: '#F0F2F8' }}>Trend Analysis</div>
            <div style={{ fontSize: '0.72rem', color: '#8B92A5', marginTop: '0.1rem' }}>Jan – Jul 2024 · 7-month overview</div>
          </div>
          <div style={{ display: 'flex', gap: '0.25rem', flexWrap: 'wrap' }}>
            {METRICS.map(m => (
              <button key={m.key} onClick={() => setMetric(m.key)} style={{ padding: '0.3rem 0.7rem', fontSize: '0.7rem', fontWeight: 500, borderRadius: 4, border: 'none', cursor: 'pointer', transition: 'all 0.2s', background: metric === m.key ? m.color : '#1E2330', color: metric === m.key ? '#fff' : '#8B92A5' }}>{m.label}</button>
            ))}
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: '0.75rem', height: 200 }}>
          {monthly.map(d => {
            const pct = ((d[metric] as number) / maxVal) * 100
            return (
              <div key={d.month} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', height: '100%', justifyContent: 'flex-end' }}>
                <div style={{ fontSize: '0.62rem', color: '#8B92A5', fontWeight: 600 }}>{metric === 'revenue' ? `$${((d[metric] as number)/1000).toFixed(1)}k` : (d[metric] as number).toLocaleString()}</div>
                <div style={{ width: '100%', height: `${pct}%`, minHeight: 4, background: active.color, borderRadius: '3px 3px 0 0', transition: 'height 0.5s ease', opacity: 0.85 }} />
                <div style={{ fontSize: '0.65rem', color: '#4A5168', fontWeight: 500 }}>{d.month}</div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Bottom row */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
        {/* Channel performance */}
        <div className="card" style={{ overflow: 'hidden' }}>
          <div style={{ padding: '1rem 1.25rem', borderBottom: '1px solid #1E2330', fontSize: '0.875rem', fontWeight: 600, color: '#F0F2F8' }}>Channel Performance</div>
          <div style={{ overflowX: 'auto' }}>
            <table className="data-table">
              <thead><tr><th>Channel</th><th>Sent</th><th>Opened</th><th>Replied</th><th>Booked</th><th>Conv%</th></tr></thead>
              <tbody>
                {channels.map(c => (
                  <tr key={c.label}>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <div style={{ width: 8, height: 8, borderRadius: '50%', background: c.color, flexShrink: 0 }} />
                        <span style={{ color: '#F0F2F8', fontWeight: 500 }}>{c.label}</span>
                      </div>
                    </td>
                    <td>{c.sent.toLocaleString()}</td>
                    <td style={{ color: '#93C5FD' }}>{c.opened.toLocaleString()}</td>
                    <td style={{ color: '#34D399' }}>{c.replied.toLocaleString()}</td>
                    <td style={{ color: '#FCD34D', fontWeight: 600 }}>{c.booked}</td>
                    <td style={{ color: '#A78BFA' }}>{((c.booked / c.sent) * 100).toFixed(2)}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Niche breakdown */}
        <div className="card" style={{ padding: '1.25rem' }}>
          <div style={{ fontSize: '0.875rem', fontWeight: 600, color: '#F0F2F8', marginBottom: '1.25rem' }}>Leads by Niche</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
            {niches.map(n => (
              <div key={n.label}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.3rem' }}>
                  <span style={{ fontSize: '0.775rem', color: '#F0F2F8', fontWeight: 500 }}>{n.label}</span>
                  <span style={{ fontSize: '0.72rem', color: '#8B92A5' }}>{n.leads.toLocaleString()} leads ({n.pct}%)</span>
                </div>
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: `${n.pct}%`, background: n.color }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function AnalyticsPage() {
  return <LeadgenShell><AnalyticsContent /></LeadgenShell>
}
