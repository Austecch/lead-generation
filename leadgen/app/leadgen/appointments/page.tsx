'use client'
import { useState } from 'react'
import LeadgenShell from '@/components/leadgen/LeadgenShell'

type Appointment = {
  id: number; name: string; business: string; email: string; phone: string
  date: string; time: string; type: string; status: 'scheduled'|'completed'|'cancelled'|'noshow'
  notes: string; source: string; value: string
}

const INITIAL_APPTS: Appointment[] = [
  { id:1, name:'James Harrington', business:'The Prestige Group', email:'james@prestigegroup.com', phone:'(305) 881-2210', date:'Mar 6, 2025', time:'2:00 PM ET', type:'Discovery Call', status:'scheduled', notes:'Interested in full lead gen system. Has budget.', source:'Email Outreach', value:'$2,400/mo' },
  { id:2, name:'Amanda Wells', business:'BlueSky Brokers', email:'amanda@blueskybrokers.com', phone:'(720) 333-9910', date:'Mar 5, 2025', time:'10:00 AM MT', type:'Strategy Session', status:'completed', notes:'Signed contract. Onboarding March 10.', source:'LinkedIn', value:'$1,800/mo' },
  { id:3, name:'Derek Chan', business:'Harbor View Homes', email:'derek@harborviewhomes.com', phone:'(619) 552-7730', date:'Mar 4, 2025', time:'3:30 PM PT', type:'Discovery Call', status:'completed', notes:'Needs more time. Follow-up in 2 weeks.', source:'Instagram', value:'TBD' },
  { id:4, name:'Lisa Okafor', business:'Prime Properties NJ', email:'lisa@primepropertiesnj.com', phone:'(973) 644-2290', date:'Mar 3, 2025', time:'1:00 PM ET', type:'Demo', status:'noshow', notes:'Did not join. Sent reschedule email.', source:'LinkedIn', value:'$1,200/mo' },
  { id:5, name:'Robert Nguyen', business:'Gold Key Realty', email:'robert@goldkeyrealty.com', phone:'(702) 888-4420', date:'Mar 2, 2025', time:'11:00 AM PT', type:'Discovery Call', status:'completed', notes:'Interested but evaluating budget. Follow up April.', source:'Email', value:'$900/mo' },
  { id:6, name:'Cynthia Park', business:'Horizon Land Group', email:'cpark@horizonland.com', phone:'(214) 771-0032', date:'Mar 8, 2025', time:'4:00 PM CT', type:'Discovery Call', status:'scheduled', notes:'Commercial focus. Needs B2B lead gen.', source:'Google', value:'$3,000/mo' },
]

