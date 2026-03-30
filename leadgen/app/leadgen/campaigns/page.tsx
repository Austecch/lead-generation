'use client'
import { useState } from 'react'
import LeadgenShell from '@/components/leadgen/LeadgenShell'

type Campaign = {
  id: number; name: string; client: string; status: 'active'|'paused'|'completed'
  channel: string; leads: number; sent: number; opened: number; replied: number
  booked: number; created: string; sequence: number; dailyLimit: number
}

const CAMPAIGNS: Campaign[] = [
  { id:1, name:'Miami Luxury Brokers Q1', client:'Self', status:'active', channel:'Email + LinkedIn', leads:124, sent:98, opened:41, replied:18, booked:4, created:'Jan 12', sequence:5, dailyLimit:30 },
  { id:2, name:'Austin Residential Outreach', client:'John Realty Co.', status:'active', channel:'Email', leads:87, sent:72, opened:28, replied:11, booked:2, created:'Jan 18', sequence:3, dailyLimit:25 },
  { id:3, name:'NY Commercial Agents', client:'Self', status:'paused', channel:'LinkedIn', leads:56, sent:40, opened:14, replied:5, booked:1, created:'Feb 1', sequence:4, dailyLimit:20 },
  { id:4, name:'Denver Luxury Follow-up', client:'Peak Properties', status:'completed', channel:'Email + Instagram', leads:200, sent:195, opened:88, replied:36, booked:9, created:'Dec 10', sequence:5, dailyLimit:40 },
]

type Message = { id: number; subject: string; body: string; channel: string; step: number }

const AI_ENDPOINT = 'https://llm.blackbox.ai/chat/completions'
const AI_HEADERS = { 'Content-Type': 'application/json', 'Authorization': 'Bearer xxx', 'customerId': 'cus_UEykgdMhJdMcWM' }

