'use client'
import { useState } from 'react'
import LeadgenShell from '@/components/leadgen/LeadgenShell'

type Reply = {
  id: number; from: string; business: string; email: string; channel: string
  message: string; receivedAt: string; classification: 'interested'|'notinterested'|'moreinfo'
  status: 'unread'|'read'|'responded'
  aiSuggestedReply: string
}

const INITIAL_REPLIES: Reply[] = [
  { id:1, from:'James Harrington', business:'The Prestige Group', email:'james@prestigegroup.com', channel:'Email', message:"Hi, thanks for reaching out! I'm actually looking for ways to grow our lead pipeline right now. Would love to hear more about your system. When are you available for a quick call?", receivedAt:'2 hours ago', classification:'interested', status:'unread', aiSuggestedReply:"Hi James, great to hear from you! I'm glad the timing works out. I have availability this Thursday at 2pm or Friday at 10am ET — which works better for you? Looking forward to showing you how we can bring consistent qualified leads to The Prestige Group.\n\nBest,\n[Your Name]" },
  { id:2, from:'Derek Chan', business:'Harbor View Homes', email:'derek@harborviewhomes.com', channel:'LinkedIn', message:"Hey, I saw your message. Can you tell me more about how the system works and what kind of results agents typically see? I'd want to understand it better before committing to a call.", receivedAt:'5 hours ago', classification:'moreinfo', status:'unread', aiSuggestedReply:"Hi Derek, totally understand — you want to know it's worth your time before booking anything. Here's the short version: we use AI to find real estate agents in your target market who are actively growing, then we send personalized outreach on your behalf and pass you the replies. Most agents see 10–20 warm leads in the first 30 days.\n\nHappy to send over a quick case study if that helps. Would that be useful?\n\nBest,\n[Your Name]" },
  { id:3, from:'Maria Santos', business:'Sunrise Realty Co.', email:'msantos@sunriserealty.com', channel:'Email', message:"We already have a lead system in place and aren't looking to make changes right now. Thanks anyway.", receivedAt:'1 day ago', classification:'notinterested', status:'read', aiSuggestedReply:"Hi Maria, completely understand — no pressure at all. If anything changes or your current system doesn't hit the numbers you need this quarter, feel free to reach back out. I'll check in again in about 90 days in case the timing is better then.\n\nWishing you a great quarter!\n[Your Name]" },
  { id:4, from:'Amanda Wells', business:'BlueSky Brokers', email:'amanda@blueskybrokers.com', channel:'LinkedIn', message:"This looks really interesting! We've been struggling with consistent leads lately. What does the pricing look like?", receivedAt:'1 day ago', classification:'interested', status:'unread', aiSuggestedReply:"Hi Amanda, really glad it caught your attention! Pricing depends on your market size and goals — we structure it to be performance-based, so you only pay when we deliver results.\n\nThe best way to figure out what makes sense for BlueSky Brokers is a quick 15-minute call. I can walk you through everything and give you a clear picture. How does Thursday or Friday look for you?\n\nLooking forward to it!" },
  { id:5, from:'Robert Nguyen', business:'Gold Key Realty', email:'robert@goldkeyrealty.com', channel:'Email', message:"Interesting. What markets are you currently working in? We operate mostly in Las Vegas.", receivedAt:'2 days ago', classification:'moreinfo', status:'responded', aiSuggestedReply:"Hi Robert, we work across all US markets including Las Vegas — actually a strong market for what we do given the volume of agents and the competitive luxury segment there.\n\nWe've helped agents in similar markets generate 15–25 qualified leads per month. Would it make sense to jump on a quick call to see if it fits what you're doing at Gold Key?\n\n[Your Name]" },
]

const AI_ENDPOINT = 'https://llm.blackbox.ai/chat/completions'
const AI_HEADERS = { 'Content-Type': 'application/json', 'Authorization': 'Bearer xxx', 'customerId': 'cus_UEykgdMhJdMcWM' }

