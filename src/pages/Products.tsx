import { MoreVertical } from 'lucide-react';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import {useQuery} from '@tanstack/react-query';
import {useMemo} from "react";

const PRODUCTS_API_URL = 'https://fakestoreapi.com/products';

type ProductStatus = 'In Stock' | 'Out of Stock' | 'Low Stock';

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  status?: ProductStatus;
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

  return products;
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

  const table = useReactTable({
    data: productData,
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
            <button
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
              Add Product
            </button>
          </div>


          <div
              className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden mt-10">
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
