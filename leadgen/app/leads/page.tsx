'use client';

import DashboardLayout from '@/components/DashboardLayout';
import { MetricCard, StatGrid } from '@/components/MetricCard';
import DataTable from '@/components/DataTable';
import { Plus, Filter } from 'lucide-react';

export default function LeadsPage() {
  const statsData = [
    { label: 'Total Leads', value: 2847, trend: { direction: 'up', percentage: 12 } },
    { label: 'Hot Leads', value: 487, trend: { direction: 'up', percentage: 8 } },
    { label: 'Warm Leads', value: 1203, trend: { direction: 'up', percentage: 5 } },
    { label: 'Cold Leads', value: 1157, trend: { direction: 'down', percentage: 3 } },
  ];

  const leadsTableData = [
    { id: 1, name: 'John Smith', company: 'ABC Real Estate', email: 'john@abc.com', score: 87, status: 'Hot', source: 'LinkedIn', lastContact: '2024-03-25' },
    { id: 2, name: 'Sarah Johnson', company: 'XYZ Properties', email: 'sarah@xyz.com', score: 72, status: 'Warm', source: 'Email', lastContact: '2024-03-24' },
    { id: 3, name: 'Michael Chen', company: 'Modern Homes', email: 'michael@modern.com', score: 56, status: 'Warm', source: 'Website', lastContact: '2024-03-23' },
    { id: 4, name: 'Emma Davis', company: 'Premier Realty', email: 'emma@premier.com', score: 42, status: 'Cold', source: 'Google', lastContact: '2024-03-20' },
    { id: 5, name: 'David Wilson', company: 'Elite Properties', email: 'david@elite.com', score: 81, status: 'Hot', source: 'Referral', lastContact: '2024-03-25' },
    { id: 6, name: 'Lisa Anderson', company: 'Smart Real Estate', email: 'lisa@smart.com', score: 68, status: 'Warm', source: 'LinkedIn', lastContact: '2024-03-22' },
  ];

  const columns = [
    { key: 'name', label: 'Name', sortable: true },
    { key: 'company', label: 'Company', sortable: true },
    { key: 'email', label: 'Email' },
    {
      key: 'score',
      label: 'Score',
      sortable: true,
      render: (value) => <span className="font-semibold text-[#06d6a0]">{value}</span>
    },
    {
      key: 'status',
      label: 'Status',
      sortable: true,
      render: (value) => <span className={`badge badge-${value.toLowerCase()}`}>{value}</span>
    },
    { key: 'source', label: 'Source', sortable: true },
    { key: 'lastContact', label: 'Last Contact', sortable: true },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Leads</h1>
          <div className="flex gap-3">
            <button className="btn btn-secondary">
              <Filter size={18} />
              Filter
            </button>
            <button className="btn btn-primary">
              <Plus size={18} />
              Add Lead
            </button>
          </div>
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
          title="Lead List"
          columns={columns}
          data={leadsTableData}
          searchable
          pageSize={10}
        />
      </div>
    </DashboardLayout>
  );
}
