import { MoreVertical } from 'lucide-react';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  sku?: string;
  stock?: number;
  status?: 'In Stock' | 'Out of Stock' | 'Low Stock';
  sales?: number;
  created?: string;
}

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
        <div className="flex items-center gap-3">
          <img
            src={product.image}
            alt={product.title}
            className="w-10 h-10 rounded-lg object-cover"
          />
          <div>
            <span className="text-sm font-medium text-gray-900 dark:text-white block">
              {product.title}
            </span>
            <span className="text-xs text-gray-500 dark:text-gray-400">
              ID: {product.id}
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
  columnHelper.accessor('sku', {
    header: 'SKU',
    cell: (info) => (
      <span className="text-sm text-gray-700 dark:text-gray-300">
        {info.getValue() || `SKU-${info.row.original.id}`}
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
  columnHelper.accessor('stock', {
    header: 'Stock',
    cell: (info) => (
      <span className="text-sm text-gray-700 dark:text-gray-300">
        {info.getValue() ?? 0}
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
  columnHelper.accessor('sales', {
    header: 'Sales',
    cell: (info) => (
      <span className="text-sm text-gray-700 dark:text-gray-300">
        {info.getValue() ?? 0}
      </span>
    ),
  }),
  columnHelper.accessor('created', {
    header: 'Created',
    cell: (info) => (
      <span className="text-sm text-gray-700 dark:text-gray-300">
        {info.getValue() || 'May 16, 2024'}
      </span>
    ),
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

const hiddenColumns = ['sku', 'stock', 'status', 'sales', 'created'];

export default function Products() {
  const productsData: Product[] = [
    {
      id: 1,
      title: 'Wireless Headphones',
      price: 129.99,
      description: 'High-quality wireless headphones with noise cancellation',
      category: 'Electronics',
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100&h=100&fit=crop',
      sku: 'WH-001',
      stock: 45,
      status: 'In Stock',
      sales: 234,
      created: 'May 16, 2024',
    },
    {
      id: 2,
      title: 'Smart Watch',
      price: 299.99,
      description: 'Feature-rich smartwatch with health tracking',
      category: 'Electronics',
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=100&h=100&fit=crop',
      sku: 'SW-002',
      stock: 12,
      status: 'Low Stock',
      sales: 189,
      created: 'May 15, 2024',
    },
    {
      id: 3,
      title: 'Running Shoes',
      price: 89.99,
      description: 'Comfortable running shoes for daily exercise',
      category: 'Footwear',
      image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=100&h=100&fit=crop',
      sku: 'RS-003',
      stock: 0,
      status: 'Out of Stock',
      sales: 456,
      created: 'May 14, 2024',
    },
    {
      id: 4,
      title: 'Laptop Backpack',
      price: 49.99,
      description: 'Durable backpack with laptop compartment',
      category: 'Accessories',
      image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=100&h=100&fit=crop',
      sku: 'LB-004',
      stock: 78,
      status: 'In Stock',
      sales: 123,
      created: 'May 13, 2024',
    },
    {
      id: 5,
      title: 'Desk Lamp',
      price: 34.99,
      description: 'LED desk lamp with adjustable brightness',
      category: 'Home',
      image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=100&h=100&fit=crop',
      sku: 'DL-005',
      stock: 56,
      status: 'In Stock',
      sales: 789,
      created: 'May 12, 2024',
    },
  ];

  const table = useReactTable({
    data: productsData,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="p-6 pt-20">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Products</h1>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
          Add Product
        </button>
      </div>
      
      <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
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