function AppointmentsContent() {
  const [appts, setAppts] = useState<Appointment[]>(INITIAL_APPTS)
  const [selected, setSelected] = useState<Appointment | null>(null)
  const [filter, setFilter] = useState<'all'|'scheduled'|'completed'|'cancelled'|'noshow'>('all')
  const [showNew, setShowNew] = useState(false)
  const [toast, setToast] = useState('')
  const [newAppt, setNewAppt] = useState({ name:'', business:'', email:'', phone:'', date:'', time:'', type:'Discovery Call', notes:'', source:'Email Outreach', value:'' })

  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(''), 3000) }

  const filtered = appts.filter(a => filter === 'all' || a.status === filter)

  const updateStatus = (id: number, status: Appointment['status']) => {
    setAppts(prev => prev.map(a => a.id === id ? { ...a, status } : a))
    setSelected(s => s?.id === id ? { ...s, status } : s)
    showToast(`Appointment marked as ${status}`)
  }

  const addAppt = () => {
    if (!newAppt.name || !newAppt.date) return
    const a: Appointment = { ...newAppt, id: Date.now(), status: 'scheduled' }
    setAppts(prev => [a, ...prev])
    setShowNew(false)
    showToast('Appointment added')
  }

  const deleteAppt = (id: number) => { setAppts(prev => prev.filter(a => a.id !== id)); if (selected?.id === id) setSelected(null); showToast('Appointment removed') }

  const statusColor: Record<string, string> = { scheduled:'#3B82F6', completed:'#10B981', cancelled:'#F43F5E', noshow:'#F59E0B' }
  const statusBadge: Record<string, string> = { scheduled:'badge-sent', completed:'badge-active', cancelled:'badge-hot', noshow:'badge-warm' }

  const stats = [
    { label:'Total Booked',  value: appts.length,                                      color:'#3B82F6' },
    { label:'Completed',     value: appts.filter(a => a.status === 'completed').length, color:'#10B981' },
    { label:'Scheduled',     value: appts.filter(a => a.status === 'scheduled').length, color:'#8B5CF6' },
    { label:'No Show',       value: appts.filter(a => a.status === 'noshow').length,    color:'#F59E0B' },
    { label:'Show Rate',     value: `${Math.round((appts.filter(a=>a.status==='completed').length / Math.max(appts.filter(a=>['completed','noshow'].includes(a.status)).length,1))*100)}%`, color:'#10B981' },
  ]

  return (
    <div className="fade-in">
      {toast && <div style={{ position:'fixed', bottom:'1.5rem', right:'1.5rem', background:'#10B981', color:'#fff', padding:'0.75rem 1.25rem', borderRadius:8, fontSize:'0.8rem', fontWeight:500, zIndex:999, boxShadow:'0 8px 24px rgba(0,0,0,0.3)' }}>{toast}</div>}

      <div style={{ marginBottom:'1.5rem', display:'flex', alignItems:'center', justifyContent:'space-between', flexWrap:'wrap', gap:'1rem' }}>
        <div>
          <h1 style={{ fontSize:'1.375rem', fontWeight:700, color:'#F0F2F8' }}>Appointments & Conversions</h1>
          <p style={{ color:'#8B92A5', fontSize:'0.8rem', marginTop:'0.2rem' }}>Track every booked call and conversion outcome</p>
        </div>
        <button className="btn-primary" onClick={() => setShowNew(true)} style={{ fontSize:'0.75rem' }}>
          <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
          Add Appointment
        </button>
      </div>

      {/* Stats */}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(5,1fr)', gap:'0.75rem', marginBottom:'1.5rem' }}>
        {stats.map(s => (
          <div key={s.label} className="card" style={{ padding:'1rem 1.125rem', borderLeft:`3px solid ${s.color}` }}>
            <div style={{ fontSize:'1.5rem', fontWeight:700, color:s.color, lineHeight:1 }}>{s.value}</div>
            <div style={{ fontSize:'0.7rem', color:'#8B92A5', marginTop:'0.35rem', fontWeight:500 }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Filter tabs */}
      <div className="tab-bar">
        {(['all','scheduled','completed','noshow','cancelled'] as const).map(f => (
          <button key={f} className={`tab-btn${filter === f ? ' active' : ''}`} onClick={() => setFilter(f)}>
            {f === 'all' ? 'All' : f === 'noshow' ? 'No Show' : f.charAt(0).toUpperCase()+f.slice(1)}
            <span style={{ marginLeft:'0.3rem', fontSize:'0.65rem', opacity:0.7 }}>({appts.filter(a => f === 'all' || a.status === f).length})</span>
          </button>
        ))}
      </div>

      {/* Appointments grid */}
      <div style={{ display:'grid', gridTemplateColumns: selected ? '1fr 340px' : '1fr', gap:'1rem' }}>
        <div style={{ display:'flex', flexDirection:'column', gap:'0.625rem' }}>
          {filtered.map(a => (
            <div key={a.id} className="card" onClick={() => setSelected(selected?.id === a.id ? null : a)} style={{ padding:'1rem 1.25rem', cursor:'pointer', display:'flex', alignItems:'center', gap:'1.25rem', border: selected?.id === a.id ? '1px solid #3B82F6' : '1px solid #1E2330', transition:'all 0.15s' }}>
              <div style={{ width:42, height:42, borderRadius:10, background:`${statusColor[a.status]}22`, border:`1px solid ${statusColor[a.status]}44`, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                <svg width="16" height="16" fill="none" stroke={statusColor[a.status]} strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
              </div>
              <div style={{ flex:1, minWidth:0 }}>
                <div style={{ display:'flex', alignItems:'center', gap:'0.5rem', marginBottom:'0.2rem' }}>
                  <span style={{ fontSize:'0.875rem', fontWeight:600, color:'#F0F2F8' }}>{a.name}</span>
                  <span style={{ fontSize:'0.7rem', color:'#8B92A5' }}>·</span>
                  <span style={{ fontSize:'0.775rem', color:'#8B92A5' }}>{a.business}</span>
                </div>
                <div style={{ fontSize:'0.72rem', color:'#8B92A5' }}>{a.type} · {a.date} at {a.time}</div>
              </div>
              <div style={{ display:'flex', alignItems:'center', gap:'0.75rem', flexShrink:0 }}>
                {a.value !== 'TBD' && <span style={{ fontSize:'0.775rem', fontWeight:600, color:'#34D399' }}>{a.value}</span>}
                <span className={`badge ${statusBadge[a.status]}`}>{a.status === 'noshow' ? 'No Show' : a.status.charAt(0).toUpperCase()+a.status.slice(1)}</span>
                <span style={{ fontSize:'0.72rem', color:'#4A5168', background:'#0A0C10', padding:'0.2rem 0.5rem', borderRadius:4, border:'1px solid #1E2330' }}>{a.source}</span>
                <button className="btn-danger" onClick={e => { e.stopPropagation(); deleteAppt(a.id) }} style={{ padding:'0.25rem 0.4rem', fontSize:'0.68rem' }}>
                  <svg width="10" height="10" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M9 6V4h6v2"/></svg>
                </button>
              </div>
            </div>
          ))}
          {filtered.length === 0 && <div style={{ padding:'3rem', textAlign:'center', color:'#4A5168', fontSize:'0.8rem', background:'#111318', borderRadius:10, border:'1px solid #1E2330' }}>No appointments in this category</div>}
        </div>

        {/* Detail panel */}
        {selected && (
          <div className="card fade-in" style={{ padding:'1.25rem', height:'fit-content', position:'sticky', top:'5rem' }}>
            <div style={{ display:'flex', justifyContent:'space-between', marginBottom:'1rem' }}>
              <span style={{ fontSize:'0.75rem', fontWeight:600, color:'#8B92A5', textTransform:'uppercase', letterSpacing:'0.06em' }}>Appointment Detail</span>
              <button onClick={() => setSelected(null)} style={{ background:'none', border:'none', color:'#4A5168', cursor:'pointer' }}>
                <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              </button>
            </div>
            <div style={{ marginBottom:'1.25rem' }}>
              <div style={{ fontSize:'1rem', fontWeight:700, color:'#F0F2F8' }}>{selected.name}</div>
              <div style={{ fontSize:'0.775rem', color:'#8B92A5', marginTop:'0.2rem' }}>{selected.business}</div>
              <span className={`badge ${statusBadge[selected.status]}`} style={{ marginTop:'0.5rem', display:'inline-flex' }}>{selected.status === 'noshow' ? 'No Show' : selected.status.charAt(0).toUpperCase()+selected.status.slice(1)}</span>
            </div>
            {[
              { label:'Type',     val: selected.type },
              { label:'Date',     val: `${selected.date} at ${selected.time}` },
              { label:'Email',    val: selected.email },
              { label:'Phone',    val: selected.phone },
              { label:'Source',   val: selected.source },
              { label:'Value',    val: selected.value },
            ].map(r => (
              <div key={r.label} style={{ marginBottom:'0.75rem' }}>
                <div style={{ fontSize:'0.68rem', color:'#4A5168', textTransform:'uppercase', letterSpacing:'0.06em', marginBottom:'0.15rem' }}>{r.label}</div>
                <div style={{ fontSize:'0.8rem', color:'#D1D5DB' }}>{r.val}</div>
              </div>
            ))}
            <div style={{ fontSize:'0.68rem', color:'#4A5168', textTransform:'uppercase', letterSpacing:'0.06em', marginBottom:'0.35rem' }}>Notes</div>
            <div style={{ fontSize:'0.78rem', color:'#8B92A5', background:'#0A0C10', borderRadius:6, padding:'0.625rem', border:'1px solid #1E2330', marginBottom:'1.25rem', lineHeight:1.6 }}>{selected.notes || '—'}</div>
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'0.5rem' }}>
              {(['scheduled','completed','noshow','cancelled'] as const).map(s => (
                <button key={s} onClick={() => updateStatus(selected.id, s)} style={{ padding:'0.4rem', borderRadius:6, cursor:'pointer', fontSize:'0.72rem', fontWeight:500, background: selected.status === s ? `${statusColor[s]}22` : '#1E2330', color: selected.status === s ? statusColor[s] : '#8B92A5', border: selected.status === s ? `1px solid ${statusColor[s]}44` : '1px solid transparent', transition:'all 0.2s' }}>
                  {s === 'noshow' ? 'No Show' : s.charAt(0).toUpperCase()+s.slice(1)}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* New Appointment Modal */}
      {showNew && (
        <div className="modal-overlay" onClick={() => setShowNew(false)}>
          <div className="modal-box" onClick={e => e.stopPropagation()}>
            <div style={{ padding:'1.5rem', borderBottom:'1px solid #1E2330', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
              <div style={{ fontSize:'1rem', fontWeight:700, color:'#F0F2F8' }}>Add New Appointment</div>
              <button onClick={() => setShowNew(false)} style={{ background:'none', border:'none', color:'#4A5168', cursor:'pointer' }}><svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></button>
            </div>
            <div style={{ padding:'1.5rem', display:'flex', flexDirection:'column', gap:'0.875rem' }}>
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'0.75rem' }}>
                {[{k:'name',l:'Full Name *',p:'James Harrington'},{k:'business',l:'Business',p:'The Prestige Group'},{k:'email',l:'Email',p:'james@...'},{k:'phone',l:'Phone',p:'(305) 881-2210'}].map(f => (
                  <div key={f.k}>
                    <label style={{ fontSize:'0.72rem', fontWeight:500, color:'#8B92A5', display:'block', marginBottom:'0.3rem' }}>{f.l}</label>
                    <input className="input" placeholder={f.p} value={(newAppt as any)[f.k]} onChange={e => setNewAppt(p=>({...p,[f.k]:e.target.value}))} />
                  </div>
                ))}
              </div>
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:'0.75rem' }}>
                <div>
                  <label style={{ fontSize:'0.72rem', fontWeight:500, color:'#8B92A5', display:'block', marginBottom:'0.3rem' }}>Date *</label>
                  <input className="input" type="date" value={newAppt.date} onChange={e => setNewAppt(p=>({...p,date:e.target.value}))} />
                </div>
                <div>
                  <label style={{ fontSize:'0.72rem', fontWeight:500, color:'#8B92A5', display:'block', marginBottom:'0.3rem' }}>Time</label>
                  <input className="input" placeholder="2:00 PM ET" value={newAppt.time} onChange={e => setNewAppt(p=>({...p,time:e.target.value}))} />
                </div>
                <div>
                  <label style={{ fontSize:'0.72rem', fontWeight:500, color:'#8B92A5', display:'block', marginBottom:'0.3rem' }}>Type</label>
                  <select className="input" value={newAppt.type} onChange={e => setNewAppt(p=>({...p,type:e.target.value}))}>
                    <option>Discovery Call</option><option>Strategy Session</option><option>Demo</option><option>Follow-up</option>
                  </select>
                </div>
              </div>
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'0.75rem' }}>
                <div>
                  <label style={{ fontSize:'0.72rem', fontWeight:500, color:'#8B92A5', display:'block', marginBottom:'0.3rem' }}>Source</label>
                  <select className="input" value={newAppt.source} onChange={e => setNewAppt(p=>({...p,source:e.target.value}))}>
                    <option>Email Outreach</option><option>LinkedIn</option><option>Instagram</option><option>Google</option><option>Referral</option>
                  </select>
                </div>
                <div>
                  <label style={{ fontSize:'0.72rem', fontWeight:500, color:'#8B92A5', display:'block', marginBottom:'0.3rem' }}>Est. Value</label>
                  <input className="input" placeholder="$1,200/mo" value={newAppt.value} onChange={e => setNewAppt(p=>({...p,value:e.target.value}))} />
                </div>
              </div>
              <div>
                <label style={{ fontSize:'0.72rem', fontWeight:500, color:'#8B92A5', display:'block', marginBottom:'0.3rem' }}>Notes</label>
                <textarea className="input" placeholder="Any relevant context..." value={newAppt.notes} onChange={e => setNewAppt(p=>({...p,notes:e.target.value}))} style={{ minHeight:72, resize:'vertical' }} />
              </div>
              <button className="btn-primary" onClick={addAppt} style={{ justifyContent:'center', padding:'0.75rem', fontSize:'0.875rem' }}>Add Appointment</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default function AppointmentsPage() {
  return <LeadgenShell><AppointmentsContent /></LeadgenShell>
}
