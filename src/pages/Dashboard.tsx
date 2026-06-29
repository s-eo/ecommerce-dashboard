import MetricCard from '../components/Dashboard/MetricCard';
import RevenueChart from '../components/Dashboard/RevenueChart';
import RecentOrders from '../components/Dashboard/RecentOrders';
import type {Metric} from "../types.ts";
import { useGitHubNotifications } from '../hooks/useGitHubNotifications';

export default function Dashboard() {
  // Initialize GitHub notifications with repo owner and name from env or defaults
  const repoOwner = import.meta.env.VITE_GITHUB_REPO_OWNER || 'your-username';
  const repoName = import.meta.env.VITE_GITHUB_REPO_NAME || 'your-repo';
  useGitHubNotifications(repoOwner, repoName);

  const metricsData: Array<Metric> = [
    {
      title: 'Revenue',
      value: '$128,430',
      change: '12.4%',
      color: 'green',
      data: [
        { name: 'Mon', value: 12000 },
        { name: 'Tue', value: 15000 },
        { name: 'Wed', value: 13000 },
        { name: 'Thu', value: 18000 },
        { name: 'Fri', value: 22000 },
        { name: 'Sat', value: 25000 },
        { name: 'Sun', value: 23430 },
      ],
    },
    {
      title: 'Orders',
      value: '1,245',
      change: '8.2%',
      color: 'blue',
      data: [
        { name: 'Mon', value: 120 },
        { name: 'Tue', value: 150 },
        { name: 'Wed', value: 130 },
        { name: 'Thu', value: 180 },
        { name: 'Fri', value: 220 },
        { name: 'Sat', value: 250 },
        { name: 'Sun', value: 195 },
      ],
    },
    {
      title: 'Customers',
      value: '4,892',
      change: '5.1%',
      color: 'purple',
      data: [
        { name: 'Mon', value: 4500 },
        { name: 'Tue', value: 4600 },
        { name: 'Wed', value: 4700 },
        { name: 'Thu', value: 4750 },
        { name: 'Fri', value: 4800 },
        { name: 'Sat', value: 4850 },
        { name: 'Sun', value: 4892 },
      ],
    },
    {
      title: 'Products',
      value: '312',
      change: '+24',
      color: 'orange',
      data: [
        { name: 'Mon', value: 280 },
        { name: 'Tue', value: 290 },
        { name: 'Wed', value: 295 },
        { name: 'Thu', value: 300 },
        { name: 'Fri', value: 305 },
        { name: 'Sat', value: 310 },
        { name: 'Sun', value: 312 },
      ],
    },
  ];

  const revenueData = [
    { date: 'May 1', value: 15000 },
    { date: 'May 5', value: 18000 },
    { date: 'May 10', value: 22000 },
    { date: 'May 15', value: 20000 },
    { date: 'May 16', value: 23540 },
    { date: 'May 20', value: 25000 },
    { date: 'May 25', value: 28000 },
    { date: 'May 31', value: 30000 },
  ];

  const recentOrders = [
    {
      id: '1',
      customer: { name: 'Alice Johnson', avatar: 'AJ' },
      orderNumber: '#001',
      date: 'May 16, 2024',
      status: 'Processing' as const,
      amount: '$234.50',
    },
    {
      id: '2',
      customer: { name: 'Bob Smith', avatar: 'BS' },
      orderNumber: '#002',
      date: 'May 15, 2024',
      status: 'Delivered' as const,
      amount: '$189.00',
    },
    {
      id: '3',
      customer: { name: 'Carol White', avatar: 'CW' },
      orderNumber: '#003',
      date: 'May 14, 2024',
      status: 'Pending' as const,
      amount: '$456.75',
    },
    {
      id: '4',
      customer: { name: 'David Brown', avatar: 'DB' },
      orderNumber: '#004',
      date: 'May 13, 2024',
      status: 'Delivered' as const,
      amount: '$123.25',
    },
    {
      id: '5',
      customer: { name: 'Eva Martinez', avatar: 'EM' },
      orderNumber: '#005',
      date: 'May 12, 2024',
      status: 'Cancelled' as const,
      amount: '$789.00',
    },
  ];

  return (
    <div className="p-6 pt-20">
      {/* Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {metricsData.map((metric) => (
          <MetricCard key={metric.title} {...metric} />
        ))}
      </div>

      {/* Revenue Chart and Recent Orders */}
      <div className="grid grid-cols-1 xl:grid-cols-5 gap-6 items-stretch">
        <div className="xl:col-span-3">
          <RevenueChart data={revenueData} />
        </div>
        <div className="xl:col-span-2 lg:max-h-[500px] min-h-[500px] overflow-y-auto">
          <RecentOrders orders={recentOrders} />
        </div>
      </div>
    </div>
  );
}
