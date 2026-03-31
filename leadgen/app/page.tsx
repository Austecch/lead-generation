'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { ArrowRight, Zap, TrendingUp, Users, MessageSquare } from 'lucide-react';

export default function HomePage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-[#0f131a] text-white">
      {/* Navigation */}
      <nav className="border-b border-[#2d3f52] sticky top-0 z-50 bg-[#0f131a]/80 backdrop-blur">
        <div className="max-w-7xl mx-auto px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Zap size={28} className="text-[#06d6a0]" />
            <span className="text-xl font-bold">LeadGen AI</span>
          </div>
          <button
            onClick={() => router.push('/dashboard')}
            className="btn btn-primary"
          >
            Go to Dashboard
            <ArrowRight size={18} />
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="min-h-[calc(100vh-80px)] flex items-center justify-center px-8">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="space-y-4">
            <h1 className="text-6xl font-bold bg-gradient-to-r from-[#06d6a0] via-[#06e5ff] to-[#10b981] bg-clip-text text-transparent">
              AI-Powered Lead Generation
            </h1>
            <p className="text-2xl text-gray-400">
              Discover qualified leads, personalize outreach, and close deals faster
              with our intelligent automation platform.
            </p>
          </div>

          <div className="flex items-center justify-center gap-4">
            <button
              onClick={() => router.push('/dashboard')}
              className="btn btn-primary px-8 py-3 text-lg"
            >
              Launch Dashboard
              <ArrowRight size={20} />
            </button>
            <button className="btn btn-secondary px-8 py-3 text-lg">
              Learn More
            </button>
          </div>

          {/* Feature Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16">
            {[
              {
                icon: <Users size={24} />,
                title: 'Lead Discovery',
                desc: 'Find qualified leads from multiple sources',
              },
              {
                icon: <MessageSquare size={24} />,
                title: 'AI Personalization',
                desc: 'Generate unique messages per prospect',
              },
              {
                icon: <TrendingUp size={24} />,
                title: 'Multi-Channel',
                desc: 'Outreach via email, LinkedIn, Instagram',
              },
              {
                icon: <Zap size={24} />,
                title: 'Automation',
                desc: 'Auto follow-ups and intelligent scheduling',
              },
            ].map((feature, idx) => (
              <div key={idx} className="card card-hover">
                <div className="text-[#06d6a0] mb-3">{feature.icon}</div>
                <h3 className="font-semibold mb-2">{feature.title}</h3>
                <p className="text-xs text-gray-400">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-[#1a202c] py-16 px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-4 gap-8">
            {[
              { label: 'Active Campaigns', value: '12' },
              { label: 'Leads Discovered', value: '2.8K+' },
              { label: 'Messages Sent', value: '5.2K+' },
              { label: 'Appointments', value: '128+' },
            ].map((stat, idx) => (
              <div key={idx} className="text-center">
                <p className="text-4xl font-bold text-[#06d6a0] mb-2">
                  {stat.value}
                </p>
                <p className="text-gray-400">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#2d3f52] py-8 px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <p className="text-gray-500">
            © 2024 LeadGen AI. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-gray-400 hover:text-white transition">
              Documentation
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition">
              Support
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition">
              GitHub
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
