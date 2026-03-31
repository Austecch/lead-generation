'use client';

import DashboardLayout from '@/components/DashboardLayout';
import { MetricCard, StatGrid } from '@/components/MetricCard';

export default function AnalyticsPage() {
  const metricsData = [
    { label: 'Total Revenue', value: '$45,230', trend: { direction: 'up', percentage: 28 } },
    { label: 'Cost Per Lead', value: '$12.50', trend: { direction: 'up', percentage: 5 } },
    { label: 'ROI', value: '342%', trend: { direction: 'up', percentage: 12 } },
    { label: 'Conversion Rate', value: '4.7%', trend: { direction: 'up', percentage: 8 } },
  ];

  const channels = [
    { name: 'Email', value: 28 },
    { name: 'LinkedIn', value: 22 },
    { name: 'Instagram', value: 18 },
    { name: 'Google', value: 15 },
  ];

  const topCampaigns = [
    { name: 'Real Estate Q1', revenue: 4900 },
    { name: 'Email Blast', revenue: 3120 },
    { name: 'LinkedIn Outreach', revenue: 8400 },
  ];

  const engagementMetrics = [
    { label: 'Open Rate', value: 42 },
    { label: 'Click Rate', value: 18 },
    { label: 'Reply Rate', value: 24 },
    { label: 'Bounce Rate', value: 2.3 },
  ];

  const trendData = [65, 78, 72, 85, 92, 88, 95];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Analytics</h1>

        <StatGrid>
          {metricsData.map((metric, idx) => (
            <MetricCard
              key={idx}
              label={metric.label}
              value={metric.value}
              trend={metric.trend}
            />
          ))}
        </StatGrid>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Channel Performance */}
          <div className="lg:col-span-2 card">
            <h3 className="text-lg font-semibold mb-6">Channel Performance</h3>
            <div className="space-y-4">
              {channels.map((channel, idx) => (
                <div key={idx}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-400">{channel.name}</span>
                    <span className="text-sm font-semibold text-[#06d6a0]">{channel.value}%</span>
                  </div>
                  <div className="w-full bg-[#1a202c] rounded-full h-3 overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-[#06d6a0] to-[#10b981] h-full"
                      style={{ width: `${channel.value * 3}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Top Campaigns */}
          <div className="card">
            <h3 className="text-lg font-semibold mb-4">Top Campaigns</h3>
            <div className="space-y-3">
              {topCampaigns.map((campaign, idx) => (
                <div key={idx} className="p-3 bg-[#1a202c] rounded-lg">
                  <p className="text-sm text-gray-400 mb-1">{campaign.name}</p>
                  <p className="text-[#06d6a0] font-bold">${campaign.revenue.toLocaleString()}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Engagement Metrics */}
        <div className="card">
          <h3 className="text-lg font-semibold mb-6">Engagement Metrics</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {engagementMetrics.map((metric, idx) => (
              <div key={idx} className="p-4 bg-[#1a202c] rounded-lg border border-[#2d3f52]">
                <p className="text-sm text-gray-400 mb-2">{metric.label}</p>
                <p className="text-2xl font-bold text-[#06d6a0]">{metric.value}%</p>
              </div>
            ))}
          </div>
        </div>

        {/* 7-Day Trends */}
        <div className="card">
          <h3 className="text-lg font-semibold mb-6">7-Day Trends</h3>
          <div className="p-6 bg-[#1a202c] rounded-lg">
            <div className="flex items-end justify-between h-32 gap-2">
              {trendData.map((height, idx) => (
                <div
                  key={idx}
                  className="flex-1 bg-gradient-to-t from-[#06d6a0] to-[#06d6a0]/50 rounded-t hover:from-[#06d6a0] hover:to-[#10b981] cursor-pointer transition"
                  style={{ height: `${(height / 100) * 100}%` }}
                  title={`Day ${idx + 1}: ${height} leads`}
                />
              ))}
            </div>
            <div className="flex items-center justify-between mt-4 text-xs text-gray-400">
              <span>Mon</span>
              <span>Tue</span>
              <span>Wed</span>
              <span>Thu</span>
              <span>Fri</span>
              <span>Sat</span>
              <span>Sun</span>
            </div>
          </div>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="card">
            <h3 className="text-lg font-semibold mb-4">Revenue Summary</h3>
            <p className="text-3xl font-bold text-[#06d6a0] mb-2">$45,230</p>
            <p className="text-sm text-gray-400">+28% from last month</p>
          </div>
          <div className="card">
            <h3 className="text-lg font-semibold mb-4">Lead Quality</h3>
            <p className="text-3xl font-bold text-[#10b981] mb-2">87%</p>
            <p className="text-sm text-gray-400">Qualified leads from total</p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
