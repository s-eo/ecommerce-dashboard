import {useMemo, useState} from "react";
import { MoreVertical, Search, Plus, Package, DollarSign, AlertCircle, TrendingUp } from 'lucide-react';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import {useQuery} from '@tanstack/react-query';
import { Link } from "react-router";

import type {Product, ProductStatus} from "../types.ts";

const PRODUCTS_API_URL = 'https://fakestoreapi.com/products';

const statusColors = {
  'In Stock': 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
  'Out of Stock': 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
  'Low Stock': 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
};

const columnHelper = createColumnHelper<Product>();

const columns = [
  columnHelper.accessor('image', {
    header: 'Product',
    cell: (info) => {
      const product = info.row.original;
      return (
        <div className="flex items-center gap-2">
          <img
            src={product.image}
            alt={product.title}
            className="w-10 h-10 rounded-lg object-cover"
          />
          <div>
            <span className="text-sm font-medium text-gray-900 dark:text-white block max-w-[200px] overflow-hidden text-ellipsis">
              {product.title}
            </span>
          </div>
        </div>
      );
    },
  }),
  columnHelper.accessor('category', {
    header: 'Category',
    cell: (info) => (
      <span className="text-sm text-gray-700 dark:text-gray-300">
        {info.getValue()}
      </span>
    ),
  }),
  columnHelper.accessor('price', {
    header: 'Price',
    cell: (info) => (
      <span className="text-sm font-medium text-gray-900 dark:text-white">
        ${info.getValue().toFixed(2)}
      </span>
    ),
  }),
  columnHelper.accessor('status', {
    header: 'Status',
    cell: (info) => {
      const status = info.getValue() || 'In Stock';
      return (
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[status as keyof typeof statusColors]}`}>
          {status}
        </span>
      );
    },
  }),
  columnHelper.display({
    id: 'action',
    header: 'Actions',
    cell: () => (
      <button className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
        <MoreVertical className="w-4 h-4 text-gray-500" />
      </button>
    ),
  }),
];

const hiddenColumns = ['status'];

const generateStatus = (): ProductStatus => {
  const statuses: ProductStatus[] = ['In Stock', 'Out of Stock', 'Low Stock'];
  return statuses[Math.floor(Math.random() * statuses.length)];
};

const appendStatus = (products: Product[]): Product[] => {
  if (Array.isArray(products)) {
    return products.map((product) => ({
      ...product,
      status: generateStatus(),
    }));
  }

  return [];
};

export default function Products() {
  const { isPending, error, data } = useQuery({
    queryKey: ['repoData'],
    queryFn: () =>
        fetch(PRODUCTS_API_URL).then((res) =>
            res.json(),
        ),
  });

  const productData: Product[] = useMemo(() => appendStatus(data), [data]);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredData = useMemo(() => {
    return productData.filter((product) => {
      const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           product.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = categoryFilter === 'all' || product.category === categoryFilter;
      const matchesStatus = statusFilter === 'all' || product.status === statusFilter;
      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [productData, searchTerm, categoryFilter, statusFilter]);

  const categories = useMemo(() => {
    const cats = new Set(productData.map(p => p.category));
    return Array.from(cats);
  }, [productData]);

  const stats = useMemo(() => {
    const totalProducts = productData.length;
    const totalValue = productData.reduce((sum, p) => sum + p.price, 0);
    const inStock = productData.filter(p => p.status === 'In Stock').length;
    const lowStock = productData.filter(p => p.status === 'Low Stock').length;
    const outOfStock = productData.filter(p => p.status === 'Out of Stock').length;
    
    return { totalProducts, totalValue, inStock, lowStock, outOfStock };
  }, [productData]);

  const table = useReactTable({
    data: filteredData,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (isPending) {
    return 'Loading...'
  } else if (error) {
    return 'An error has occurred: ' + error.message;
  } else {
    return (
        <div className="px-6 pt-20">
          <div className="flex items-center justify-between mb-6">
            <div className="text-left">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Products</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">Manage and view your store products</p>
            </div>
            <Link to="/product/new">
              <button
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 cursor-pointer">
                <Plus className="w-4 h-4"/>
                Add Product
              </button>
            </Link>
          </div>

          {/* Statistic Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-800">
              <div className="flex items-center justify-between gap-2">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Total Items</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.totalProducts}</p>
                </div>
                <div
                    className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                  <Package className="w-6 h-6 text-blue-600 dark:text-blue-400"/>
                </div>
              </div>
            </div>
            <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-800">
              <div className="flex items-center justify-between gap-2">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Total Value</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">${stats.totalValue.toFixed(2)}</p>
                </div>
                <div
                    className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-green-600 dark:text-green-400"/>
                </div>
              </div>
            </div>
            <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-800">
              <div className="flex items-center justify-between gap-2">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">In Stock</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.inStock}</p>
                </div>
                <div
                    className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-green-600 dark:text-green-400"/>
                </div>
              </div>
            </div>
            <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-800">
              <div className="flex items-center justify-between gap-2">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Low Stock</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.lowStock}</p>
                </div>
                <div
                    className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900/30 rounded-full flex items-center justify-center">
                  <AlertCircle className="w-6 h-6 text-yellow-600 dark:text-yellow-400"/>
                </div>
              </div>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-4 mb-6">
            <div className="flex flex-col lg:flex-row gap-2">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400"/>
                <input
                    type="text"
                    placeholder="Search products..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Categories</option>
                {categories.map((cat) => (
                    <option key={cat} value={cat} className="capitalize">{cat}</option>
                ))}
              </select>
              <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Status</option>
                <option value="In Stock">In Stock</option>
                <option value="Low Stock">Low Stock</option>
                <option value="Out of Stock">Out of Stock</option>
              </select>
            </div>
          </div>

          <div
              className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                {table.getHeaderGroups().map((headerGroup) => (
                    <tr key={headerGroup.id} className="border-b border-gray-200 dark:border-gray-800">
                      {headerGroup.headers.map((header) => (
                          <th
                              key={header.id}
                              className={`text-left py-4 px-6 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider whitespace-nowrap ${
                                  header.id === 'action' ? 'text-right' : ''
                              } ${
                                  hiddenColumns.includes(header.id) ? '@max-2xl:hidden' : ''
                              }`}
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
                              className={`py-4 px-6 text-sm text-gray-700 dark:text-gray-300 whitespace-nowrap ${
                                  cell.column.id === 'action' ? 'text-right' : ''
                              }${
                                  hiddenColumns.includes(cell.column.id) ? '@max-2xl:hidden' : ''
                              }`}
                          >
                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                          </td>
                      ))}
                    </tr>
                ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
    );
  }
}