function RepliesContent() {
  const [replies, setReplies] = useState<Reply[]>(INITIAL_REPLIES)
  const [selected, setSelected] = useState<Reply | null>(INITIAL_REPLIES[0])
  const [filter, setFilter] = useState<'all'|'interested'|'moreinfo'|'notinterested'>('all')
  const [customReply, setCustomReply] = useState('')
  const [sending, setSending] = useState(false)
  const [regenerating, setRegenerating] = useState(false)
  const [toast, setToast] = useState('')

  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(''), 3000) }

  const filtered = replies.filter(r => filter === 'all' || r.classification === filter)

  const selectReply = (r: Reply) => {
    setSelected(r)
    setCustomReply(r.aiSuggestedReply)
    setReplies(prev => prev.map(x => x.id === r.id ? { ...x, status: x.status === 'unread' ? 'read' : x.status } : x))
  }

  const sendReply = async () => {
    if (!selected) return
    setSending(true)
    await new Promise(r => setTimeout(r, 1200))
    setReplies(prev => prev.map(r => r.id === selected.id ? { ...r, status: 'responded' } : r))
    setSelected(s => s ? { ...s, status: 'responded' } : null)
    setSending(false)
    showToast(`Reply sent to ${selected.from}`)
  }

  const regenerateReply = async () => {
    if (!selected) return
    setRegenerating(true)
    try {
      const res = await fetch(AI_ENDPOINT, {
        method: 'POST', headers: AI_HEADERS,
        body: JSON.stringify({ model: 'openrouter/claude-sonnet-4', messages: [{ role: 'user', content: `You are a helpful sales assistant. Write a concise, natural, professional reply to this message from ${selected.from} at ${selected.business}:\n\n"${selected.message}"\n\nClassification: ${selected.classification}\n\nKeep it short (under 100 words), human, and focused on moving toward a booked call. Do not mention AI. Sign off as [Your Name].` }] })
      })
      const data = await res.json()
      const text = data.choices?.[0]?.message?.content ?? ''
      if (text) { setCustomReply(text); setReplies(prev => prev.map(r => r.id === selected.id ? { ...r, aiSuggestedReply: text } : r)) }
    } catch { /* keep existing */ }
    setRegenerating(false)
  }

  const archiveReply = (id: number) => {
    setReplies(prev => prev.filter(r => r.id !== id))
    if (selected?.id === id) setSelected(null)
    showToast('Reply archived')
  }

  const unread = replies.filter(r => r.status === 'unread').length
  const interested = replies.filter(r => r.classification === 'interested').length
  const needsInfo = replies.filter(r => r.classification === 'moreinfo').length

  const classColor: Record<string, string> = { interested: '#10B981', moreinfo: '#8B5CF6', notinterested: '#F43F5E' }
  const classBadge: Record<string, string> = { interested: 'badge-interested', moreinfo: 'badge-moreinfo', notinterested: 'badge-notinterested' }

  return (
    <div className="fade-in">
      {toast && <div style={{ position:'fixed', bottom:'1.5rem', right:'1.5rem', background:'#10B981', color:'#fff', padding:'0.75rem 1.25rem', borderRadius:8, fontSize:'0.8rem', fontWeight:500, zIndex:999, boxShadow:'0 8px 24px rgba(0,0,0,0.3)' }}>{toast}</div>}

      {/* Header */}
      <div style={{ marginBottom:'1.5rem', display:'flex', alignItems:'center', justifyContent:'space-between', flexWrap:'wrap', gap:'1rem' }}>
        <div>
          <h1 style={{ fontSize:'1.375rem', fontWeight:700, color:'#F0F2F8' }}>Reply Management</h1>
          <p style={{ color:'#8B92A5', fontSize:'0.8rem', marginTop:'0.2rem' }}>{unread} unread · {interested} interested · {needsInfo} need info</p>
        </div>
        <div style={{ display:'flex', gap:'0.5rem' }}>
          {(['all','interested','moreinfo','notinterested'] as const).map(f => (
            <button key={f} onClick={() => setFilter(f)} className={filter === f ? 'btn-primary' : 'btn-ghost'} style={{ fontSize:'0.72rem', padding:'0.375rem 0.75rem', textTransform:'capitalize' }}>
              {f === 'all' ? 'All' : f === 'moreinfo' ? 'Needs Info' : f.charAt(0).toUpperCase()+f.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Inbox layout */}
      <div style={{ display:'grid', gridTemplateColumns:'340px 1fr', gap:'1rem', minHeight:600 }}>
        {/* Reply list */}
        <div className="card" style={{ overflow:'hidden', display:'flex', flexDirection:'column' }}>
          <div style={{ padding:'0.875rem 1rem', borderBottom:'1px solid #1E2330', fontSize:'0.75rem', fontWeight:600, color:'#8B92A5', textTransform:'uppercase', letterSpacing:'0.06em' }}>
            {filtered.length} Replies
          </div>
          <div style={{ flex:1, overflowY:'auto' }}>
            {filtered.map(r => (
              <div key={r.id} onClick={() => selectReply(r)} style={{ padding:'0.875rem 1rem', borderBottom:'1px solid #1E2330', cursor:'pointer', background: selected?.id === r.id ? '#1E2330' : 'transparent', transition:'background 0.15s', borderLeft: `3px solid ${selected?.id === r.id ? classColor[r.classification] : 'transparent'}` }}>
                <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:'0.35rem' }}>
                  <div style={{ display:'flex', alignItems:'center', gap:'0.4rem' }}>
                    {r.status === 'unread' && <div style={{ width:6, height:6, borderRadius:'50%', background:'#3B82F6', flexShrink:0 }} />}
                    <span style={{ fontSize:'0.8rem', fontWeight:600, color:'#F0F2F8' }}>{r.from}</span>
                  </div>
                  <span style={{ fontSize:'0.65rem', color:'#4A5168' }}>{r.receivedAt}</span>
                </div>
                <div style={{ fontSize:'0.72rem', color:'#8B92A5', marginBottom:'0.4rem' }}>{r.business}</div>
                <div style={{ fontSize:'0.72rem', color:'#8B92A5', lineHeight:1.4, overflow:'hidden', display:'-webkit-box', WebkitLineClamp:2, WebkitBoxOrient:'vertical' }}>{r.message}</div>
                <div style={{ display:'flex', gap:'0.4rem', marginTop:'0.5rem', alignItems:'center' }}>
                  <span className={`badge ${classBadge[r.classification]}`} style={{ fontSize:'0.62rem' }}>{r.classification === 'moreinfo' ? 'Needs Info' : r.classification === 'notinterested' ? 'Not Interested' : 'Interested'}</span>
                  <span style={{ fontSize:'0.62rem', padding:'0.15rem 0.4rem', borderRadius:4, background:'#0A0C10', color:'#4A5168', border:'1px solid #1E2330' }}>{r.channel}</span>
                  {r.status === 'responded' && <span style={{ fontSize:'0.62rem', color:'#34D399', marginLeft:'auto' }}>Responded</span>}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Reply composer */}
        {selected ? (
          <div style={{ display:'flex', flexDirection:'column', gap:'1rem' }}>
            {/* Incoming message */}
            <div className="card" style={{ padding:'1.25rem' }}>
              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:'1rem' }}>
                <div style={{ display:'flex', gap:'0.75rem', alignItems:'flex-start' }}>
                  <div style={{ width:38, height:38, borderRadius:'50%', background:`${classColor[selected.classification]}22`, border:`1px solid ${classColor[selected.classification]}44`, display:'flex', alignItems:'center', justifyContent:'center', fontSize:'0.875rem', fontWeight:700, color:classColor[selected.classification], flexShrink:0 }}>
                    {selected.from.charAt(0)}
                  </div>
                  <div>
                    <div style={{ fontSize:'0.875rem', fontWeight:600, color:'#F0F2F8' }}>{selected.from}</div>
                    <div style={{ fontSize:'0.72rem', color:'#8B92A5' }}>{selected.business} · {selected.email}</div>
                    <div style={{ fontSize:'0.68rem', color:'#4A5168', marginTop:'0.1rem' }}>{selected.receivedAt} via {selected.channel}</div>
                  </div>
                </div>
                <div style={{ display:'flex', gap:'0.4rem', alignItems:'center' }}>
                  <span className={`badge ${classBadge[selected.classification]}`}>{selected.classification === 'moreinfo' ? 'Needs Info' : selected.classification === 'notinterested' ? 'Not Interested' : 'Interested'}</span>
                  <button className="btn-danger" onClick={() => archiveReply(selected.id)} style={{ padding:'0.3rem 0.5rem', fontSize:'0.68rem' }}>Archive</button>
                </div>
              </div>
              <div style={{ background:'#0A0C10', borderRadius:8, padding:'1rem', border:'1px solid #1E2330', fontSize:'0.8125rem', color:'#D1D5DB', lineHeight:1.7 }}>
                {selected.message}
              </div>
            </div>

            {/* AI Suggested Reply */}
            <div className="card" style={{ padding:'1.25rem', flex:1 }}>
              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'1rem' }}>
                <div style={{ display:'flex', alignItems:'center', gap:'0.5rem' }}>
                  <div style={{ width:22, height:22, borderRadius:6, background:'rgba(59,130,246,0.15)', border:'1px solid rgba(59,130,246,0.3)', display:'flex', alignItems:'center', justifyContent:'center' }}>
                    <svg width="11" height="11" fill="none" stroke="#3B82F6" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></svg>
                  </div>
                  <span style={{ fontSize:'0.8rem', fontWeight:600, color:'#F0F2F8' }}>AI Suggested Reply</span>
                  <span style={{ fontSize:'0.68rem', color:'#8B92A5' }}>— editable before sending</span>
                </div>
                <button className="btn-ghost" onClick={regenerateReply} disabled={regenerating} style={{ fontSize:'0.72rem', padding:'0.3rem 0.625rem' }}>
                  {regenerating ? <><span className="spin" style={{ display:'inline-block',width:10,height:10,border:'2px solid #333',borderTopColor:'#8B92A5',borderRadius:'50%' }} /> Regenerating</> : <>
                    <svg width="11" height="11" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 .49-4.5"/></svg>
                    Regenerate
                  </>}
                </button>
              </div>
              <textarea
                value={customReply}
                onChange={e => setCustomReply(e.target.value)}
                style={{ width:'100%', minHeight:180, background:'#0A0C10', border:'1px solid #1E2330', borderRadius:8, padding:'1rem', color:'#D1D5DB', fontSize:'0.8125rem', lineHeight:1.7, resize:'vertical', outline:'none', fontFamily:'inherit', marginBottom:'1rem' }}
              />
              <div style={{ display:'flex', gap:'0.5rem' }}>
                <button className="btn-primary" onClick={sendReply} disabled={sending || selected.status === 'responded'} style={{ flex:1, justifyContent:'center', fontSize:'0.8rem', padding:'0.625rem' }}>
                  {sending ? <><span className="spin" style={{ display:'inline-block',width:12,height:12,border:'2px solid rgba(255,255,255,0.3)',borderTopColor:'#fff',borderRadius:'50%' }} /> Sending...</> : selected.status === 'responded' ? 'Already Responded' : <><svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg> Approve & Send</>}
                </button>
                <button className="btn-ghost" onClick={() => { navigator.clipboard.writeText(customReply); showToast('Copied') }} style={{ fontSize:'0.8rem', padding:'0.625rem 0.875rem' }}>
                  <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div style={{ display:'flex', alignItems:'center', justifyContent:'center', background:'#111318', borderRadius:12, border:'1px solid #1E2330' }}>
            <div style={{ textAlign:'center' }}>
              <div style={{ fontSize:'0.9rem', fontWeight:600, color:'#F0F2F8', marginBottom:'0.4rem' }}>Select a reply</div>
              <div style={{ fontSize:'0.78rem', color:'#8B92A5' }}>Click any reply from the list to view and respond</div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default function RepliesPage() {
  return <LeadgenShell><RepliesContent /></LeadgenShell>
}
