'use client'
import { useState } from 'react'
import LeadgenShell from '@/components/leadgen/LeadgenShell'

type Lead = {
  id: number; name: string; contact: string; email: string; phone: string
  website: string; location: string; niche: string; source: string
  score: number; status: 'hot' | 'warm' | 'cold'
  websiteQuality: number; socialActivity: number; engagement: number; hasContact: number
  decisionMaker: string; role: string; notes: string; discovered: string
}

const INITIAL_LEADS: Lead[] = [
  { id:1, name:'The Prestige Group', contact:'James Harrington', email:'james@prestigegroup.com', phone:'(305) 881-2210', website:'prestigegroup.com', location:'Miami, FL', niche:'Luxury', source:'LinkedIn', score:92, status:'hot', websiteQuality:90, socialActivity:95, engagement:88, hasContact:100, decisionMaker:'Owner', role:'Broker/Owner', notes:'Active on LinkedIn, posts weekly listings', discovered:'2 hours ago' },
  { id:2, name:'Sunrise Realty Co.', contact:'Maria Santos', email:'msantos@sunriserealty.com', phone:'(512) 774-3391', website:'sunriserealty.com', location:'Austin, TX', niche:'Residential', source:'Google', score:76, status:'warm', websiteQuality:70, socialActivity:80, engagement:72, hasContact:80, decisionMaker:'Marketing Manager', role:'Marketing Manager', notes:'Outdated website, active Instagram', discovered:'5 hours ago' },
  { id:3, name:'Harbor View Homes', contact:'Derek Chan', email:'derek@harborviewhomes.com', phone:'(619) 552-7730', website:'harborviewhomes.com', location:'San Diego, CA', niche:'Coastal', source:'Instagram', score:88, status:'hot', websiteQuality:85, socialActivity:92, engagement:90, hasContact:90, decisionMaker:'Owner', role:'Broker/Owner', notes:'High Instagram engagement, luxury listings', discovered:'1 day ago' },
  { id:4, name:'Apex Real Estate LLC', contact:'Tom Bradley', email:'tom@apexre.com', phone:'(404) 221-8870', website:'apexre.com', location:'Atlanta, GA', niche:'Commercial', source:'Google', score:54, status:'cold', websiteQuality:45, socialActivity:50, engagement:55, hasContact:70, decisionMaker:'Owner', role:'Owner', notes:'Low social presence, old website', discovered:'1 day ago' },
  { id:5, name:'Prime Properties NJ', contact:'Lisa Okafor', email:'lisa@primepropertiesNJ.com', phone:'(973) 644-2290', website:'primepropertiesnj.com', location:'Newark, NJ', niche:'Residential', source:'LinkedIn', score:81, status:'warm', websiteQuality:78, socialActivity:85, engagement:79, hasContact:80, decisionMaker:'Broker', role:'Broker', notes:'Active LinkedIn profile, growing agency', discovered:'2 days ago' },
  { id:6, name:'BlueSky Brokers', contact:'Amanda Wells', email:'amanda@blueskybrokers.com', phone:'(720) 333-9910', website:'blueskybrokers.com', location:'Denver, CO', niche:'Luxury', source:'LinkedIn', score:95, status:'hot', websiteQuality:95, socialActivity:98, engagement:94, hasContact:100, decisionMaker:'Owner', role:'Owner', notes:'Top producer, very active across all channels', discovered:'3 days ago' },
  { id:7, name:'Gold Key Realty', contact:'Robert Nguyen', email:'robert@goldkeyrealty.com', phone:'(702) 888-4420', website:'goldkeyrealty.com', location:'Las Vegas, NV', niche:'Luxury', source:'Google', score:69, status:'warm', websiteQuality:72, socialActivity:65, engagement:68, hasContact:70, decisionMaker:'Marketing Manager', role:'Marketing Manager', notes:'Decent web presence, moderate activity', discovered:'3 days ago' },
  { id:8, name:'Horizon Land Group', contact:'Cynthia Park', email:'cpark@horizonland.com', phone:'(214) 771-0032', website:'horizonland.com', location:'Dallas, TX', niche:'Commercial', source:'Directories', score:61, status:'warm', websiteQuality:60, socialActivity:62, engagement:59, hasContact:65, decisionMaker:'Broker', role:'Broker', notes:'Commercial focus, directory listing', discovered:'4 days ago' },
  { id:9, name:'CityScape Real Estate', contact:'Mike Torres', email:'mike@cityscapere.com', phone:'(212) 490-3310', website:'cityscapere.com', location:'New York, NY', niche:'Residential', source:'Instagram', score:84, status:'hot', websiteQuality:88, socialActivity:86, engagement:82, hasContact:80, decisionMaker:'Owner', role:'Owner', notes:'Strong NYC presence, modern brand', discovered:'5 days ago' },
  { id:10, name:'Palm Coast Properties', contact:'Sandra Lee', email:'sandralee@palmcoast.com', phone:'(561) 209-8870', website:'palmcoastproperties.com', location:'Boca Raton, FL', niche:'Coastal', source:'Google', score:42, status:'cold', websiteQuality:35, socialActivity:40, engagement:45, hasContact:50, decisionMaker:'Owner', role:'Owner', notes:'Very minimal web presence', discovered:'6 days ago' },
]

