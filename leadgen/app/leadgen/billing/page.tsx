'use client'
import { useState } from 'react'
import LeadgenShell from '@/components/leadgen/LeadgenShell'

const INVOICES = [
  { id: 'INV-001', client: 'Marcus Reid',    period: 'Jul 2024', plan: 'Performance', leads: 38, booked: 6,  amount: 2530, status: 'paid',    due: 'Aug 1 2024' },
  { id: 'INV-002', client: 'James Walker',   period: 'Jul 2024', plan: 'Performance', leads: 44, booked: 7,  amount: 3340, status: 'paid',    due: 'Aug 1 2024' },
  { id: 'INV-003', client: 'Sandra Okafor',  period: 'Jul 2024', plan: 'Monthly',     leads: 24, booked: 3,  amount: 1500, status: 'paid',    due: 'Aug 1 2024' },
  { id: 'INV-004', client: 'David Chen',     period: 'Jul 2024', plan: 'Performance', leads: 21, booked: 4,  amount: 1855, status: 'pending', due: 'Aug 5 2024' },
  { id: 'INV-005', client: 'Priya Nair',     period: 'Jun 2024', plan: 'Monthly',     leads: 18, booked: 2,  amount: 1500, status: 'overdue', due: 'Jul 1 2024' },
  { id: 'INV-006', client: 'Angela Moore',   period: 'May 2024', plan: 'Monthly',     leads: 10, booked: 1,  amount: 1500, status: 'overdue', due: 'Jun 1 2024' },
]

const PERF_RATES = { leadRate: 35, apptRate: 200 }

