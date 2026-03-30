'use client'
import { useState } from 'react'
import LeadgenShell from '@/components/leadgen/LeadgenShell'

function SettingsContent() {
  const [toast, setToast] = useState('')
  const [tab, setTab] = useState<'general'|'integrations'|'limits'|'team'>('general')

  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(''), 3000) }

  const [general, setGeneral] = useState({
    workspaceName: 'LeadForge AI', ownerName: 'Admin User',
    email: 'admin@leadforge.ai', phone: '(212) 555-0193',
    timezone: 'America/New_York', currency: 'USD',
  })

  const [limits, setLimits] = useState({
    dailyEmailLimit: 150, dailyLinkedinLimit: 40,
    dailyInstagramLimit: 30, followupMax: 4,
    followupDelayDays: 3, pauseBetweenMessages: 8,
  })

  const [integrations, setIntegrations] = useState([
    { name: 'Gmail', key: 'gmail', connected: true, desc: 'Outreach email channel', color: '#F43F5E', value: 'connected@leadforge.ai' },
    { name: 'LinkedIn', key: 'linkedin', connected: false, desc: 'Professional network outreach', color: '#3B82F6', value: '' },
    { name: 'Instagram', key: 'instagram', connected: false, desc: 'Social DM outreach', color: '#8B5CF6', value: '' },
    { name: 'OpenAI GPT-4', key: 'openai', connected: true, desc: 'AI personalization engine', color: '#10B981', value: 'sk-••••••••••••••••' },
    { name: 'Google Calendar', key: 'gcal', connected: false, desc: 'Appointment booking sync', color: '#F59E0B', value: '' },
    { name: 'Hunter.io', key: 'hunter', connected: true, desc: 'Email discovery & enrichment', color: '#6366F1', value: 'API key set' },
  ])

  const [team, setTeam] = useState([
    { name: 'Admin User', email: 'admin@leadforge.ai', role: 'Super Admin', status: 'active' },
    { name: 'Sarah Kim', email: 'sarah@leadforge.ai', role: 'Account Manager', status: 'active' },
    { name: 'Jake Torres', email: 'jake@leadforge.ai', role: 'Outreach Specialist', status: 'invited' },
  ])

  const [newMember, setNewMember] = useState({ name: '', email: '', role: 'Account Manager' })
  const [connectVal, setConnectVal] = useState('')
  const [connectKey, setConnectKey] = useState('')

  const toggleIntegration = (key: string) => {
    setIntegrations(p => p.map(i => i.key === key ? { ...i, connected: !i.connected, value: !i.connected ? connectVal : '' } : i))
    showToast(integrations.find(i => i.key === key)?.connected ? 'Integration disconnected' : 'Integration connected')
    setConnectVal('')
    setConnectKey('')
  }

  const addMember = () => {
    if (!newMember.email) return
    setTeam(p => [...p, { ...newMember, status: 'invited' }])
    setNewMember({ name: '', email: '', role: 'Account Manager' })
    showToast('Team member invited')
  }

  return (
    <div className="fade-in">
      {toast && <div className="toast">{toast}</div>}

      <div style={{ marginBottom: '1.5rem' }}>
        <h1 style={{ fontSize: '1.375rem', fontWeight: 700, color: '#F0F2F8' }}>Settings</h1>
        <p style={{ color: '#8B92A5', fontSize: '0.8rem', marginTop: '0.2rem' }}>Configure your workspace, integrations, and sending limits</p>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '0.25rem', marginBottom: '1.5rem', borderBottom: '1px solid #1E2330', paddingBottom: '0.5rem' }}>
        {(['general','integrations','limits','team'] as const).map(t => (
          <button key={t} onClick={() => setTab(t)} style={{ padding: '0.4rem 1rem', fontSize: '0.8rem', fontWeight: 500, borderRadius: '6px 6px 0 0', border: 'none', cursor: 'pointer', textTransform: 'capitalize', transition: 'all 0.2s', background: tab === t ? '#3B82F6' : 'transparent', color: tab === t ? '#fff' : '#8B92A5' }}>{t}</button>
        ))}
      </div>

      {/* General */}
      {tab === 'general' && (
        <div className="card" style={{ padding: '1.5rem', maxWidth: 560 }}>
          <div style={{ fontSize: '0.875rem', fontWeight: 600, color: '#F0F2F8', marginBottom: '1.25rem' }}>Workspace Settings</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            {Object.entries(general).map(([k, v]) => (
              <div key={k} style={k === 'workspaceName' ? { gridColumn: '1/-1' } : {}}>
                <label style={{ fontSize: '0.75rem', color: '#8B92A5', display: 'block', marginBottom: '0.3rem', textTransform: 'capitalize' }}>{k.replace(/([A-Z])/g, ' $1')}</label>
                {k === 'timezone' ? (
                  <select className="input" value={v} onChange={e => setGeneral(p => ({ ...p, [k]: e.target.value }))}>
                    {['America/New_York','America/Chicago','America/Denver','America/Los_Angeles','America/Phoenix'].map(tz => <option key={tz}>{tz}</option>)}
                  </select>
                ) : k === 'currency' ? (
                  <select className="input" value={v} onChange={e => setGeneral(p => ({ ...p, [k]: e.target.value }))}>
                    <option>USD</option><option>CAD</option><option>GBP</option>
                  </select>
                ) : (
                  <input className="input" value={v} onChange={e => setGeneral(p => ({ ...p, [k]: e.target.value }))} />
                )}
              </div>
            ))}
          </div>
          <button className="btn-primary" onClick={() => showToast('Settings saved successfully')} style={{ marginTop: '1.25rem', fontSize: '0.8rem' }}>Save Changes</button>
        </div>
      )}

      {/* Integrations */}
      {tab === 'integrations' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: '1rem' }}>
          {integrations.map(integ => (
            <div key={integ.key} className="card" style={{ padding: '1.25rem' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '0.875rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <div style={{ width: 36, height: 36, borderRadius: 8, background: `${integ.color}22`, border: `1px solid ${integ.color}44`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem', fontWeight: 700, color: integ.color }}>
                    {integ.name.charAt(0)}
                  </div>
                  <div>
                    <div style={{ fontSize: '0.875rem', fontWeight: 600, color: '#F0F2F8' }}>{integ.name}</div>
                    <div style={{ fontSize: '0.7rem', color: '#4A5168' }}>{integ.desc}</div>
                  </div>
                </div>
                <span style={{ fontSize: '0.68rem', padding: '0.2rem 0.5rem', borderRadius: 9999, background: integ.connected ? 'rgba(16,185,129,0.12)' : 'rgba(74,81,104,0.3)', color: integ.connected ? '#34D399' : '#6B7280', fontWeight: 500 }}>
                  {integ.connected ? 'Connected' : 'Not connected'}
                </span>
              </div>
              {integ.connected && integ.value && (
                <div style={{ fontSize: '0.72rem', color: '#8B92A5', marginBottom: '0.875rem', padding: '0.4rem 0.6rem', background: '#0A0C10', borderRadius: 4, border: '1px solid #1E2330' }}>{integ.value}</div>
              )}
              {!integ.connected && connectKey === integ.key && (
                <input className="input" placeholder="API key or account" value={connectVal} onChange={e => setConnectVal(e.target.value)} style={{ marginBottom: '0.75rem', fontSize: '0.8rem' }} />
              )}
              <button
                onClick={() => integ.connected ? toggleIntegration(integ.key) : (connectKey === integ.key ? toggleIntegration(integ.key) : setConnectKey(integ.key))}
                style={{ width: '100%', padding: '0.45rem', fontSize: '0.775rem', fontWeight: 500, borderRadius: 6, border: `1px solid ${integ.connected ? 'rgba(244,63,94,0.3)' : integ.color}`, background: 'transparent', color: integ.connected ? '#F43F5E' : integ.color, cursor: 'pointer', transition: 'all 0.2s' }}
              >
                {integ.connected ? 'Disconnect' : connectKey === integ.key ? 'Confirm Connect' : 'Connect'}
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Limits */}
      {tab === 'limits' && (
        <div className="card" style={{ padding: '1.5rem', maxWidth: 560 }}>
          <div style={{ fontSize: '0.875rem', fontWeight: 600, color: '#F0F2F8', marginBottom: '0.4rem' }}>Sending Limits & Anti-Spam Controls</div>
          <div style={{ fontSize: '0.775rem', color: '#8B92A5', marginBottom: '1.5rem', lineHeight: 1.6 }}>
            These limits protect your accounts from being flagged or banned. Recommended values are pre-set.
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.125rem' }}>
            {[
              { key: 'dailyEmailLimit', label: 'Daily Gmail sends', max: 500, unit: 'emails/day' },
              { key: 'dailyLinkedinLimit', label: 'Daily LinkedIn messages', max: 100, unit: 'messages/day' },
              { key: 'dailyInstagramLimit', label: 'Daily Instagram DMs', max: 80, unit: 'DMs/day' },
              { key: 'followupMax', label: 'Max follow-ups per lead', max: 10, unit: 'messages' },
              { key: 'followupDelayDays', label: 'Days between follow-ups', max: 14, unit: 'days' },
              { key: 'pauseBetweenMessages', label: 'Seconds between each send', max: 60, unit: 'seconds' },
            ].map(({ key, label, max, unit }) => (
              <div key={key}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
                  <label style={{ fontSize: '0.775rem', color: '#8B92A5' }}>{label}</label>
                  <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#3B82F6' }}>{(limits as any)[key]} {unit}</span>
                </div>
                <input type="range" min={1} max={max} value={(limits as any)[key]} onChange={e => setLimits(p => ({ ...p, [key]: Number(e.target.value) }))} style={{ width: '100%', accentColor: '#3B82F6' }} />
              </div>
            ))}
          </div>
          <button className="btn-primary" onClick={() => showToast('Limits saved successfully')} style={{ marginTop: '1.5rem', fontSize: '0.8rem' }}>Save Limits</button>
        </div>
      )}

      {/* Team */}
      {tab === 'team' && (
        <div style={{ display: 'grid', gap: '1.25rem' }}>
          <div className="card" style={{ overflow: 'hidden' }}>
            <div style={{ padding: '1rem 1.25rem', borderBottom: '1px solid #1E2330', fontSize: '0.875rem', fontWeight: 600, color: '#F0F2F8' }}>Team Members</div>
            <table className="data-table">
              <thead><tr><th>Name</th><th>Email</th><th>Role</th><th>Status</th><th>Actions</th></tr></thead>
              <tbody>
                {team.map((m, i) => (
                  <tr key={i}>
                    <td style={{ color: '#F0F2F8', fontWeight: 500 }}>{m.name}</td>
                    <td>{m.email}</td>
                    <td>{m.role}</td>
                    <td><span className={`badge badge-${m.status === 'active' ? 'hot' : 'warm'}`}>{m.status}</span></td>
                    <td>
                      {i > 0 && <button className="btn-ghost" onClick={() => { setTeam(p => p.filter((_, j) => j !== i)); showToast('Member removed') }} style={{ padding: '0.25rem 0.6rem', fontSize: '0.7rem', color: '#F43F5E' }}>Remove</button>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="card" style={{ padding: '1.25rem', maxWidth: 480 }}>
            <div style={{ fontSize: '0.875rem', fontWeight: 600, color: '#F0F2F8', marginBottom: '1.25rem' }}>Invite Team Member</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
              {[['name','Full Name','text'],['email','Email Address','email']].map(([f,l,t]) => (
                <div key={f}>
                  <label style={{ fontSize: '0.75rem', color: '#8B92A5', display: 'block', marginBottom: '0.3rem' }}>{l}</label>
                  <input className="input" type={t} value={(newMember as any)[f]} onChange={e => setNewMember(p => ({ ...p, [f]: e.target.value }))} placeholder={l} />
                </div>
              ))}
              <div>
                <label style={{ fontSize: '0.75rem', color: '#8B92A5', display: 'block', marginBottom: '0.3rem' }}>Role</label>
                <select className="input" value={newMember.role} onChange={e => setNewMember(p => ({ ...p, role: e.target.value }))}>
                  {['Account Manager','Outreach Specialist','Analyst','Viewer'].map(r => <option key={r}>{r}</option>)}
                </select>
              </div>
            </div>
            <button className="btn-primary" onClick={addMember} style={{ marginTop: '1.25rem', fontSize: '0.8rem' }}>Send Invite</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default function SettingsPage() {
  return <LeadgenShell><SettingsContent /></LeadgenShell>
}
