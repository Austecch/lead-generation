'use client';

import DashboardLayout from '@/components/DashboardLayout';
import { MetricCard, StatGrid } from '@/components/MetricCard';
import DataTable from '@/components/DataTable';
import { Plus } from 'lucide-react';

export default function CampaignsPage() {
  const statsData: Array<{ label: string; value: number; trend: { direction: 'up' | 'down'; percentage: number } }> = [
    { label: 'Active Campaigns', value: 12, trend: { direction: 'up', percentage: 3 } },
    { label: 'Total Leads', value: 2847, trend: { direction: 'up', percentage: 12 } },
    { label: 'Messages Sent', value: 5230, trend: { direction: 'up', percentage: 15 } },
    { label: 'Appointments', value: 128, trend: { direction: 'up', percentage: 22 } },
  ];

  const campaignsData = [
    {
      id: 1,
      name: 'Real Estate Q1',
      status: 'active',
      leads: 500,
      contacted: 389,
      responses: 54,
      responseRate: 13.9,
      progress: 78,
    },
    {
      id: 2,
      name: 'LinkedIn Outreach',
      status: 'active',
      leads: 400,
      contacted: 252,
      responses: 32,
      responseRate: 12.7,
      progress: 63,
    },
    {
      id: 3,
      name: 'Instagram Campaign',
      status: 'active',
      leads: 300,
      contacted: 174,
      responses: 18,
      responseRate: 10.3,
      progress: 58,
    },
    {
      id: 4,
      name: 'Google Ads',
      status: 'paused',
      leads: 250,
      contacted: 0,
      responses: 0,
      responseRate: 0,
      progress: 0,
    },
    {
      id: 5,
      name: 'Email Blast',
      status: 'completed',
      leads: 600,
      contacted: 600,
      responses: 84,
      responseRate: 14,
      progress: 100,
    },
  ];

  const columns: Array<{ key: string; label: string; sortable?: boolean; render?: (value: any) => React.ReactElement }> = [
    { key: 'id', label: 'ID', sortable: true },
    { key: 'name', label: 'Campaign Name', sortable: true },
    {
      key: 'status',
      label: 'Status',
      sortable: true,
      render: (value: string) => <span className={`badge badge-${value}`}>{value}</span>
    },
    { key: 'leads', label: 'Leads', sortable: true },
    { key: 'contacted', label: 'Contacted', sortable: true },
    { key: 'responses', label: 'Responses', sortable: true },
    {
      key: 'responseRate',
      label: 'Response Rate',
      sortable: true,
      render: (value: number) => <span className="font-semibold">{value}%</span>
    },
    {
      key: 'progress',
      label: 'Progress',
      render: (value: number) => (
        <div className="w-20 bg-[#1a202c] rounded-full h-2 overflow-hidden">
          <div className="bg-[#06d6a0] h-full" style={{ width: `${value}%` }} />
        </div>
      )
    },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Campaigns</h1>
          <button className="btn btn-primary">
            <Plus size={18} />
            New Campaign
          </button>
        </div>

        <StatGrid>
          {statsData.map((stat, idx) => (
            <MetricCard
              key={idx}
              label={stat.label}
              value={stat.value}
              trend={stat.trend}
            />
          ))}
        </StatGrid>

        <DataTable
          title="Campaign List"
          columns={columns as any}
          data={campaignsData}
          searchable
          pageSize={10}
        />
      </div>
    </DashboardLayout>
  );
}
