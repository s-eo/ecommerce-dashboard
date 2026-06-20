import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';

interface Order {
  id: string;
  customer: {
    name: string;
    avatar: string;
  };
  orderNumber: string;
  date: string;
  status: 'Processing' | 'Delivered' | 'Pending' | 'Cancelled';
  amount: string;
}

const statusColors = {
  Processing: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
  Delivered: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
  Pending: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
  Cancelled: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
};

interface RecentOrdersProps {
  orders: Order[];
}

const columnHelper = createColumnHelper<Order>();

const columns = [
  columnHelper.accessor('customer', {
    header: 'Customer',
    cell: (info) => {
      const customer = info.getValue();
      return (
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-xs lg:text-sm">
            {customer.avatar}
          </div>
          <span className="text-xs lg:text-sm font-medium text-gray-900 dark:text-white">
            {customer.name}
          </span>
        </div>
      );
    },
  }),
  columnHelper.accessor('orderNumber', {
    header: 'No.',
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('date', {
    header: 'Date',
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('status', {
    header: 'Status',
    cell: (info) => {
      const status = info.getValue();
      return (
        <span className={`px-3 py-1 rounded-full text-xs lg:text-xs font-medium ${statusColors[status]}`}>
          {status}
        </span>
      );
    },
  }),
  columnHelper.accessor('amount', {
    header: 'Amount',
    cell: (info) => (
      <span className="text-xs lg:text-sm font-medium text-gray-900 dark:text-white">
        {info.getValue()}
      </span>
    ),
  }),
];
const hiddenColumns = ['date', 'customer'];

export default function RecentOrders({ orders }: RecentOrdersProps) {
  const table = useReactTable({
    data: orders.slice(0, 3),
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="@container h-full flex flex-col bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-800">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-md lg:text-lg font-semibold text-gray-900 dark:text-white">Recent Orders</h3>
        <button className="text-xs lg:text-sm text-blue-600 dark:text-blue-400 hover:underline font-medium">
          View all
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id} className="border-b border-gray-200 dark:border-gray-800">
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className={`text-left py-3 px-3 text-xs lg:text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider whitespace-nowrap ${
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
                    className={`py-4 px-3 text-sm text-gray-700 dark:text-gray-300 whitespace-nowrap ${
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
      <div className="mt-auto text-center">
        <button className="text-sm text-blue-600 dark:text-blue-400 hover:underline font-medium">
          View all orders
        </button>
      </div>
    </div>
  );
}
