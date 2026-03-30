'use client'
import { useState } from 'react'
import Link from 'next/link'
import LeadgenShell from '@/components/leadgen/LeadgenShell'

const CLIENTS = [
  { id: 1, name: 'Marcus Reid', agency: 'Reid Luxury Homes', email: 'marcus@reidluxury.com', phone: '(305) 882-4411', location: 'Miami, FL', niche: 'Luxury', plan: 'Performance', status: 'active', leads: 142, booked: 18, revenue: 4800, joined: 'Jan 2024', campaigns: 3, cpl: 33.80 },
  { id: 2, name: 'Sandra Okafor', agency: 'Okafor Properties', email: 'sandra@okaforprop.com', phone: '(512) 774-3302', location: 'Austin, TX', niche: 'Residential', plan: 'Monthly', status: 'active', leads: 98, booked: 11, revenue: 2200, joined: 'Feb 2024', campaigns: 2, cpl: 22.45 },
  { id: 3, name: 'David Chen', agency: 'BlueSky Commercial RE', email: 'david@blueskyRE.com', phone: '(619) 553-1277', location: 'San Diego, CA', niche: 'Commercial', plan: 'Performance', status: 'active', leads: 76, booked: 9, revenue: 3600, joined: 'Mar 2024', campaigns: 2, cpl: 47.37 },
  { id: 4, name: 'Priya Nair', agency: 'Nair Coastal Realty', email: 'priya@naircr.com', phone: '(404) 664-8823', location: 'Atlanta, GA', niche: 'Residential', plan: 'Monthly', status: 'paused', leads: 54, booked: 5, revenue: 1100, joined: 'Apr 2024', campaigns: 1, cpl: 20.37 },
  { id: 5, name: 'James Walker', agency: 'Walker & Sons Realty', email: 'james@walkerrealty.com', phone: '(720) 441-0923', location: 'Denver, CO', niche: 'Luxury', plan: 'Performance', status: 'active', leads: 119, booked: 15, revenue: 5200, joined: 'Dec 2023', campaigns: 4, cpl: 43.70 },
  { id: 6, name: 'Angela Moore', agency: 'Moore Prime Estates', email: 'angela@mooreprime.com', phone: '(973) 552-7741', location: 'Newark, NJ', niche: 'Residential', plan: 'Monthly', status: 'churned', leads: 32, booked: 2, revenue: 440, joined: 'May 2024', campaigns: 1, cpl: 13.75 },
]

const PLANS = [
  { name: 'Monthly Management', price: '$1,500/mo', desc: 'Fixed monthly fee. Includes up to 200 leads/mo, 2 active campaigns, full outreach management.' },
  { name: 'Performance-Based', price: '$35–$50/lead + $200/appt', desc: 'Pay only for results. Charged per qualified lead and per booked appointment.' },
  { name: 'One-Time Setup', price: '$800', desc: 'Account setup, integration config, first campaign launch. Add-on to any plan.' },
]

const EMPTY_CLIENT = { name: '', agency: '', email: '', phone: '', location: '', niche: 'Residential', plan: 'Monthly' }

