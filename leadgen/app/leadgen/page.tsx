'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function LeadgenIndex() {
  const router = useRouter()
  useEffect(() => {
    router.replace('/leadgen/dashboard')
  }, [router])

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', background: '#080B10' }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{ width: 40, height: 40, border: '3px solid #3B82F6', borderTopColor: 'transparent', borderRadius: '50%', animation: 'lg-spin 0.8s linear infinite', margin: '0 auto 1rem' }} />
        <p style={{ color: '#4A5168', fontSize: '0.875rem' }}>Loading LeadForge...</p>
      </div>
    </div>
  )
}
