import { useState, useMemo } from 'react';
import { Search, Filter, X, Users, UserPlus, Repeat, DollarSign, TrendingUp } from 'lucide-react';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { useCustomers, useCustomerStats } from '../hooks/useCustomers';
import type {Customer, CustomerGroup, CustomerStatus} from '../types';

const statusColors: Record<CustomerStatus, string> = {
  Active: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
  Inactive: 'bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400',
};

const groupColors: Record<CustomerGroup, string> = {
  VIP: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400',
  Regular: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
  New: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400',
};

const columnHelper = createColumnHelper<Customer>();

const columns = [
  columnHelper.accessor('name', {
    header: 'Customer',
    cell: (info) => {
      const customer = info.row.original;
      return (
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 text-xs font-medium">
            {customer.avatar}
          </div>
          <div>
            <p className="text-sm font-medium text-gray-900 dark:text-white">{customer.name}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">{customer.email}</p>
          </div>
        </div>
      );
    },
  }),
  columnHelper.accessor('group', {
    header: 'Group',
    cell: (info) => {
      const group = info.getValue();
      return (
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${groupColors[group]}`}>
          {group}
        </span>
      );
    },
  }),
  columnHelper.accessor('totalOrders', {
    header: 'Total Orders',
    cell: (info) => (
      <span className="text-sm font-medium text-gray-900 dark:text-white">
        {info.getValue()}
      </span>
    ),
  }),
  columnHelper.accessor('totalSpent', {
    header: 'Total Spent',
    cell: (info) => (
      <span className="text-sm font-medium text-gray-900 dark:text-white">
        ${info.getValue().toFixed(2)}
      </span>
    ),
  }),
  columnHelper.accessor('location', {
    header: 'Location',
    cell: (info) => {
      const customer = info.row.original;
      return (
        <div>
          <p className="text-sm text-gray-900 dark:text-white">{customer.location}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400">{customer.country}</p>
        </div>
      );
    },
  }),
  columnHelper.accessor('status', {
    header: 'Status',
    cell: (info) => {
      const status = info.getValue();
      return (
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[status]}`}>
          {status}
        </span>
      );
    },
  }),
  columnHelper.accessor('joinedAt', {
    header: 'Joined At',
    cell: (info) => (
      <span className="text-sm text-gray-700 dark:text-gray-300">
        {info.getValue()}
      </span>
    ),
  }),
];

