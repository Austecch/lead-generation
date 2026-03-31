'use client';

import { ReactNode } from 'react';
import { ArrowUp, ArrowDown } from 'lucide-react';

interface Trend {
  direction: 'up' | 'down';
  percentage: number;
}

interface MetricCardProps {
  label: string;
  value: string | number;
  icon?: ReactNode;
  trend?: Trend;
}

export function MetricCard({ label, value, icon, trend }: MetricCardProps) {
  return (
    <div className="card">
      <div className="flex items-start justify-between mb-3">
        <span className="metric-label">{label}</span>
        {icon && <div className="text-[#06d6a0]">{icon}</div>}
      </div>
      <div className="metric-value">{value}</div>
      {trend && (
        <div className={`flex items-center gap-1 mt-2 text-sm ${
          trend.direction === 'up' ? 'text-[#10b981]' : 'text-[#ef4444]'
        }`}>
          {trend.direction === 'up' ? <ArrowUp size={14} /> : <ArrowDown size={14} />}
          <span>{trend.percentage}% from last month</span>
        </div>
      )}
    </div>
  );
}

interface StatGridProps {
  children: ReactNode;
}

export function StatGrid({ children }: StatGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {children}
    </div>
  );
}
