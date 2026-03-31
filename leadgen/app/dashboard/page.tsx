'use client';

import DashboardLayout from '@/components/DashboardLayout';
import { MetricCard, StatGrid } from '@/components/MetricCard';
import DataTable from '@/components/DataTable';
import { TrendingUp, Users, MessageSquare, Calendar, Percent, AlertCircle } from 'lucide-react';

export default function DashboardPage() {
  const metricsData = [
    { label: 'Total Leads', value: 2847, icon: <Users size={20} />, trend: { direction: 'up', percentage: 12 } },
    { label: 'Qualified Leads', value: 487, icon: <AlertCircle size={20} />, trend: { direction: 'up', percentage: 8 } },
    { label: 'Active Campaigns', value: 12, icon: <TrendingUp size={20} />, trend: { direction: 'up', percentage: 3 } },
    { label: 'Messages Sent', value: 5230, icon: <MessageSquare size={20} />, trend: { direction: 'up', percentage: 15 } },
    { label: 'Reply Rate', value: '24%', icon: <Percent size={20} />, trend: { direction: 'up', percentage: 5 } },
    { label: 'Appointments', value: 128, icon: <Calendar size={20} />, trend: { direction: 'up', percentage: 22 } },
    { label: 'Revenue', value: '$18.4K', icon: <TrendingUp size={20} />, trend: { direction: 'up', percentage: 28 } },
    { label: 'Avg Score', value: 74, icon: <Percent size={20} />, trend: { direction: 'up', percentage: 4 } },
  ];

  const recentLeads = [
    { id: 1, name: 'John Smith', company: 'ABC Real Estate', score: 87, status: 'Hot', email: 'john@abc.com' },
    { id: 2, name: 'Sarah Johnson', company: 'XYZ Properties', score: 72, status: 'Warm', email: 'sarah@xyz.com' },
    { id: 3, name: 'Michael Chen', company: 'Modern Homes', score: 56, status: 'Warm', email: 'michael@modern.com' },
    { id: 4, name: 'Emma Davis', company: 'Premier Realty', score: 42, status: 'Cold', email: 'emma@premier.com' },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <button className="btn btn-primary">
            New Campaign
          </button>
        </div>

        <StatGrid>
          {metricsData.map((metric, idx) => (
            <MetricCard
              key={idx}
              label={metric.label}
              value={metric.value}
              icon={metric.icon}
              trend={metric.trend}
            />
          ))}
        </StatGrid>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Leads */}
          <div className="lg:col-span-2 card">
            <h3 className="text-lg font-semibold mb-4">Recent Leads</h3>
            <div className="space-y-3">
              {recentLeads.map(lead => (
                <div key={lead.id} className="flex items-center justify-between p-3 bg-[#1a202c] rounded-lg hover:bg-[#232f3e] transition">
                  <div>
                    <p className="font-medium">{lead.name}</p>
                    <p className="text-sm text-gray-400">{lead.company}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[#06d6a0] font-semibold">{lead.score}</p>
                    <span className={`badge badge-${lead.status.toLowerCase()}`}>{lead.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Campaign Performance */}
          <div className="card">
            <h3 className="text-lg font-semibold mb-4">Campaign Performance</h3>
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-400">Real Estate Q1</span>
                  <span className="text-sm font-semibold">78%</span>
                </div>
                <div className="w-full bg-[#1a202c] rounded-full h-2 overflow-hidden">
                  <div className="bg-[#06d6a0] h-full" style={{ width: '78%' }} />
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-400">LinkedIn Outreach</span>
                  <span className="text-sm font-semibold">63%</span>
                </div>
                <div className="w-full bg-[#1a202c] rounded-full h-2 overflow-hidden">
                  <div className="bg-[#06d6a0] h-full" style={{ width: '63%' }} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="card">
          <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
          <div className="flex gap-4">
            <button className="btn btn-primary">Send Outreach</button>
            <button className="btn btn-secondary">Create Campaign</button>
            <button className="btn btn-ghost">View Reports</button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