function ClientsContent() {
  const [clients, setClients] = useState(CLIENTS)
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('all')
  const [selected, setSelected] = useState<typeof CLIENTS[0] | null>(null)
  const [showAdd, setShowAdd] = useState(false)
  const [form, setForm] = useState(EMPTY_CLIENT)
  const [toast, setToast] = useState('')

  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(''), 3000) }

  const filtered = clients.filter(c => {
    const matchSearch = c.name.toLowerCase().includes(search.toLowerCase()) || c.agency.toLowerCase().includes(search.toLowerCase())
    const matchFilter = filter === 'all' || c.status === filter
    return matchSearch && matchFilter
  })

  const addClient = () => {
    if (!form.name || !form.email) return
    const newClient = {
      id: clients.length + 1, ...form, status: 'active', leads: 0, booked: 0,
      revenue: 0, joined: new Date().toLocaleDateString('en-US',{month:'short',year:'numeric'}),
      campaigns: 0, cpl: 0
    }
    setClients(p => [...p, newClient])
    setForm(EMPTY_CLIENT)
    setShowAdd(false)
    showToast('Client added successfully')
  }

  const updateStatus = (id: number, status: string) => {
    setClients(p => p.map(c => c.id === id ? { ...c, status } : c))
    showToast(`Client status updated to ${status}`)
  }

  const removeClient = (id: number) => {
    setClients(p => p.filter(c => c.id !== id))
    setSelected(null)
    showToast('Client removed')
  }

  const totalRevenue = clients.reduce((a, c) => a + c.revenue, 0)
  const totalLeads = clients.reduce((a, c) => a + c.leads, 0)
  const totalBooked = clients.reduce((a, c) => a + c.booked, 0)
  const activeCount = clients.filter(c => c.status === 'active').length

  return (
    <div className="fade-in">
      {toast && <div className="toast">{toast}</div>}

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem' }}>
        <div>
          <h1 style={{ fontSize: '1.375rem', fontWeight: 700, color: '#F0F2F8' }}>Client Management</h1>
          <p style={{ color: '#8B92A5', fontSize: '0.8rem', marginTop: '0.2rem' }}>Manage all agency clients and their campaigns</p>
        </div>
        <button className="btn-primary" onClick={() => setShowAdd(true)} style={{ fontSize: '0.8rem', padding: '0.5rem 1rem' }}>
          <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
          Add Client
        </button>
      </div>

      {/* Summary stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(160px,1fr))', gap: '0.875rem', marginBottom: '1.5rem' }}>
        {[
          { label: 'Active Clients', value: activeCount, color: '#10B981' },
          { label: 'Total Revenue', value: `$${totalRevenue.toLocaleString()}`, color: '#F59E0B' },
          { label: 'Leads Generated', value: totalLeads.toLocaleString(), color: '#3B82F6' },
          { label: 'Appointments Booked', value: totalBooked, color: '#8B5CF6' },
        ].map(s => (
          <div key={s.label} className="card" style={{ padding: '1rem 1.25rem' }}>
            <div style={{ fontSize: '0.7rem', color: '#8B92A5', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.4rem' }}>{s.label}</div>
            <div style={{ fontSize: '1.5rem', fontWeight: 700, color: s.color }}>{s.value}</div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
        <input className="input" placeholder="Search clients..." value={search} onChange={e => setSearch(e.target.value)} style={{ width: 220 }} />
        {['all', 'active', 'paused', 'churned'].map(f => (
          <button key={f} onClick={() => setFilter(f)} style={{ padding: '0.35rem 0.875rem', fontSize: '0.75rem', borderRadius: 6, border: '1px solid', cursor: 'pointer', textTransform: 'capitalize', fontWeight: 500, transition: 'all 0.2s', background: filter === f ? '#3B82F6' : 'transparent', borderColor: filter === f ? '#3B82F6' : '#2A3040', color: filter === f ? '#fff' : '#8B92A5' }}>
            {f}
          </button>
        ))}
      </div>

      {/* Clients table */}
      <div className="card" style={{ overflow: 'hidden', marginBottom: '1.5rem' }}>
        <div style={{ overflowX: 'auto' }}>
          <table className="data-table">
            <thead>
              <tr><th>Client</th><th>Location</th><th>Niche</th><th>Plan</th><th>Leads</th><th>Booked</th><th>Revenue</th><th>Status</th><th>Actions</th></tr>
            </thead>
            <tbody>
              {filtered.map(c => (
                <tr key={c.id} style={{ cursor: 'pointer' }}>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                      <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'linear-gradient(135deg,#3B82F6,#8B5CF6)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: 700, color: '#fff', flexShrink: 0 }}>
                        {c.name.charAt(0)}
                      </div>
                      <div>
                        <div style={{ fontSize: '0.8rem', fontWeight: 600, color: '#F0F2F8' }}>{c.name}</div>
                        <div style={{ fontSize: '0.7rem', color: '#8B92A5' }}>{c.agency}</div>
                      </div>
                    </div>
                  </td>
                  <td>{c.location}</td>
                  <td>{c.niche}</td>
                  <td><span style={{ fontSize: '0.7rem', padding: '0.2rem 0.5rem', borderRadius: 4, background: c.plan === 'Performance' ? 'rgba(245,158,11,0.12)' : 'rgba(59,130,246,0.12)', color: c.plan === 'Performance' ? '#FCD34D' : '#93C5FD', fontWeight: 500 }}>{c.plan}</span></td>
                  <td style={{ color: '#3B82F6', fontWeight: 600 }}>{c.leads}</td>
                  <td style={{ color: '#10B981', fontWeight: 600 }}>{c.booked}</td>
                  <td style={{ color: '#F59E0B', fontWeight: 600 }}>${c.revenue.toLocaleString()}</td>
                  <td><span className={`badge badge-${c.status === 'active' ? 'hot' : c.status === 'paused' ? 'warm' : 'cold'}`}>{c.status}</span></td>
                  <td>
                    <div style={{ display: 'flex', gap: '0.4rem' }}>
                      <button className="btn-ghost" onClick={() => setSelected(c)} style={{ padding: '0.3rem 0.6rem', fontSize: '0.7rem' }}>View</button>
                      <button className="btn-ghost" onClick={() => updateStatus(c.id, c.status === 'active' ? 'paused' : 'active')} style={{ padding: '0.3rem 0.6rem', fontSize: '0.7rem' }}>
                        {c.status === 'active' ? 'Pause' : 'Activate'}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pricing plans */}
      <div className="card" style={{ padding: '1.25rem' }}>
        <div style={{ fontSize: '0.875rem', fontWeight: 600, color: '#F0F2F8', marginBottom: '1rem' }}>Billing Plans</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(240px,1fr))', gap: '1rem' }}>
          {PLANS.map(p => (
            <div key={p.name} style={{ padding: '1rem', borderRadius: 8, border: '1px solid #2A3040', background: '#0A0C10' }}>
              <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#F0F2F8', marginBottom: '0.3rem' }}>{p.name}</div>
              <div style={{ fontSize: '1rem', fontWeight: 700, color: '#F59E0B', marginBottom: '0.5rem' }}>{p.price}</div>
              <div style={{ fontSize: '0.75rem', color: '#8B92A5', lineHeight: 1.6 }}>{p.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Client detail modal */}
      {selected && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
          <div className="card" style={{ width: '100%', maxWidth: 600, maxHeight: '90vh', overflowY: 'auto', padding: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.875rem' }}>
                <div style={{ width: 48, height: 48, borderRadius: '50%', background: 'linear-gradient(135deg,#3B82F6,#8B5CF6)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.125rem', fontWeight: 700, color: '#fff' }}>{selected.name.charAt(0)}</div>
                <div>
                  <div style={{ fontSize: '1rem', fontWeight: 700, color: '#F0F2F8' }}>{selected.name}</div>
                  <div style={{ fontSize: '0.8rem', color: '#8B92A5' }}>{selected.agency}</div>
                </div>
              </div>
              <button className="btn-ghost" onClick={() => setSelected(null)} style={{ padding: '0.3rem 0.6rem' }}>
                <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '1.25rem' }}>
              {[
                ['Email', selected.email], ['Phone', selected.phone],
                ['Location', selected.location], ['Niche', selected.niche],
                ['Plan', selected.plan], ['Joined', selected.joined],
              ].map(([k, v]) => (
                <div key={k} style={{ padding: '0.75rem', background: '#0A0C10', borderRadius: 6, border: '1px solid #1E2330' }}>
                  <div style={{ fontSize: '0.68rem', color: '#4A5168', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.25rem' }}>{k}</div>
                  <div style={{ fontSize: '0.8rem', color: '#F0F2F8', fontWeight: 500 }}>{v}</div>
                </div>
              ))}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '0.75rem', marginBottom: '1.25rem' }}>
              {[
                { l: 'Leads', v: selected.leads, c: '#3B82F6' },
                { l: 'Booked', v: selected.booked, c: '#10B981' },
                { l: 'Revenue', v: `$${selected.revenue.toLocaleString()}`, c: '#F59E0B' },
                { l: 'Cost/Lead', v: `$${selected.cpl}`, c: '#8B5CF6' },
              ].map(s => (
                <div key={s.l} style={{ padding: '0.875rem', background: '#0A0C10', borderRadius: 6, border: '1px solid #1E2330', textAlign: 'center' }}>
                  <div style={{ fontSize: '0.68rem', color: '#4A5168', marginBottom: '0.3rem' }}>{s.l}</div>
                  <div style={{ fontSize: '1.25rem', fontWeight: 700, color: s.c }}>{s.v}</div>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
              <button className="btn-ghost" onClick={() => removeClient(selected.id)} style={{ fontSize: '0.8rem', color: '#F43F5E', borderColor: 'rgba(244,63,94,0.3)' }}>Remove Client</button>
              <button className="btn-ghost" onClick={() => setSelected(null)} style={{ fontSize: '0.8rem' }}>Close</button>
              <button className="btn-primary" onClick={() => { showToast('Report exported'); }} style={{ fontSize: '0.8rem' }}>
                Export Report
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add client modal */}
      {showAdd && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
          <div className="card" style={{ width: '100%', maxWidth: 480, padding: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
              <div style={{ fontSize: '1rem', fontWeight: 700, color: '#F0F2F8' }}>Add New Client</div>
              <button className="btn-ghost" onClick={() => setShowAdd(false)} style={{ padding: '0.3rem 0.6rem' }}>
                <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              </button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
              {[['name','Full Name','text'],['agency','Agency Name','text'],['email','Email Address','email'],['phone','Phone Number','tel'],['location','Location (City, State)','text']].map(([field, label, type]) => (
                <div key={field}>
                  <label style={{ fontSize: '0.75rem', color: '#8B92A5', display: 'block', marginBottom: '0.3rem' }}>{label}</label>
                  <input className="input" type={type} value={(form as any)[field]} onChange={e => setForm(p => ({ ...p, [field]: e.target.value }))} placeholder={label} />
                </div>
              ))}
              <div>
                <label style={{ fontSize: '0.75rem', color: '#8B92A5', display: 'block', marginBottom: '0.3rem' }}>Real Estate Niche</label>
                <select className="input" value={form.niche} onChange={e => setForm(p => ({ ...p, niche: e.target.value }))}>
                  {['Residential','Luxury','Commercial','Rental','Land'].map(n => <option key={n}>{n}</option>)}
                </select>
              </div>
              <div>
                <label style={{ fontSize: '0.75rem', color: '#8B92A5', display: 'block', marginBottom: '0.3rem' }}>Billing Plan</label>
                <select className="input" value={form.plan} onChange={e => setForm(p => ({ ...p, plan: e.target.value }))}>
                  <option>Monthly</option><option>Performance</option>
                </select>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end', marginTop: '1.25rem' }}>
              <button className="btn-ghost" onClick={() => setShowAdd(false)} style={{ fontSize: '0.8rem' }}>Cancel</button>
              <button className="btn-primary" onClick={addClient} style={{ fontSize: '0.8rem' }}>Add Client</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default function ClientsPage() {
  return <LeadgenShell><ClientsContent /></LeadgenShell>
}
