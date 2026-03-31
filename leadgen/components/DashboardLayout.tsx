'use client';

import { useState, ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Menu, X, BarChart3, Users, Briefcase, MessageSquare, TrendingUp, Settings, LogOut } from 'lucide-react';

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const pathname = usePathname();

  const navItems = [
    { name: 'Dashboard', href: '/dashboard', icon: BarChart3 },
    { name: 'Leads', href: '/leads', icon: Users },
    { name: 'Campaigns', href: '/campaigns', icon: Briefcase },
    { name: 'Outreach', href: '/outreach', icon: MessageSquare },
    { name: 'Analytics', href: '/analytics', icon: TrendingUp },
  ];

  const isActive = (href: string) => {
    return pathname === href || pathname.startsWith(href + '/');
  };

  return (
    <div className="flex min-h-screen bg-[#0f131a] text-white">
      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? 'w-64' : 'w-20'
        } transition-all duration-300 bg-[#1a202c] border-r border-[#2d3f52] flex flex-col fixed h-screen`}
      >
        {/* Header */}
        <div className="h-16 border-b border-[#2d3f52] flex items-center justify-between px-4">
          {sidebarOpen && <span className="font-bold text-lg">LeadGen</span>}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 hover:bg-[#232f3e] rounded-lg transition"
          >
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-2 py-4 space-y-2 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-2 rounded-lg transition ${
                  active
                    ? 'bg-[#06d6a0]/10 border-l-4 border-[#06d6a0] text-[#06d6a0]'
                    : 'text-gray-400 hover:bg-[#232f3e]'
                }`}
              >
                <Icon size={20} />
                {sidebarOpen && <span>{item.name}</span>}
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="border-t border-[#2d3f52] px-2 py-4 space-y-2">
          <button className="w-full flex items-center gap-3 px-4 py-2 rounded-lg text-gray-400 hover:bg-[#232f3e] transition">
            <Settings size={20} />
            {sidebarOpen && <span>Settings</span>}
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-2 rounded-lg text-gray-400 hover:bg-[#232f3e] transition">
            <LogOut size={20} />
            {sidebarOpen && <span>Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className={`${sidebarOpen ? 'ml-64' : 'ml-20'} transition-all duration-300 flex-1 flex flex-col`}>
        {/* Top Header */}
        <header className="h-16 border-b border-[#2d3f52] bg-[#0f131a]/80 backdrop-blur sticky top-0 z-40 flex items-center px-8">
          <h2 className="text-sm text-gray-400">
            {navItems.find((item) => isActive(item.href))?.name || 'Dashboard'}
          </h2>
        </header>

        {/* Page Content */}
        <div className="flex-1 overflow-auto p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
