'use client';

import { useState, useMemo } from 'react';
import { ChevronUp, ChevronDown, Search } from 'lucide-react';

interface Column<T> {
  key: keyof T;
  label: string;
  width?: string;
  sortable?: boolean;
  render?: (value: any, item: T) => React.ReactNode;
}

interface DataTableProps<T> {
  title: string;
  columns: Column<T>[];
  data: T[];
  searchable?: boolean;
  pageSize?: number;
}

export default function DataTable<T>({
  title,
  columns,
  data,
  searchable = true,
  pageSize = 10,
}: DataTableProps<T>) {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortKey, setSortKey] = useState<keyof T | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [currentPage, setCurrentPage] = useState(1);

  // Filter data
  const filteredData = useMemo(() => {
    if (!searchTerm) return data;
    return data.filter((item) =>
      columns.some((col) => {
        const value = (item[col.key] as any)?.toString().toLowerCase() || '';
        return value.includes(searchTerm.toLowerCase());
      })
    );
  }, [data, searchTerm, columns]);

  // Sort data
  const sortedData = useMemo(() => {
    if (!sortKey) return filteredData;
    return [...filteredData].sort((a, b) => {
      const aVal = a[sortKey];
      const bVal = b[sortKey];
      if (aVal < bVal) return sortDirection === 'asc' ? -1 : 1;
      if (aVal > bVal) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
  }, [filteredData, sortKey, sortDirection]);

  // Paginate data
  const totalPages = Math.ceil(sortedData.length / pageSize);
  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return sortedData.slice(start, start + pageSize);
  }, [sortedData, currentPage, pageSize]);

  const handleSort = (key: keyof T) => {
    if (sortKey === key) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortDirection('asc');
    }
  };

  const startRecord = (currentPage - 1) * pageSize + 1;
  const endRecord = Math.min(currentPage * pageSize, sortedData.length);

  return (
    <div className="card">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">{title}</h3>
          {searchable && (
            <div className="relative">
              <Search size={16} className="absolute left-3 top-3 text-gray-500" />
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
                className="input pl-10 w-48"
              />
            </div>
          )}
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#2d3f52]">
                {columns.map((col) => (
                  <th
                    key={String(col.key)}
                    className="text-left py-3 px-4 text-sm font-semibold text-gray-400 cursor-pointer hover:text-white transition"
                    onClick={() => col.sortable && handleSort(col.key)}
                  >
                    <div className="flex items-center gap-2">
                      {col.label}
                      {col.sortable && sortKey === col.key && (
                        <>
                          {sortDirection === 'asc' ? (
                            <ChevronUp size={14} className="text-[#06d6a0]" />
                          ) : (
                            <ChevronDown size={14} className="text-[#06d6a0]" />
                          )}
                        </>
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {paginatedData.map((item, idx) => (
                <tr
                  key={idx}
                  className="border-b border-[#2d3f52] hover:bg-[#1a202c] transition"
                >
                  {columns.map((col) => (
                    <td
                      key={String(col.key)}
                      className="py-3 px-4 text-sm text-gray-300"
                    >
                      {col.render
                        ? col.render((item[col.key] as any), item)
                        : ((item[col.key] as any)?.toString() || '-')}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-400">
            Showing {startRecord} to {endRecord} of {sortedData.length}
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 rounded bg-[#232f3e] text-sm text-gray-300 hover:bg-[#2d3f52] disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
              Prev
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1)
              .slice(Math.max(0, currentPage - 2), Math.min(totalPages, currentPage + 1))
              .map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-3 py-1 rounded text-sm transition ${
                    currentPage === page
                      ? 'bg-[#06d6a0] text-black font-semibold'
                      : 'bg-[#232f3e] text-gray-300 hover:bg-[#2d3f52]'
                  }`}
                >
                  {page}
                </button>
              ))}
            <button
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="px-3 py-1 rounded bg-[#232f3e] text-sm text-gray-300 hover:bg-[#2d3f52] disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