function LeadsContent() {
  const [leads, setLeads] = useState<Lead[]>(INITIAL_LEADS)
  const [filter, setFilter] = useState<'all'|'hot'|'warm'|'cold'>('all')
  const [sourceFilter, setSourceFilter] = useState('all')
  const [search, setSearch] = useState('')
  const [selected, setSelected] = useState<Lead | null>(null)
  const [discovering, setDiscovering] = useState(false)
  const [scoring, setScoring] = useState<number | null>(null)
  const [showDiscover, setShowDiscover] = useState(false)
  const [discoverForm, setDiscoverForm] = useState({ location: '', niche: '', source: 'LinkedIn' })
  const [toast, setToast] = useState('')

  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(''), 3000) }

  const filtered = leads.filter(l => {
    const matchStatus = filter === 'all' || l.status === filter
    const matchSource = sourceFilter === 'all' || l.source === sourceFilter
    const matchSearch = !search || l.name.toLowerCase().includes(search.toLowerCase()) || l.location.toLowerCase().includes(search.toLowerCase())
    return matchStatus && matchSource && matchSearch
  })

  const runDiscover = async () => {
    if (!discoverForm.location) return
    setDiscovering(true)
    await new Promise(r => setTimeout(r, 2200))
    const newLeads: Lead[] = Array.from({ length: 5 }, (_, i) => {
      const score = Math.floor(Math.random() * 60) + 35
      return {
        id: Date.now() + i,
        name: [`${discoverForm.location.split(',')[0]} Elite Homes`, `${discoverForm.niche || 'Metro'} Brokers LLC`, `Prestige ${discoverForm.location.split(',')[0]} Realty`, `CityPrime Properties`, `Heritage Realty Group`][i],
        contact: ['Alex Johnson','Sarah Kim','David Brown','Emily Clarke','Mark Wilson'][i],
        email: [`alex@${discoverForm.location.split(',')[0].toLowerCase().replace(/\s/g,'')}elite.com`,'sarah@metrobrokers.com','david@prestigerealty.com','emily@cityprime.com','mark@heritagerealty.com'][i],
        phone: `(${Math.floor(Math.random()*800)+200}) ${Math.floor(Math.random()*900)+100}-${Math.floor(Math.random()*9000)+1000}`,
        website: `${discoverForm.location.split(',')[0].toLowerCase().replace(/\s/g,'')}realty${i}.com`,
        location: discoverForm.location,
        niche: discoverForm.niche || 'Residential',
        source: discoverForm.source,
        score,
        status: score >= 80 ? 'hot' : score >= 60 ? 'warm' : 'cold',
        websiteQuality: Math.floor(Math.random()*50)+40,
        socialActivity: Math.floor(Math.random()*60)+30,
        engagement: Math.floor(Math.random()*50)+35,
        hasContact: Math.floor(Math.random()*40)+60,
        decisionMaker: ['Owner','Broker','Marketing Manager'][Math.floor(Math.random()*3)],
        role: ['Broker/Owner','Owner','Marketing Manager'][Math.floor(Math.random()*3)],
        notes: `Discovered via ${discoverForm.source} search in ${discoverForm.location}`,
        discovered: 'Just now',
      }
    })
    setLeads(prev => [...newLeads, ...prev])
    setDiscovering(false)
    setShowDiscover(false)
    showToast(`5 new leads discovered in ${discoverForm.location}`)
  }

  const rescoreAll = async () => {
    setScoring(-1)
    await new Promise(r => setTimeout(r, 1800))
    setLeads(prev => prev.map(l => {
      const score = Math.round((l.websiteQuality + l.socialActivity + l.engagement + l.hasContact) / 4)
      return { ...l, score, status: score >= 80 ? 'hot' : score >= 60 ? 'warm' : 'cold' }
    }))
    setScoring(null)
    showToast('All leads re-scored by AI')
  }

  const deleteLead = (id: number) => {
    setLeads(prev => prev.filter(l => l.id !== id))
    if (selected?.id === id) setSelected(null)
    showToast('Lead removed')
  }

  const hotCount = leads.filter(l => l.status === 'hot').length
  const warmCount = leads.filter(l => l.status === 'warm').length
  const coldCount = leads.filter(l => l.status === 'cold').length

  return (
    <div className="fade-in">
      {toast && (
        <div style={{ position: 'fixed', bottom: '1.5rem', right: '1.5rem', background: '#10B981', color: '#fff', padding: '0.75rem 1.25rem', borderRadius: 8, fontSize: '0.8rem', fontWeight: 500, zIndex: 999, boxShadow: '0 8px 24px rgba(0,0,0,0.3)' }}>{toast}</div>
      )}

      {/* Header */}
      <div style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '1.375rem', fontWeight: 700, color: '#F0F2F8' }}>Lead Discovery Engine</h1>
          <p style={{ color: '#8B92A5', fontSize: '0.8rem', marginTop: '0.2rem' }}>{leads.length} leads total · {hotCount} hot · {warmCount} warm · {coldCount} cold</p>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button className="btn-ghost" onClick={rescoreAll} disabled={scoring === -1} style={{ fontSize: '0.75rem' }}>
            {scoring === -1 ? <><span className="spin" style={{ display:'inline-block',width:12,height:12,border:'2px solid #333',borderTopColor:'#8B92A5',borderRadius:'50%' }} /> Scoring...</> : <>
              <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 .49-4.5"/></svg>
              AI Re-score All
            </>}
          </button>
          <button className="btn-primary" onClick={() => setShowDiscover(true)} style={{ fontSize: '0.75rem' }}>
            <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
            Discover Leads
          </button>
        </div>
      </div>

      {/* Quick status cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '0.75rem', marginBottom: '1.25rem' }}>
        {[
          { label:'Hot Leads', count: hotCount, color:'#F43F5E', bg:'rgba(244,63,94,0.08)', desc:'Ready for outreach now' },
          { label:'Warm Leads', count: warmCount, color:'#F59E0B', bg:'rgba(245,158,11,0.08)', desc:'Need nurturing' },
          { label:'Cold Leads', count: coldCount, color:'#8B92A5', bg:'rgba(99,115,148,0.08)', desc:'Low priority' },
        ].map(c => (
          <button key={c.label} onClick={() => setFilter(c.label.split(' ')[0].toLowerCase() as any)} style={{ background: filter === c.label.split(' ')[0].toLowerCase() ? c.bg : '#111318', border: `1px solid ${filter === c.label.split(' ')[0].toLowerCase() ? c.color+'44' : '#1E2330'}`, borderRadius: 8, padding: '0.875rem 1rem', cursor: 'pointer', textAlign: 'left', transition: 'all 0.2s' }}>
            <div style={{ fontSize: '1.5rem', fontWeight: 700, color: c.color, lineHeight: 1 }}>{c.count}</div>
            <div style={{ fontSize: '0.775rem', fontWeight: 600, color: '#F0F2F8', marginTop: '0.25rem' }}>{c.label}</div>
            <div style={{ fontSize: '0.68rem', color: '#8B92A5' }}>{c.desc}</div>
          </button>
        ))}
      </div>

      {/* Filters */}
      <div style={{ display: 'flex', gap: '0.625rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
        <input className="input" placeholder="Search leads..." value={search} onChange={e => setSearch(e.target.value)} style={{ maxWidth: 240 }} />
        <select className="input" value={filter} onChange={e => setFilter(e.target.value as any)} style={{ maxWidth: 140 }}>
          <option value="all">All Status</option>
          <option value="hot">Hot</option>
          <option value="warm">Warm</option>
          <option value="cold">Cold</option>
        </select>
        <select className="input" value={sourceFilter} onChange={e => setSourceFilter(e.target.value)} style={{ maxWidth: 160 }}>
          <option value="all">All Sources</option>
          <option value="LinkedIn">LinkedIn</option>
          <option value="Google">Google</option>
          <option value="Instagram">Instagram</option>
          <option value="Directories">Directories</option>
        </select>
      </div>

      {/* Main content */}
      <div style={{ display: 'grid', gridTemplateColumns: selected ? '1fr 360px' : '1fr', gap: '1rem' }}>
        {/* Table */}
        <div className="card" style={{ overflow: 'hidden' }}>
          <div style={{ overflowX: 'auto' }}>
            <table className="data-table">
              <thead>
                <tr><th>Business</th><th>Contact</th><th>Location</th><th>Niche</th><th>Source</th><th>AI Score</th><th>Status</th><th>Actions</th></tr>
              </thead>
              <tbody>
                {filtered.map(l => (
                  <tr key={l.id} style={{ cursor: 'pointer' }} onClick={() => setSelected(selected?.id === l.id ? null : l)}>
                    <td style={{ color: '#F0F2F8', fontWeight: 500 }}>{l.name}</td>
                    <td>
                      <div style={{ fontSize: '0.775rem', color: '#D1D5DB' }}>{l.contact}</div>
                      <div style={{ fontSize: '0.68rem', color: '#4A5168' }}>{l.role}</div>
                    </td>
                    <td>{l.location}</td>
                    <td>{l.niche}</td>
                    <td>
                      <span style={{ fontSize: '0.72rem', padding: '0.15rem 0.5rem', borderRadius: 4, background: '#1E2330', color: '#8B92A5', border: '1px solid #252A36' }}>{l.source}</span>
                    </td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <div style={{ flex: 1, height: 5, borderRadius: 3, background: '#1E2330', overflow: 'hidden', minWidth: 50 }}>
                          <div style={{ width: `${l.score}%`, height: '100%', background: l.score >= 80 ? '#10B981' : l.score >= 60 ? '#F59E0B' : '#F43F5E', borderRadius: 3 }} />
                        </div>
                        <span style={{ fontSize: '0.75rem', fontWeight: 700, color: l.score >= 80 ? '#34D399' : l.score >= 60 ? '#FCD34D' : '#F87171', minWidth: 24 }}>{l.score}</span>
                      </div>
                    </td>
                    <td><span className={`badge badge-${l.status}`}>{l.status.toUpperCase()}</span></td>
                    <td onClick={e => e.stopPropagation()}>
                      <div style={{ display: 'flex', gap: '0.3rem' }}>
                        <button className="btn-ghost" onClick={() => setSelected(l)} style={{ padding: '0.25rem 0.5rem', fontSize: '0.68rem' }}>View</button>
                        <button className="btn-danger" onClick={() => deleteLead(l.id)} style={{ padding: '0.25rem 0.5rem', fontSize: '0.68rem' }}>
                          <svg width="10" height="10" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4h6v2"/></svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Lead detail panel */}
        {selected && (
          <div className="card fade-in" style={{ padding: '1.25rem', height: 'fit-content', position: 'sticky', top: '5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#8B92A5', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Lead Detail</span>
              <button onClick={() => setSelected(null)} style={{ background: 'none', border: 'none', color: '#4A5168', cursor: 'pointer' }}>
                <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              </button>
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <div style={{ fontSize: '1rem', fontWeight: 700, color: '#F0F2F8' }}>{selected.name}</div>
              <div style={{ fontSize: '0.775rem', color: '#8B92A5', marginTop: '0.2rem' }}>{selected.location} · {selected.niche}</div>
            </div>
            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.25rem' }}>
              <span className={`badge badge-${selected.status}`} style={{ fontSize: '0.7rem' }}>{selected.status.toUpperCase()}</span>
              <span style={{ fontSize: '0.7rem', padding: '0.2rem 0.6rem', borderRadius: 9999, background: '#1E2330', color: '#8B92A5', border: '1px solid #252A36' }}>{selected.source}</span>
            </div>

            {/* AI Score breakdown */}
            <div style={{ background: '#0A0C10', borderRadius: 8, padding: '0.875rem', marginBottom: '1.25rem', border: '1px solid #1E2330' }}>
              <div style={{ fontSize: '0.72rem', fontWeight: 600, color: '#8B92A5', marginBottom: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.06em' }}>AI Score Breakdown</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.75rem' }}>
                <div style={{ width: 56, height: 56, borderRadius: '50%', background: `conic-gradient(${selected.score >= 80 ? '#10B981' : selected.score >= 60 ? '#F59E0B' : '#F43F5E'} ${selected.score * 3.6}deg, #1E2330 0deg)`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <div style={{ width: 40, height: 40, borderRadius: '50%', background: '#0A0C10', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.875rem', fontWeight: 700, color: selected.score >= 80 ? '#34D399' : selected.score >= 60 ? '#FCD34D' : '#F87171' }}>{selected.score}</div>
                </div>
                <div>
                  <div style={{ fontSize: '0.8rem', fontWeight: 600, color: '#F0F2F8' }}>Overall Score</div>
                  <div style={{ fontSize: '0.7rem', color: '#8B92A5' }}>Out of 100 — {selected.score >= 80 ? 'Excellent' : selected.score >= 60 ? 'Good' : 'Low priority'}</div>
                </div>
              </div>
              {[
                { label: 'Website Quality',    val: selected.websiteQuality  },
                { label: 'Social Activity',    val: selected.socialActivity  },
                { label: 'Engagement Level',   val: selected.engagement      },
                { label: 'Contact Presence',   val: selected.hasContact      },
              ].map(m => (
                <div key={m.label} style={{ marginBottom: '0.5rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.2rem' }}>
                    <span style={{ fontSize: '0.72rem', color: '#8B92A5' }}>{m.label}</span>
                    <span style={{ fontSize: '0.72rem', fontWeight: 600, color: '#D1D5DB' }}>{m.val}%</span>
                  </div>
                  <div className="progress-bar">
                    <div className="progress-fill" style={{ width: `${m.val}%`, background: m.val >= 80 ? '#10B981' : m.val >= 60 ? '#F59E0B' : '#F43F5E' }} />
                  </div>
                </div>
              ))}
            </div>

            {/* Contact info */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', marginBottom: '1.25rem' }}>
              {[
                { label: 'Decision Maker', val: `${selected.contact} (${selected.decisionMaker})` },
                { label: 'Email', val: selected.email },
                { label: 'Phone', val: selected.phone },
                { label: 'Website', val: selected.website },
              ].map(r => (
                <div key={r.label}>
                  <div style={{ fontSize: '0.68rem', color: '#4A5168', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.1rem' }}>{r.label}</div>
                  <div style={{ fontSize: '0.775rem', color: '#D1D5DB' }}>{r.val}</div>
                </div>
              ))}
            </div>
            <div style={{ fontSize: '0.72rem', color: '#8B92A5', background: '#0A0C10', borderRadius: 6, padding: '0.625rem', border: '1px solid #1E2330', marginBottom: '1rem' }}>
              {selected.notes}
            </div>
            <button className="btn-primary" style={{ width: '100%', justifyContent: 'center', fontSize: '0.8rem' }}>
              <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
              Start Outreach
            </button>
          </div>
        )}
      </div>

      {/* Discover modal */}
      {showDiscover && (
        <div className="modal-overlay" onClick={() => !discovering && setShowDiscover(false)}>
          <div className="modal-box" onClick={e => e.stopPropagation()} style={{ maxWidth: 480 }}>
            <div style={{ padding: '1.5rem', borderBottom: '1px solid #1E2330', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontSize: '1rem', fontWeight: 700, color: '#F0F2F8' }}>Discover New Leads</div>
                <div style={{ fontSize: '0.75rem', color: '#8B92A5', marginTop: '0.2rem' }}>AI will search LinkedIn, Instagram & Google</div>
              </div>
              {!discovering && <button onClick={() => setShowDiscover(false)} style={{ background: 'none', border: 'none', color: '#4A5168', cursor: 'pointer' }}><svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></button>}
            </div>
            <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ fontSize: '0.75rem', fontWeight: 500, color: '#8B92A5', display: 'block', marginBottom: '0.4rem' }}>Target Location *</label>
                <input className="input" placeholder="e.g. Miami, FL or Austin, TX" value={discoverForm.location} onChange={e => setDiscoverForm(p => ({ ...p, location: e.target.value }))} />
              </div>
              <div>
                <label style={{ fontSize: '0.75rem', fontWeight: 500, color: '#8B92A5', display: 'block', marginBottom: '0.4rem' }}>Real Estate Niche</label>
                <select className="input" value={discoverForm.niche} onChange={e => setDiscoverForm(p => ({ ...p, niche: e.target.value }))}>
                  <option value="">All Niches</option>
                  <option>Luxury</option><option>Residential</option><option>Commercial</option><option>Coastal</option><option>Rental</option>
                </select>
              </div>
              <div>
                <label style={{ fontSize: '0.75rem', fontWeight: 500, color: '#8B92A5', display: 'block', marginBottom: '0.4rem' }}>Primary Source</label>
                <select className="input" value={discoverForm.source} onChange={e => setDiscoverForm(p => ({ ...p, source: e.target.value }))}>
                  <option>LinkedIn</option><option>Google</option><option>Instagram</option><option>Directories</option>
                </select>
              </div>
              {discovering ? (
                <div style={{ padding: '1.5rem', background: '#0A0C10', borderRadius: 8, border: '1px solid #1E2330', textAlign: 'center' }}>
                  <div className="spin" style={{ display: 'inline-block', width: 32, height: 32, border: '3px solid #1E2330', borderTopColor: '#3B82F6', borderRadius: '50%', marginBottom: '0.875rem' }} />
                  <div style={{ fontSize: '0.875rem', fontWeight: 600, color: '#F0F2F8', marginBottom: '0.25rem' }}>AI Discovering Leads...</div>
                  <div style={{ fontSize: '0.75rem', color: '#8B92A5' }}>Scanning {discoverForm.source} for {discoverForm.location}</div>
                </div>
              ) : (
                <button className="btn-primary" onClick={runDiscover} style={{ justifyContent: 'center', padding: '0.75rem', fontSize: '0.875rem' }}>
                  <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
                  Start Discovery
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default function LeadsPage() {
  return <LeadgenShell><LeadsContent /></LeadgenShell>
}
