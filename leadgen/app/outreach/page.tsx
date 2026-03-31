'use client';

import DashboardLayout from '@/components/DashboardLayout';
import { MetricCard, StatGrid } from '@/components/MetricCard';
import DataTable from '@/components/DataTable';
import { Plus } from 'lucide-react';

interface Trend {
  direction: 'up' | 'down';
  percentage: number;
}

export default function OutreachPage() {
  const statsData: Array<{ label: string; value: number | string; trend: Trend }> = [
    { label: 'Sent This Month', value: 5230, trend: { direction: 'up', percentage: 15 } },
    { label: 'Scheduled', value: 247, trend: { direction: 'up', percentage: 8 } },
    { label: 'Open Rate', value: '42%', trend: { direction: 'up', percentage: 5 } },
  ];

  const outreachData = [
    {
      id: 1,
      lead: 'John Smith',
      channel: 'Email',
      subject: 'Real Estate Investment Opportunity',
      status: 'sent',
      sentDate: '2024-03-25',
      opened: true,
      replied: true,
    },
    {
      id: 2,
      lead: 'Sarah Johnson',
      channel: 'LinkedIn',
      subject: 'Connect - Commercial Real Estate',
      status: 'sent',
      sentDate: '2024-03-25',
      opened: true,
      replied: false,
    },
    {
      id: 3,
      lead: 'Michael Chen',
      channel: 'Email',
      subject: 'Exclusive Property Listing',
      status: 'sent',
      sentDate: '2024-03-24',
      opened: false,
      replied: null,
    },
    {
      id: 4,
      lead: 'Emma Davis',
      channel: 'Instagram',
      subject: 'DM: New Development Project',
      status: 'scheduled',
      sentDate: '2024-03-26',
      opened: null,
      replied: null,
    },
    {
      id: 5,
      lead: 'David Wilson',
      channel: 'Email',
      subject: 'Premium Property Portfolio',
      status: 'sent',
      sentDate: '2024-03-23',
      opened: true,
      replied: true,
    },
    {
      id: 6,
      lead: 'Lisa Anderson',
      channel: 'LinkedIn',
      subject: 'Investment Partnership',
      status: 'draft',
      sentDate: '2024-03-25',
      opened: null,
      replied: null,
    },
  ];

  const renderBooleanIndicator = (value: boolean | null) => {
    if (value === true) return <span className="text-[#06d6a0] font-semibold">✓ Yes</span>;
    if (value === false) return <span className="text-[#ef4444] font-semibold">✗ No</span>;
    return <span className="text-gray-500">-</span>;
  };

  const columns: Array<{ key: string; label: string; sortable?: boolean; render?: (value: any) => React.ReactElement }> = [
    { key: 'lead', label: 'Lead', sortable: true },
    { key: 'channel', label: 'Channel', sortable: true },
    { key: 'subject', label: 'Subject', sortable: true },
    {
      key: 'status',
      label: 'Status',
      sortable: true,
      render: (value: string) => <span className={`badge badge-${value}`}>{value}</span>
    },
    { key: 'sentDate', label: 'Sent Date', sortable: true },
    {
      key: 'opened',
      label: 'Opened',
      render: renderBooleanIndicator
    },
    {
      key: 'replied',
      label: 'Replied',
      render: renderBooleanIndicator
    },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Outreach</h1>
          <button className="btn btn-primary">
            <Plus size={18} />
            New Outreach
          </button>
        </div>

        <StatGrid>
          {statsData.slice(0, 3).map((stat, idx) => (
            <MetricCard
              key={idx}
              label={stat.label}
              value={stat.value}
              trend={stat.trend}
            />
          ))}
        </StatGrid>

        <DataTable
          title="Message History"
          columns={columns as any}
          data={outreachData}
          searchable
          pageSize={10}
        />
      </div>
    </DashboardLayout>
  );
}