function BillingContent() {
  const [invoices, setInvoices] = useState(INVOICES)
  const [rates, setRates] = useState(PERF_RATES)
  const [tab, setTab] = useState<'invoices'|'calculator'|'settings'>('invoices')
  const [toast, setToast] = useState('')
  const [calcLeads, setCalcLeads] = useState(40)
  const [calcBooked, setCalcBooked] = useState(6)
  const [showNewInvoice, setShowNewInvoice] = useState(false)
  const [newInv, setNewInv] = useState({ client: '', leads: '', booked: '', plan: 'Performance' })

  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(''), 3000) }

  const markPaid = (id: string) => {
    setInvoices(p => p.map(i => i.id === id ? { ...i, status: 'paid' } : i))
    showToast('Invoice marked as paid')
  }

  const createInvoice = () => {
    const leads = parseInt(newInv.leads) || 0
    const booked = parseInt(newInv.booked) || 0
    const amount = newInv.plan === 'Performance' ? leads * rates.leadRate + booked * rates.apptRate : 1500
    const id = `INV-${String(invoices.length + 1).padStart(3, '0')}`
    setInvoices(p => [...p, { id, client: newInv.client, period: 'Aug 2024', plan: newInv.plan, leads, booked, amount, status: 'pending', due: 'Sep 1 2024' }])
    setNewInv({ client: '', leads: '', booked: '', plan: 'Performance' })
    setShowNewInvoice(false)
    showToast(`Invoice ${id} created`)
  }

  const totalRevenue = invoices.filter(i => i.status === 'paid').reduce((a, i) => a + i.amount, 0)
  const pendingRevenue = invoices.filter(i => i.status !== 'paid').reduce((a, i) => a + i.amount, 0)
  const calcTotal = calcLeads * rates.leadRate + calcBooked * rates.apptRate

  return (
    <div className="fade-in">
      {toast && <div className="toast">{toast}</div>}

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem' }}>
        <div>
          <h1 style={{ fontSize: '1.375rem', fontWeight: 700, color: '#F0F2F8' }}>Billing & Monetization</h1>
          <p style={{ color: '#8B92A5', fontSize: '0.8rem', marginTop: '0.2rem' }}>Track invoices, revenue, and performance-based billing</p>
        </div>
        <button className="btn-primary" onClick={() => setShowNewInvoice(true)} style={{ fontSize: '0.8rem', padding: '0.5rem 1rem' }}>
          <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
          New Invoice
        </button>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(160px,1fr))', gap: '0.875rem', marginBottom: '1.5rem' }}>
        {[
          { l: 'Revenue Collected', v: `$${totalRevenue.toLocaleString()}`, c: '#10B981' },
          { l: 'Pending / Overdue', v: `$${pendingRevenue.toLocaleString()}`, c: '#F43F5E' },
          { l: 'Total Invoices', v: invoices.length, c: '#3B82F6' },
          { l: 'Paid This Month', v: invoices.filter(i => i.status === 'paid').length, c: '#F59E0B' },
        ].map(s => (
          <div key={s.l} className="card" style={{ padding: '1rem 1.25rem' }}>
            <div style={{ fontSize: '0.7rem', color: '#8B92A5', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.4rem' }}>{s.l}</div>
            <div style={{ fontSize: '1.5rem', fontWeight: 700, color: s.c }}>{s.v}</div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '0.25rem', marginBottom: '1rem', borderBottom: '1px solid #1E2330', paddingBottom: '0.5rem' }}>
        {(['invoices','calculator','settings'] as const).map(t => (
          <button key={t} onClick={() => setTab(t)} style={{ padding: '0.4rem 1rem', fontSize: '0.8rem', fontWeight: 500, borderRadius: '6px 6px 0 0', border: 'none', cursor: 'pointer', textTransform: 'capitalize', transition: 'all 0.2s', background: tab === t ? '#3B82F6' : 'transparent', color: tab === t ? '#fff' : '#8B92A5' }}>{t}</button>
        ))}
      </div>

      {/* Invoices */}
      {tab === 'invoices' && (
        <div className="card" style={{ overflow: 'hidden' }}>
          <div style={{ overflowX: 'auto' }}>
            <table className="data-table">
              <thead><tr><th>Invoice</th><th>Client</th><th>Period</th><th>Plan</th><th>Leads</th><th>Booked</th><th>Amount</th><th>Status</th><th>Actions</th></tr></thead>
              <tbody>
                {invoices.map(inv => (
                  <tr key={inv.id}>
                    <td style={{ color: '#93C5FD', fontWeight: 600 }}>{inv.id}</td>
                    <td style={{ color: '#F0F2F8', fontWeight: 500 }}>{inv.client}</td>
                    <td>{inv.period}</td>
                    <td><span style={{ fontSize: '0.7rem', padding: '0.2rem 0.5rem', borderRadius: 4, background: inv.plan === 'Performance' ? 'rgba(245,158,11,0.12)' : 'rgba(59,130,246,0.12)', color: inv.plan === 'Performance' ? '#FCD34D' : '#93C5FD' }}>{inv.plan}</span></td>
                    <td>{inv.leads}</td>
                    <td>{inv.booked}</td>
                    <td style={{ color: '#10B981', fontWeight: 700 }}>${inv.amount.toLocaleString()}</td>
                    <td><span className={`badge badge-${inv.status === 'paid' ? 'hot' : inv.status === 'pending' ? 'warm' : 'cold'}`}>{inv.status}</span></td>
                    <td>
                      <div style={{ display: 'flex', gap: '0.4rem' }}>
                        {inv.status !== 'paid' && <button className="btn-primary" onClick={() => markPaid(inv.id)} style={{ padding: '0.25rem 0.6rem', fontSize: '0.7rem' }}>Mark Paid</button>}
                        <button className="btn-ghost" onClick={() => showToast(`Downloading ${inv.id}...`)} style={{ padding: '0.25rem 0.6rem', fontSize: '0.7rem' }}>PDF</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Calculator */}
      {tab === 'calculator' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
          <div className="card" style={{ padding: '1.25rem' }}>
            <div style={{ fontSize: '0.875rem', fontWeight: 600, color: '#F0F2F8', marginBottom: '1.25rem' }}>Performance Fee Calculator</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {[
                { label: 'Number of Leads Delivered', value: calcLeads, setter: setCalcLeads, color: '#3B82F6' },
                { label: 'Appointments Booked', value: calcBooked, setter: setCalcBooked, color: '#F59E0B' },
              ].map(({ label, value, setter, color }) => (
                <div key={label}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
                    <label style={{ fontSize: '0.775rem', color: '#8B92A5' }}>{label}</label>
                    <span style={{ fontSize: '0.875rem', fontWeight: 700, color }}>{value}</span>
                  </div>
                  <input type="range" min={0} max={200} value={value} onChange={e => setter(Number(e.target.value))} style={{ width: '100%', accentColor: color }} />
                </div>
              ))}
              <div style={{ marginTop: '0.5rem', padding: '1rem', background: '#0A0C10', borderRadius: 8, border: '1px solid #1E2330' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '0.875rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: '0.775rem', color: '#8B92A5' }}>{calcLeads} leads × ${rates.leadRate}/lead</span>
                    <span style={{ fontSize: '0.775rem', color: '#F0F2F8' }}>${(calcLeads * rates.leadRate).toLocaleString()}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: '0.775rem', color: '#8B92A5' }}>{calcBooked} appts × ${rates.apptRate}/appt</span>
                    <span style={{ fontSize: '0.775rem', color: '#F0F2F8' }}>${(calcBooked * rates.apptRate).toLocaleString()}</span>
                  </div>
                  <div style={{ borderTop: '1px solid #1E2330', paddingTop: '0.5rem', display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: '0.875rem', fontWeight: 700, color: '#F0F2F8' }}>Total Invoice</span>
                    <span style={{ fontSize: '1.125rem', fontWeight: 700, color: '#10B981' }}>${calcTotal.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="card" style={{ padding: '1.25rem' }}>
            <div style={{ fontSize: '0.875rem', fontWeight: 600, color: '#F0F2F8', marginBottom: '1.25rem' }}>Monthly Comparison</div>
            {[
              { label: 'Monthly Flat Plan', amount: 1500, note: 'Fixed — up to 200 leads' },
              { label: `Performance (${calcLeads} leads, ${calcBooked} booked)`, amount: calcTotal, note: 'Based on current rates', highlight: true },
              { label: 'One-Time Setup Fee', amount: 800, note: 'Charged once at onboarding' },
            ].map(p => (
              <div key={p.label} style={{ padding: '0.875rem', background: p.highlight ? 'rgba(16,185,129,0.06)' : '#0A0C10', borderRadius: 6, border: `1px solid ${p.highlight ? 'rgba(16,185,129,0.2)' : '#1E2330'}`, marginBottom: '0.75rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <div style={{ fontSize: '0.8rem', fontWeight: 500, color: '#F0F2F8', marginBottom: '0.2rem' }}>{p.label}</div>
                    <div style={{ fontSize: '0.7rem', color: '#4A5168' }}>{p.note}</div>
                  </div>
                  <div style={{ fontSize: '1.125rem', fontWeight: 700, color: p.highlight ? '#10B981' : '#F59E0B' }}>${p.amount.toLocaleString()}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Settings */}
      {tab === 'settings' && (
        <div className="card" style={{ padding: '1.25rem', maxWidth: 480 }}>
          <div style={{ fontSize: '0.875rem', fontWeight: 600, color: '#F0F2F8', marginBottom: '1.25rem' }}>Performance Rate Configuration</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {[
              { label: 'Rate Per Qualified Lead ($)', key: 'leadRate' as const },
              { label: 'Rate Per Booked Appointment ($)', key: 'apptRate' as const },
            ].map(({ label, key }) => (
              <div key={key}>
                <label style={{ fontSize: '0.775rem', color: '#8B92A5', display: 'block', marginBottom: '0.35rem' }}>{label}</label>
                <input className="input" type="number" value={rates[key]} onChange={e => setRates(p => ({ ...p, [key]: Number(e.target.value) }))} />
              </div>
            ))}
          </div>
          <button className="btn-primary" onClick={() => showToast('Rates saved successfully')} style={{ marginTop: '1.25rem', fontSize: '0.8rem' }}>Save Rates</button>
        </div>
      )}

      {/* New Invoice modal */}
      {showNewInvoice && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
          <div className="card" style={{ width: '100%', maxWidth: 440, padding: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
              <div style={{ fontSize: '1rem', fontWeight: 700, color: '#F0F2F8' }}>Create Invoice</div>
              <button className="btn-ghost" onClick={() => setShowNewInvoice(false)} style={{ padding: '0.3rem 0.6rem' }}>
                <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              </button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
              <div>
                <label style={{ fontSize: '0.75rem', color: '#8B92A5', display: 'block', marginBottom: '0.3rem' }}>Client Name</label>
                <input className="input" value={newInv.client} onChange={e => setNewInv(p => ({ ...p, client: e.target.value }))} placeholder="e.g. Marcus Reid" />
              </div>
              <div>
                <label style={{ fontSize: '0.75rem', color: '#8B92A5', display: 'block', marginBottom: '0.3rem' }}>Billing Plan</label>
                <select className="input" value={newInv.plan} onChange={e => setNewInv(p => ({ ...p, plan: e.target.value }))}>
                  <option>Performance</option><option>Monthly</option>
                </select>
              </div>
              {newInv.plan === 'Performance' && <>
                <div>
                  <label style={{ fontSize: '0.75rem', color: '#8B92A5', display: 'block', marginBottom: '0.3rem' }}>Leads Delivered</label>
                  <input className="input" type="number" value={newInv.leads} onChange={e => setNewInv(p => ({ ...p, leads: e.target.value }))} placeholder="e.g. 40" />
                </div>
                <div>
                  <label style={{ fontSize: '0.75rem', color: '#8B92A5', display: 'block', marginBottom: '0.3rem' }}>Appointments Booked</label>
                  <input className="input" type="number" value={newInv.booked} onChange={e => setNewInv(p => ({ ...p, booked: e.target.value }))} placeholder="e.g. 6" />
                </div>
                <div style={{ padding: '0.75rem', background: '#0A0C10', borderRadius: 6, border: '1px solid #1E2330' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: '0.8rem', color: '#8B92A5' }}>Estimated Amount</span>
                    <span style={{ fontSize: '1rem', fontWeight: 700, color: '#10B981' }}>
                      ${((parseInt(newInv.leads)||0) * rates.leadRate + (parseInt(newInv.booked)||0) * rates.apptRate).toLocaleString()}
                    </span>
                  </div>
                </div>
              </>}
            </div>
            <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end', marginTop: '1.25rem' }}>
              <button className="btn-ghost" onClick={() => setShowNewInvoice(false)} style={{ fontSize: '0.8rem' }}>Cancel</button>
              <button className="btn-primary" onClick={createInvoice} style={{ fontSize: '0.8rem' }}>Create Invoice</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default function BillingPage() {
  return <LeadgenShell><BillingContent /></LeadgenShell>
}