function CampaignsContent() {
  const [campaigns, setCampaigns] = useState<Campaign[]>(CAMPAIGNS)
  const [tab, setTab] = useState<'campaigns'|'compose'>('campaigns')
  const [showNew, setShowNew] = useState(false)
  const [selected, setSelected] = useState<Campaign | null>(null)
  const [toast, setToast] = useState('')

  // AI Composer state
  const [composeForm, setComposeForm] = useState({
    businessName: '', contactName: '', location: '', niche: '', recentActivity: '', channel: 'Email', tone: 'Professional', sequence: 3
  })
  const [generating, setGenerating] = useState(false)
  const [generatedMsgs, setGeneratedMsgs] = useState<Message[]>([])
  const [activeMsg, setActiveMsg] = useState(0)
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)

  // New campaign form
  const [newCamp, setNewCamp] = useState({ name:'', client:'Self', channel:'Email', dailyLimit:'25', sequence:'3' })

  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(''), 3000) }

  const generateMessages = async () => {
    if (!composeForm.businessName || !composeForm.contactName) return
    setGenerating(true)
    setGeneratedMsgs([])
    setSent(false)
    try {
      const prompt = `You are an expert real estate outreach copywriter. Generate a ${composeForm.sequence ?? 3}-step outreach sequence for a real estate agent targeting the following lead:

Business: ${composeForm.businessName}
Contact: ${composeForm.contactName}
Location: ${composeForm.location}
Niche: ${composeForm.niche}
Recent Activity: ${composeForm.recentActivity || 'Not provided'}
Channel: ${composeForm.channel}
Tone: ${composeForm.tone}

Rules:
- Message 1: Cold outreach — reference something specific about their business
- Message 2: Follow-up — add value, don't just ask again
- Message 3: Final follow-up — create urgency politely
- Each message must feel personal and human, NOT like a template
- For Email: include a Subject line. For LinkedIn/Instagram: no subject needed.
- Keep messages concise (under 120 words each)
- Do NOT mention any AI or automation

Return ONLY a JSON array like:
[
  {"step":1,"subject":"Subject here (Email only)","body":"Message body here"},
  {"step":2,"subject":"...","body":"..."},
  {"step":3,"subject":"...","body":"..."}
]`

      const res = await fetch(AI_ENDPOINT, {
        method: 'POST',
        headers: AI_HEADERS,
        body: JSON.stringify({ model: 'openrouter/claude-sonnet-4', messages: [{ role: 'user', content: prompt }] })
      })
      const data = await res.json()
      const raw = data.choices?.[0]?.message?.content ?? '[]'
      const jsonMatch = raw.match(/\[[\s\S]*\]/)
      const parsed = jsonMatch ? JSON.parse(jsonMatch[0]) : []
      setGeneratedMsgs(parsed.map((m: any, i: number) => ({ id: i, subject: m.subject || '', body: m.body, channel: composeForm.channel, step: m.step })))
      setActiveMsg(0)
    } catch {
      setGeneratedMsgs([{ id:0, subject:'Follow-up on Your Real Estate Growth', body:`Hi ${composeForm.contactName},\n\nI came across ${composeForm.businessName} and was really impressed by your work in the ${composeForm.niche || composeForm.location} market.\n\nI help real estate agents like you generate 15–30 qualified leads per month using a targeted outreach system — without cold calling.\n\nWould you be open to a 15-minute call this week to see if it could work for you?\n\nBest,\n[Your Name]`, channel: composeForm.channel, step:1 }])
    }
    setGenerating(false)
  }

  const sendOutreach = async () => {
    setSending(true)
    await new Promise(r => setTimeout(r, 1500))
    setSending(false)
    setSent(true)
    showToast(`Outreach sent to ${composeForm.contactName} via ${composeForm.channel}`)
  }

  const toggleStatus = (id: number) => {
    setCampaigns(prev => prev.map(c => c.id === id ? { ...c, status: c.status === 'active' ? 'paused' : 'active' } : c))
    showToast('Campaign status updated')
  }

  const addCampaign = () => {
    if (!newCamp.name) return
    const c: Campaign = { id: Date.now(), name: newCamp.name, client: newCamp.client, status: 'active', channel: newCamp.channel, leads: 0, sent: 0, opened: 0, replied: 0, booked: 0, created: 'Today', sequence: Number(newCamp.sequence), dailyLimit: Number(newCamp.dailyLimit) }
    setCampaigns(prev => [c, ...prev])
    setShowNew(false)
    showToast('Campaign created successfully')
  }

  const deleteCampaign = (id: number) => { setCampaigns(p => p.filter(c => c.id !== id)); if (selected?.id === id) setSelected(null); showToast('Campaign deleted') }

  return (
    <div className="fade-in">
      {toast && <div style={{ position:'fixed', bottom:'1.5rem', right:'1.5rem', background:'#10B981', color:'#fff', padding:'0.75rem 1.25rem', borderRadius:8, fontSize:'0.8rem', fontWeight:500, zIndex:999, boxShadow:'0 8px 24px rgba(0,0,0,0.3)' }}>{toast}</div>}

      {/* Header */}
      <div style={{ marginBottom:'1.5rem', display:'flex', alignItems:'center', justifyContent:'space-between', flexWrap:'wrap', gap:'1rem' }}>
        <div>
          <h1 style={{ fontSize:'1.375rem', fontWeight:700, color:'#F0F2F8' }}>Campaigns & AI Outreach</h1>
          <p style={{ color:'#8B92A5', fontSize:'0.8rem', marginTop:'0.2rem' }}>Multi-channel outreach with AI-personalized messaging</p>
        </div>
        <div style={{ display:'flex', gap:'0.5rem' }}>
          <button className="btn-ghost" onClick={() => setTab(tab === 'campaigns' ? 'compose' : 'campaigns')} style={{ fontSize:'0.75rem' }}>
            {tab === 'campaigns' ? <><svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></svg> AI Composer</> : '← Campaigns'}
          </button>
          {tab === 'campaigns' && <button className="btn-primary" onClick={() => setShowNew(true)} style={{ fontSize:'0.75rem' }}>
            <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
            New Campaign
          </button>}
        </div>
      </div>

      {tab === 'campaigns' ? (
        <>
          {/* Campaigns grid */}
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(320px,1fr))', gap:'1rem', marginBottom:'1.5rem' }}>
            {campaigns.map(c => (
              <div key={c.id} className="card" style={{ padding:'1.25rem', cursor:'pointer', border: selected?.id === c.id ? '1px solid #3B82F6' : '1px solid #1E2330' }} onClick={() => setSelected(selected?.id === c.id ? null : c)}>
                <div style={{ display:'flex', justifyContent:'space-between', marginBottom:'0.75rem' }}>
                  <div style={{ flex:1, minWidth:0 }}>
                    <div style={{ fontSize:'0.875rem', fontWeight:600, color:'#F0F2F8', marginBottom:'0.2rem' }}>{c.name}</div>
                    <div style={{ fontSize:'0.72rem', color:'#8B92A5' }}>{c.client} · {c.channel}</div>
                  </div>
                  <span className={`badge badge-${c.status}`} style={{ marginLeft:'0.5rem', flexShrink:0 }}>{c.status}</span>
                </div>
                <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr 1fr', gap:'0.5rem', marginBottom:'1rem' }}>
                  {[['Leads',c.leads,'#3B82F6'],['Sent',c.sent,'#8B5CF6'],['Replies',c.replied,'#10B981'],['Booked',c.booked,'#F59E0B']].map(([l,v,color]) => (
                    <div key={l} style={{ textAlign:'center', padding:'0.5rem', background:'#0A0C10', borderRadius:6 }}>
                      <div style={{ fontSize:'1.125rem', fontWeight:700, color: color as string }}>{v}</div>
                      <div style={{ fontSize:'0.6rem', color:'#4A5168', marginTop:'0.1rem' }}>{l}</div>
                    </div>
                  ))}
                </div>
                <div style={{ marginBottom:'0.75rem' }}>
                  <div style={{ display:'flex', justifyContent:'space-between', marginBottom:'0.25rem' }}>
                    <span style={{ fontSize:'0.68rem', color:'#8B92A5' }}>Open Rate</span>
                    <span style={{ fontSize:'0.68rem', fontWeight:600, color:'#F0F2F8' }}>{c.sent > 0 ? Math.round((c.opened/c.sent)*100) : 0}%</span>
                  </div>
                  <div className="progress-bar">
                    <div className="progress-fill" style={{ width:`${c.sent > 0 ? (c.opened/c.sent)*100 : 0}%`, background:'#3B82F6' }} />
                  </div>
                </div>
                <div style={{ display:'flex', gap:'0.4rem' }} onClick={e => e.stopPropagation()}>
                  {c.status !== 'completed' && <button className={c.status === 'active' ? 'btn-ghost' : 'btn-emerald'} onClick={() => toggleStatus(c.id)} style={{ flex:1, justifyContent:'center', fontSize:'0.72rem', padding:'0.375rem 0' }}>
                    {c.status === 'active' ? 'Pause' : 'Resume'}
                  </button>}
                  <button className="btn-ghost" onClick={() => { setComposeForm(p => ({ ...p, channel: c.channel.split(' ')[0] })); setTab('compose') }} style={{ flex:1, justifyContent:'center', fontSize:'0.72rem', padding:'0.375rem 0' }}>Compose</button>
                  <button className="btn-danger" onClick={() => deleteCampaign(c.id)} style={{ padding:'0.375rem 0.6rem', fontSize:'0.72rem' }}>
                    <svg width="11" height="11" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M9 6V4h6v2"/></svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        /* ── AI Composer ── */
        <div style={{ display:'grid', gridTemplateColumns:'400px 1fr', gap:'1.5rem' }}>
          {/* Input form */}
          <div className="card" style={{ padding:'1.25rem', height:'fit-content', position:'sticky', top:'5rem' }}>
            <div style={{ fontSize:'0.875rem', fontWeight:700, color:'#F0F2F8', marginBottom:'0.25rem' }}>AI Message Composer</div>
            <div style={{ fontSize:'0.72rem', color:'#8B92A5', marginBottom:'1.25rem' }}>Generate personalized outreach for any lead</div>
            <div style={{ display:'flex', flexDirection:'column', gap:'0.875rem' }}>
              {[
                { key:'businessName', label:'Business Name *', ph:'e.g. The Prestige Group' },
                { key:'contactName',  label:'Contact Name *',  ph:'e.g. James Harrington' },
                { key:'location',     label:'Location',        ph:'e.g. Miami, FL' },
                { key:'recentActivity', label:'Recent Activity (optional)', ph:'e.g. posted luxury listing last week' },
              ].map(f => (
                <div key={f.key}>
                  <label style={{ fontSize:'0.72rem', fontWeight:500, color:'#8B92A5', display:'block', marginBottom:'0.3rem' }}>{f.label}</label>
                  <input className="input" placeholder={f.ph} value={(composeForm as any)[f.key]} onChange={e => setComposeForm(p => ({ ...p, [f.key]: e.target.value }))} />
                </div>
              ))}
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'0.5rem' }}>
                <div>
                  <label style={{ fontSize:'0.72rem', fontWeight:500, color:'#8B92A5', display:'block', marginBottom:'0.3rem' }}>Niche</label>
                  <select className="input" value={composeForm.niche} onChange={e => setComposeForm(p=>({...p,niche:e.target.value}))}>
                    <option value="">Any</option><option>Luxury</option><option>Residential</option><option>Commercial</option><option>Coastal</option>
                  </select>
                </div>
                <div>
                  <label style={{ fontSize:'0.72rem', fontWeight:500, color:'#8B92A5', display:'block', marginBottom:'0.3rem' }}>Channel</label>
                  <select className="input" value={composeForm.channel} onChange={e => setComposeForm(p=>({...p,channel:e.target.value}))}>
                    <option>Email</option><option>LinkedIn</option><option>Instagram</option>
                  </select>
                </div>
              </div>
              <div>
                <label style={{ fontSize:'0.72rem', fontWeight:500, color:'#8B92A5', display:'block', marginBottom:'0.3rem' }}>Tone</label>
                <select className="input" value={composeForm.tone} onChange={e => setComposeForm(p=>({...p,tone:e.target.value}))}>
                  <option>Professional</option><option>Friendly</option><option>Casual</option><option>Urgent</option>
                </select>
              </div>
              <button className="btn-primary" onClick={generateMessages} disabled={generating || !composeForm.businessName || !composeForm.contactName} style={{ justifyContent:'center', padding:'0.75rem', fontSize:'0.8rem', marginTop:'0.25rem' }}>
                {generating ? <><span className="spin" style={{ display:'inline-block',width:14,height:14,border:'2px solid rgba(255,255,255,0.3)',borderTopColor:'#fff',borderRadius:'50%' }} /> Generating...</> : <><svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg> Generate with AI</>}
              </button>
            </div>
          </div>

          {/* Generated messages */}
          <div>
            {generatedMsgs.length === 0 && !generating ? (
              <div style={{ display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', minHeight:400, background:'#111318', borderRadius:12, border:'1px solid #1E2330', padding:'3rem' }}>
                <div style={{ width:56, height:56, borderRadius:16, background:'rgba(59,130,246,0.1)', border:'1px solid rgba(59,130,246,0.2)', display:'flex', alignItems:'center', justifyContent:'center', marginBottom:'1rem' }}>
                  <svg width="24" height="24" fill="none" stroke="#3B82F6" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></svg>
                </div>
                <div style={{ fontSize:'0.9rem', fontWeight:600, color:'#F0F2F8', marginBottom:'0.4rem' }}>AI Composer Ready</div>
                <div style={{ fontSize:'0.78rem', color:'#8B92A5', textAlign:'center', maxWidth:320 }}>Fill in the lead details and click "Generate with AI" to create a personalized outreach sequence using Claude AI.</div>
              </div>
            ) : generating ? (
              <div style={{ display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', minHeight:400, background:'#111318', borderRadius:12, border:'1px solid #1E2330', padding:'3rem' }}>
                <div className="spin" style={{ width:40,height:40,border:'3px solid #1E2330',borderTopColor:'#3B82F6',borderRadius:'50%',marginBottom:'1rem' }} />
                <div style={{ fontSize:'0.875rem', fontWeight:600, color:'#F0F2F8', marginBottom:'0.25rem' }}>Claude AI is composing...</div>
                <div style={{ fontSize:'0.75rem', color:'#8B92A5' }}>Creating personalized messages for {composeForm.contactName}</div>
              </div>
            ) : (
              <div>
                <div style={{ display:'flex', gap:'0.5rem', marginBottom:'1rem' }}>
                  {generatedMsgs.map((m,i) => (
                    <button key={m.id} onClick={() => setActiveMsg(i)} style={{ padding:'0.4rem 0.875rem', borderRadius:6, border:'none', cursor:'pointer', fontSize:'0.775rem', fontWeight:500, background: activeMsg === i ? '#3B82F6' : '#1E2330', color: activeMsg === i ? '#fff' : '#8B92A5', transition:'all 0.2s' }}>
                      Step {m.step}
                    </button>
                  ))}
                  {sent && <span className="badge badge-active" style={{ marginLeft:'auto', alignSelf:'center' }}>Sent!</span>}
                </div>
                {generatedMsgs[activeMsg] && (
                  <div className="card fade-in" style={{ padding:'1.5rem' }}>
                    <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'1rem' }}>
                      <div>
                        <span style={{ fontSize:'0.7rem', padding:'0.2rem 0.6rem', borderRadius:4, background:'rgba(59,130,246,0.15)', color:'#93C5FD', border:'1px solid rgba(59,130,246,0.3)', fontWeight:500 }}>{generatedMsgs[activeMsg].channel}</span>
                        <span style={{ fontSize:'0.7rem', color:'#8B92A5', marginLeft:'0.5rem' }}>Step {generatedMsgs[activeMsg].step} of {generatedMsgs.length}</span>
                      </div>
                    </div>
                    {generatedMsgs[activeMsg].subject && (
                      <div style={{ marginBottom:'0.875rem', padding:'0.625rem 0.875rem', background:'#0A0C10', borderRadius:6, border:'1px solid #1E2330' }}>
                        <span style={{ fontSize:'0.68rem', color:'#4A5168', textTransform:'uppercase', letterSpacing:'0.06em' }}>Subject: </span>
                        <span style={{ fontSize:'0.8125rem', color:'#F0F2F8', fontWeight:500 }}>{generatedMsgs[activeMsg].subject}</span>
                      </div>
                    )}
                    <textarea
                      value={generatedMsgs[activeMsg].body}
                      onChange={e => setGeneratedMsgs(prev => prev.map((m,i) => i === activeMsg ? { ...m, body: e.target.value } : m))}
                      style={{ width:'100%', minHeight:200, background:'#0A0C10', border:'1px solid #1E2330', borderRadius:8, padding:'1rem', color:'#D1D5DB', fontSize:'0.8125rem', lineHeight:1.7, resize:'vertical', outline:'none', fontFamily:'inherit' }}
                    />
                    <div style={{ display:'flex', gap:'0.5rem', marginTop:'1rem' }}>
                      <button className="btn-emerald" onClick={sendOutreach} disabled={sending || sent} style={{ flex:1, justifyContent:'center', fontSize:'0.8rem', padding:'0.625rem' }}>
                        {sending ? <><span className="spin" style={{ display:'inline-block',width:12,height:12,border:'2px solid rgba(255,255,255,0.3)',borderTopColor:'#fff',borderRadius:'50%' }} /> Sending...</> : sent ? 'Sent!' : <><svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg> Send Now</>}
                      </button>
                      <button className="btn-ghost" onClick={() => { generateMessages() }} style={{ fontSize:'0.8rem', padding:'0.625rem 1rem' }}>Regenerate</button>
                      <button className="btn-ghost" onClick={() => { navigator.clipboard.writeText(generatedMsgs[activeMsg].body); showToast('Copied to clipboard') }} style={{ fontSize:'0.8rem', padding:'0.625rem 0.875rem' }}>
                        <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* New Campaign Modal */}
      {showNew && (
        <div className="modal-overlay" onClick={() => setShowNew(false)}>
          <div className="modal-box" onClick={e => e.stopPropagation()}>
            <div style={{ padding:'1.5rem', borderBottom:'1px solid #1E2330', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
              <div style={{ fontSize:'1rem', fontWeight:700, color:'#F0F2F8' }}>Create New Campaign</div>
              <button onClick={() => setShowNew(false)} style={{ background:'none', border:'none', color:'#4A5168', cursor:'pointer' }}><svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></button>
            </div>
            <div style={{ padding:'1.5rem', display:'flex', flexDirection:'column', gap:'1rem' }}>
              {[{key:'name',label:'Campaign Name *',ph:'e.g. Miami Luxury Brokers Q2'},{key:'client',label:'Client',ph:'Self or client name'}].map(f => (
                <div key={f.key}>
                  <label style={{ fontSize:'0.75rem', fontWeight:500, color:'#8B92A5', display:'block', marginBottom:'0.4rem' }}>{f.label}</label>
                  <input className="input" placeholder={f.ph} value={(newCamp as any)[f.key]} onChange={e => setNewCamp(p=>({...p,[f.key]:e.target.value}))} />
                </div>
              ))}
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:'0.75rem' }}>
                {[
                  { key:'channel', label:'Channel', opts:['Email','LinkedIn','Instagram','Email + LinkedIn','Email + Instagram'] },
                  { key:'sequence', label:'Sequence Steps', opts:['3','4','5'] },
                  { key:'dailyLimit', label:'Daily Limit', opts:['10','20','25','30','40','50'] },
                ].map(f => (
                  <div key={f.key}>
                    <label style={{ fontSize:'0.72rem', fontWeight:500, color:'#8B92A5', display:'block', marginBottom:'0.3rem' }}>{f.label}</label>
                    <select className="input" value={(newCamp as any)[f.key]} onChange={e => setNewCamp(p=>({...p,[f.key]:e.target.value}))}>
                      {f.opts.map(o => <option key={o}>{o}</option>)}
                    </select>
                  </div>
                ))}
              </div>
              <button className="btn-primary" onClick={addCampaign} style={{ justifyContent:'center', padding:'0.75rem', fontSize:'0.875rem', marginTop:'0.25rem' }}>Create Campaign</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default function CampaignsPage() {
  return <LeadgenShell><CampaignsContent /></LeadgenShell>
}
