'use client'
import { useState } from 'react'
import LeadgenShell from '@/components/leadgen/LeadgenShell'

const stats = [
  { label: 'Total Leads',       value: '2,847',  change: '+12.4%', up: true,  accent: '#3B82F6', cls: 'stat-card-blue' },
  { label: 'Hot Leads',         value: '341',    change: '+8.1%',  up: true,  accent: '#F43F5E', cls: 'stat-card-rose' },
  { label: 'Outreach Sent',     value: '18,492', change: '+23.7%', up: true,  accent: '#8B5CF6', cls: 'stat-card-violet' },
  { label: 'Reply Rate',        value: '14.2%',  change: '+2.1%',  up: true,  accent: '#10B981', cls: 'stat-card-green' },
  { label: 'Booked Appts',      value: '87',     change: '+18.5%', up: true,  accent: '#F59E0B', cls: 'stat-card-amber' },
  { label: 'Conversion Rate',   value: '3.1%',   change: '-0.3%',  up: false, accent: '#10B981', cls: 'stat-card-green' },
]

const recentLeads = [
  { name: 'The Prestige Group',  location: 'Miami, FL',       niche: 'Luxury',     score: 92, status: 'hot',  channel: 'LinkedIn' },
  { name: 'Sunrise Realty Co.',  location: 'Austin, TX',      niche: 'Residential',score: 76, status: 'warm', channel: 'Google'   },
  { name: 'Harbor View Homes',   location: 'San Diego, CA',   niche: 'Coastal',    score: 88, status: 'hot',  channel: 'Instagram'},
  { name: 'Apex Real Estate LLC',location: 'Atlanta, GA',     niche: 'Commercial', score: 54, status: 'cold', channel: 'Google'   },
  { name: 'Prime Properties NJ', location: 'Newark, NJ',      niche: 'Residential',score: 81, status: 'warm', channel: 'LinkedIn' },
  { name: 'BlueSky Brokers',     location: 'Denver, CO',      niche: 'Luxury',     score: 95, status: 'hot',  channel: 'LinkedIn' },
]

const recentActivity = [
  { time: '2 min ago',  text: 'AI generated outreach for The Prestige Group',  type: 'ai'      },
  { time: '8 min ago',  text: 'Harbor View Homes replied — marked Interested',  type: 'reply'   },
  { time: '15 min ago', text: '24 new leads discovered from Miami, FL',         type: 'discover'},
  { time: '1h ago',     text: 'BlueSky Brokers booked a call — Thursday 3pm',   type: 'booked'  },
  { time: '2h ago',     text: 'Follow-up sequence triggered for 12 warm leads', type: 'followup'},
  { time: '3h ago',     text: 'Sunrise Realty opened your email (tracked)',      type: 'open'    },
]

const monthlyData = [
  { month: 'Jan', leads: 180, outreach: 820, replies: 92, booked: 8  },
  { month: 'Feb', leads: 220, outreach: 1100,replies: 118,booked: 11 },
  { month: 'Mar', leads: 310, outreach: 1450,replies: 167,booked: 16 },
  { month: 'Apr', leads: 280, outreach: 1300,replies: 142,booked: 14 },
  { month: 'May', leads: 400, outreach: 1900,replies: 210,booked: 22 },
  { month: 'Jun', leads: 460, outreach: 2200,replies: 248,booked: 28 },
  { month: 'Jul', leads: 520, outreach: 2600,replies: 298,booked: 33 },
]

const channelBreakdown = [
  { label: 'LinkedIn',  pct: 42, color: '#3B82F6', count: '1,196' },
  { label: 'Google',    pct: 31, color: '#10B981', count: '882'   },
  { label: 'Instagram', pct: 18, color: '#8B5CF6', count: '512'   },
  { label: 'Directories', pct: 9, color: '#F59E0B', count: '257'  },
]

