'use client'
import { usePathname } from 'next/navigation'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

const BARE_ROUTES = ['/leadgen', '/admin']

export default function ConditionalShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isBare = BARE_ROUTES.some(route => pathname?.startsWith(route))

  if (isBare) {
    return <>{children}</>
  }

  return (
    <div style={{ background: '#FFFDF7', color: '#2C2C2C' }}>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  )
}