export default function Customers() {
  const { data: customers = [], isLoading: customersLoading } = useCustomers();
  const { data: stats, isLoading: statsLoading } = useCustomerStats();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [groupFilter, setGroupFilter] = useState<CustomerGroup | 'all'>('all');
  const [statusFilter, setStatusFilter] = useState<CustomerStatus | 'all'>('all');
  const [locationFilter, setLocationFilter] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const filteredCustomers = useMemo(() => {
    return customers.filter((customer) => {
      const matchesSearch = 
        customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.email.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesGroup = groupFilter === 'all' || customer.group === groupFilter;
      const matchesStatus = statusFilter === 'all' || customer.status === statusFilter;
      const matchesLocation = locationFilter === 'all' || customer.location === locationFilter;
      return matchesSearch && matchesGroup && matchesStatus && matchesLocation;
    });
  }, [customers, searchTerm, groupFilter, statusFilter, locationFilter]);

  const paginatedCustomers = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredCustomers.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredCustomers, currentPage]);

  const totalPages = Math.ceil(filteredCustomers.length / itemsPerPage);

  const table = useReactTable({
    data: paginatedCustomers,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const resetFilters = () => {
    setSearchTerm('');
    setGroupFilter('all');
    setStatusFilter('all');
    setLocationFilter('all');
    setCurrentPage(1);
  };

  const uniqueLocations = useMemo(() => {
    return Array.from(new Set(customers.map(c => c.location)));
  }, [customers]);

  return (
    <div className="p-6 pt-20">
      {/* Header */}
      <div className="mb-6 text-left">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Customers</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">Manage and view customer information</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-5 text-white shadow-lg">
          <div className="flex items-center justify-between mb-2">
            <Users className="w-6 h-6 opacity-80" />
            <p className="text-xs font-medium opacity-90">↑ 5.1% vs last month</p>
          </div>
          <p className="text-sm font-medium opacity-90 mb-1">Total Customers</p>
          <p className="text-2xl font-bold">{statsLoading ? '...' : stats?.totalCustomers.toLocaleString()}</p>
        </div>
        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-5 text-white shadow-lg">
          <div className="flex items-center justify-between mb-2">
            <UserPlus className="w-6 h-6 opacity-80" />
            <p className="text-xs font-medium opacity-90">↑ 8.7% vs last month</p>
          </div>
          <p className="text-sm font-medium opacity-90 mb-1">New Customers</p>
          <p className="text-2xl font-bold">{statsLoading ? '...' : stats?.newCustomers.toLocaleString()}</p>
        </div>
        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-5 text-white shadow-lg">
          <div className="flex items-center justify-between mb-2">
            <Repeat className="w-6 h-6 opacity-80" />
            <p className="text-xs font-medium opacity-90">↑ 6.3% vs last month</p>
          </div>
          <p className="text-sm font-medium opacity-90 mb-1">Repeat Customers</p>
          <p className="text-2xl font-bold">{statsLoading ? '...' : stats?.repeatCustomers.toLocaleString()}</p>
        </div>
        <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl p-5 text-white shadow-lg">
          <div className="flex items-center justify-between mb-2">
            <DollarSign className="w-6 h-6 opacity-80" />
            <p className="text-xs font-medium opacity-90">↑ 3.4% vs last month</p>
          </div>
          <p className="text-sm font-medium opacity-90 mb-1">Avg. Order Value</p>
          <p className="text-2xl font-bold">{statsLoading ? '...' : `$${stats?.avgOrderValue.toFixed(2)}`}</p>
        </div>
        <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl p-5 text-white shadow-lg">
          <div className="flex items-center justify-between mb-2">
            <TrendingUp className="w-6 h-6 opacity-80" />
            <p className="text-xs font-medium opacity-90">↑ 12.8% vs last month</p>
          </div>
          <p className="text-sm font-medium opacity-90 mb-1">Total Spent</p>
          <p className="text-2xl font-bold">{statsLoading ? '...' : `$${stats?.totalSpent.toLocaleString()}`}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-4 mb-6">
        <div className="flex flex-col lg:flex-row gap-3">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search customers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <select
            value={groupFilter}
            onChange={(e) => setGroupFilter(e.target.value as CustomerGroup | 'all')}
            className="px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Groups</option>
            <option value="VIP">VIP</option>
            <option value="Regular">Regular</option>
            <option value="New">New</option>
          </select>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as CustomerStatus | 'all')}
            className="px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Status</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
          <select
            value={locationFilter}
            onChange={(e) => setLocationFilter(e.target.value)}
            className="px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Locations</option>
            {uniqueLocations.map((location) => (
              <option key={location} value={location}>{location}</option>
            ))}
          </select>
          <button
            onClick={resetFilters}
            className="px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors flex items-center gap-2"
          >
            <X className="w-4 h-4" />
            Reset
          </button>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <button className="px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors flex items-center gap-2">
            <Filter className="w-4 h-4" />
            Filters
          </button>
        </div>
      </div>

      {/* Customers Table */}
      <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden">
        {customersLoading ? (
          <div className="p-8 text-center text-gray-500 dark:text-gray-400">
            Loading customers...
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  {table.getHeaderGroups().map((headerGroup) => (
                    <tr key={headerGroup.id} className="border-b border-gray-200 dark:border-gray-800">
                      {headerGroup.headers.map((header) => (
                        <th
                          key={header.id}
                          className="py-4 px-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                        >
                          {header.isPlaceholder
                            ? null
                            : flexRender(header.column.columnDef.header, header.getContext())}
                        </th>
                      ))}
                    </tr>
                  ))}
                </thead>
                <tbody>
                  {table.getRowModel().rows.map((row) => (
                    <tr
                      key={row.id}
                      className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                    >
                      {row.getVisibleCells().map((cell) => (
                        <td
                          key={cell.id}
                          className="py-4 px-4 text-sm text-gray-700 dark:text-gray-300"
                        >
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="border-t border-gray-200 dark:border-gray-800 px-4 py-3 flex items-center justify-between">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Showing {Math.min((currentPage - 1) * itemsPerPage + 1, filteredCustomers.length)} to {Math.min(currentPage * itemsPerPage, filteredCustomers.length)} of {filteredCustomers.length} customers
              </p>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="px-3 py-1 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`px-3 py-1 rounded-lg transition-colors ${
                      currentPage === page
                        ? 'bg-blue-600 text-white'
                        : 'border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
                    }`}
                  >
                    {page}
                  </button>
                ))}
                <button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="px-3 py-1 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