function ActivityIcon({ type }: { type: string }) {
  const map: Record<string, { icon: string; color: string }> = {
    ai:       { icon: '🤖', color: '#8B5CF6' },
    reply:    { icon: '💬', color: '#10B981' },
    discover: { icon: '🔍', color: '#3B82F6' },
    booked:   { icon: '📅', color: '#F59E0B' },
    followup: { icon: '🔄', color: '#F43F5E' },
    open:     { icon: '👁',  color: '#6366F1' },
  }
  const { color } = map[type] || { color: '#4A5168' }
  const icons: Record<string, JSX.Element> = {
    ai:       <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></svg>,
    reply:    <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>,
    discover: <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>,
    booked:   <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>,
    followup: <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 .49-4.5"/></svg>,
    open:     <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>,
  }
  return <div style={{ width: 26, height: 26, borderRadius: '50%', background: `${color}22`, border: `1px solid ${color}44`, display: 'flex', alignItems: 'center', justifyContent: 'center', color, flexShrink: 0 }}>{icons[type]}</div>
}

function DashboardContent() {
  const [chartMetric, setChartMetric] = useState<'leads'|'outreach'|'replies'|'booked'>('leads')

  const maxVal = Math.max(...monthlyData.map(d => d[chartMetric]))

  const metricColors: Record<string, string> = {
    leads: '#3B82F6', outreach: '#8B5CF6', replies: '#10B981', booked: '#F59E0B'
  }

  return (
    <div className="fade-in">
      {/* Page header */}
      <div style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '1.375rem', fontWeight: 700, color: '#F0F2F8' }}>Command Center</h1>
          <p style={{ color: '#8B92A5', fontSize: '0.8rem', marginTop: '0.2rem' }}>Real-time overview of your lead generation pipeline</p>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button className="btn-ghost" style={{ fontSize: '0.75rem', padding: '0.4rem 0.875rem' }}>
            <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>
            This Month
          </button>
          <button className="btn-primary" style={{ fontSize: '0.75rem', padding: '0.4rem 0.875rem' }}>
            <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
            Launch Campaign
          </button>
        </div>
      </div>

      {/* Stats grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(180px,1fr))', gap: '0.875rem', marginBottom: '1.5rem' }}>
        {stats.map(s => (
          <div key={s.label} className={`card ${s.cls}`} style={{ padding: '1.125rem 1.25rem' }}>
            <div style={{ fontSize: '0.7rem', color: '#8B92A5', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.5rem' }}>{s.label}</div>
            <div style={{ fontSize: '1.625rem', fontWeight: 700, color: '#F0F2F8', lineHeight: 1, marginBottom: '0.5rem' }}>{s.value}</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
              <span style={{ color: s.up ? '#10B981' : '#F43F5E', fontSize: '0.72rem', fontWeight: 600 }}>{s.change}</span>
              <span style={{ color: '#4A5168', fontSize: '0.7rem' }}>vs last month</span>
            </div>
          </div>
        ))}
      </div>

      {/* Charts row */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: '1rem', marginBottom: '1.5rem' }}>
        {/* Bar chart */}
        <div className="card" style={{ padding: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '0.75rem' }}>
            <div>
              <div style={{ fontSize: '0.875rem', fontWeight: 600, color: '#F0F2F8' }}>Performance Overview</div>
              <div style={{ fontSize: '0.72rem', color: '#8B92A5', marginTop: '0.1rem' }}>Monthly trend — last 7 months</div>
            </div>
            <div style={{ display: 'flex', gap: '0.25rem' }}>
              {(['leads','outreach','replies','booked'] as const).map(m => (
                <button key={m} onClick={() => setChartMetric(m)} style={{ padding: '0.3rem 0.625rem', fontSize: '0.7rem', fontWeight: 500, borderRadius: 4, border: 'none', cursor: 'pointer', background: chartMetric === m ? metricColors[m] : '#1E2330', color: chartMetric === m ? '#fff' : '#8B92A5', transition: 'all 0.2s', textTransform: 'capitalize' }}>{m}</button>
              ))}
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: '0.5rem', height: 160 }}>
            {monthlyData.map(d => {
              const pct = (d[chartMetric] / maxVal) * 100
              return (
                <div key={d.month} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', height: '100%', justifyContent: 'flex-end' }}>
                  <div style={{ fontSize: '0.6rem', color: '#8B92A5', fontWeight: 600 }}>{d[chartMetric].toLocaleString()}</div>
                  <div style={{ width: '100%', height: `${pct}%`, minHeight: 4, background: `${metricColors[chartMetric]}`, borderRadius: '3px 3px 0 0', transition: 'height 0.5s ease', opacity: 0.85 }} />
                  <div style={{ fontSize: '0.65rem', color: '#4A5168', fontWeight: 500 }}>{d.month}</div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Channel breakdown */}
        <div className="card" style={{ padding: '1.25rem' }}>
          <div style={{ fontSize: '0.875rem', fontWeight: 600, color: '#F0F2F8', marginBottom: '0.4rem' }}>Lead Sources</div>
          <div style={{ fontSize: '0.72rem', color: '#8B92A5', marginBottom: '1.25rem' }}>Breakdown by channel</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {channelBreakdown.map(c => (
              <div key={c.label}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.35rem' }}>
                  <span style={{ fontSize: '0.775rem', color: '#F0F2F8', fontWeight: 500 }}>{c.label}</span>
                  <span style={{ fontSize: '0.72rem', color: '#8B92A5' }}>{c.count} ({c.pct}%)</span>
                </div>
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: `${c.pct}%`, background: c.color }} />
                </div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: '1.5rem', padding: '0.875rem', background: '#0A0C10', borderRadius: 6, border: '1px solid #1E2330' }}>
            <div style={{ fontSize: '0.7rem', color: '#8B92A5', marginBottom: '0.25rem' }}>Top Performing</div>
            <div style={{ fontSize: '1.125rem', fontWeight: 700, color: '#3B82F6' }}>LinkedIn</div>
            <div style={{ fontSize: '0.7rem', color: '#8B92A5' }}>42% of all discovered leads</div>
          </div>
        </div>
      </div>

      {/* Bottom row */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '1rem' }}>
        {/* Recent leads table */}
        <div className="card" style={{ overflow: 'hidden' }}>
          <div style={{ padding: '1.125rem 1.25rem', borderBottom: '1px solid #1E2330', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ fontSize: '0.875rem', fontWeight: 600, color: '#F0F2F8' }}>Recent Leads</div>
            <a href="/leadgen/leads" style={{ fontSize: '0.72rem', color: '#3B82F6', textDecoration: 'none' }}>View all →</a>
          </div>
          <div style={{ overflowX: 'auto' }}>
            <table className="data-table">
              <thead>
                <tr>
                  <th>Business</th><th>Location</th><th>Niche</th><th>Score</th><th>Status</th><th>Source</th>
                </tr>
              </thead>
              <tbody>
                {recentLeads.map(l => (
                  <tr key={l.name}>
                    <td style={{ color: '#F0F2F8', fontWeight: 500 }}>{l.name}</td>
                    <td>{l.location}</td>
                    <td>{l.niche}</td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                        <div style={{ width: 32, height: 4, borderRadius: 2, background: '#1E2330', overflow: 'hidden' }}>
                          <div style={{ width: `${l.score}%`, height: '100%', background: l.score >= 80 ? '#10B981' : l.score >= 60 ? '#F59E0B' : '#F43F5E', borderRadius: 2 }} />
                        </div>
                        <span style={{ fontSize: '0.75rem', fontWeight: 600, color: l.score >= 80 ? '#34D399' : l.score >= 60 ? '#FCD34D' : '#F87171' }}>{l.score}</span>
                      </div>
                    </td>
                    <td><span className={`badge badge-${l.status}`}>{l.status}</span></td>
                    <td style={{ fontSize: '0.72rem' }}>{l.channel}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Activity feed */}
        <div className="card" style={{ padding: '1.125rem 1.25rem' }}>
          <div style={{ fontSize: '0.875rem', fontWeight: 600, color: '#F0F2F8', marginBottom: '1rem' }}>Live Activity</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
            {recentActivity.map((a, i) => (
              <div key={i} style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                <ActivityIcon type={a.type} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: '0.775rem', color: '#D1D5DB', lineHeight: 1.4 }}>{a.text}</div>
                  <div style={{ fontSize: '0.68rem', color: '#4A5168', marginTop: '0.2rem' }}>{a.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function DashboardPage() {
  return <LeadgenShell><DashboardContent /></LeadgenShell>
}
