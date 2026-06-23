import {type ForwardRefExoticComponent, type RefAttributes} from "react";
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer 
} from 'recharts';
import { TrendingUp, DollarSign, ShoppingCart, Users, Package,
  ArrowUpRight, ArrowDownRight, type LucideProps} from 'lucide-react';

// Mock data
const revenueData = [
  { name: 'Jan', revenue: 30000, previous: 25000 },
  { name: 'Feb', revenue: 35000, previous: 28000 },
  { name: 'Mar', revenue: 32000, previous: 30000 },
  { name: 'Apr', revenue: 40000, previous: 35000 },
  { name: 'May', revenue: 45231, previous: 38000 },
  { name: 'Jun', revenue: 42000, previous: 40000 },
];

const salesByChannel = [
  { name: 'Online Store', value: 45, revenue: 20354.35, color: '#3b82f6' },
  { name: 'Mobile App', value: 30, revenue: 13569.57, color: '#8b5cf6' },
  { name: 'Marketplace', value: 15, revenue: 6784.78, color: '#10b981' },
  { name: 'Retail Store', value: 10, revenue: 4523.19, color: '#f59e0b' },
];

const ordersData = [
  { name: 'Mon', orders: 45 },
  { name: 'Tue', orders: 52 },
  { name: 'Wed', orders: 48 },
  { name: 'Thu', orders: 61 },
  { name: 'Fri', orders: 55 },
  { name: 'Sat', orders: 72 },
  { name: 'Sun', orders: 38 },
];

const topProducts = [
  { name: 'Wireless Headphones', sales: 234, revenue: 23397.66 },
  { name: 'Smart Watch', sales: 189, revenue: 37808.11 },
  { name: 'Laptop Stand', sales: 156, revenue: 7798.44 },
  { name: 'Mechanical Keyboard', sales: 143, revenue: 21428.57 },
  { name: 'Wireless Mouse', sales: 128, revenue: 5118.72 },
];

const topCategories = [
  { name: 'Electronics', orders: 456, revenue: 45231.89 },
  { name: 'Clothing', orders: 234, revenue: 12345.67 },
  { name: 'Accessories', orders: 189, revenue: 8765.43 },
  { name: 'Home & Garden', orders: 156, revenue: 6543.21 },
  { name: 'Sports', orders: 98, revenue: 4321.09 },
];

const keyMetrics = [
  { title: 'Total Revenue', value: '$45,231.89', change: '+20.1%', positive: true, icon: DollarSign },
  { title: 'Total Orders', value: '1,245', change: '+15.3%', positive: true, icon: ShoppingCart },
  { title: 'Total Customers', value: '892', change: '+12.5%', positive: true, icon: Users },
  { title: 'Avg. Order Value', value: '$36.32', change: '+4.2%', positive: true, icon: Package },
  { title: 'Conversion Rate', value: '3.24%', change: '+0.8%', positive: true, icon: TrendingUp },
];

const customerInsights = [
  { title: 'New Customers', value: '156', change: '+18.2%', positive: true },
  { title: 'Returning Customers', value: '736', change: '+10.5%', positive: true },
  { title: 'Customer Lifetime Value', value: '$1,245.32', change: '+8.7%', positive: true },
  { title: 'Churn Rate', value: '2.4%', change: '-0.5%', positive: true },
];

type Insight = {
  title: string;
  value: string;
  change: string;
  positive: boolean;
}

type MetricCardProps = Insight & {
  icon: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>;
}

const MetricCard = ({ title, value, change, positive, icon: Icon }: MetricCardProps) => (
  <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-800">
    <div className="flex items-center justify-between mb-4">
      <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
        <Icon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
      </div>
      <div className={`flex items-center gap-1 text-sm ${positive ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
        {positive ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
        {change}
      </div>
    </div>
    <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium mb-1">{title}</h3>
    <p className="text-2xl font-bold text-gray-900 dark:text-white">{value}</p>
  </div>
);

const InsightCard = ({ title, value, change, positive }: Insight) => (
  <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-800">
    <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium mb-2">{title}</h3>
    <div className="flex flex-wrap items-center justify-between">
      <p className="text-2xl font-bold text-gray-900 dark:text-white">{value}</p>
      <div className={`flex items-center gap-1 text-sm ${positive ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
        {positive ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
        {change}
      </div>
    </div>
  </div>
);

export default function Analytics() {
  return (
    <div className="p-6 pt-20">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Analytics</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">Overview of your business performance</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
        {keyMetrics.map((metric) => (
          <MetricCard key={metric.title} {...metric} />
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Revenue Overview */}
        <div className="lg:col-span-2 bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-800">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Revenue Overview</h2>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" strokeOpacity={0.2} />
              <XAxis dataKey="name" stroke="#6b7280" fontSize={12} />
              <YAxis stroke="#6b7280" fontSize={12} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#1f2937', border: 'none', borderRadius: '8px' }}
                itemStyle={{ color: '#fff' }}
              />
              <Legend />
              <Area type="monotone" dataKey="revenue" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.3} name="Revenue" />
              <Area type="monotone" dataKey="previous" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.2} name="Previous Period" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Sales by Channel */}
        <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-800">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Sales by Channel</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={salesByChannel}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
              >
                {salesByChannel.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ backgroundColor: '#1f2937', border: 'none', borderRadius: '8px' }}
                itemStyle={{ color: '#fff' }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-4 space-y-2">
            {salesByChannel.map((channel) => (
              <div key={channel.name} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: channel.color }} />
                  <span className="text-gray-600 dark:text-gray-400">{channel.name}</span>
                </div>
                <div className="text-right">
                  <span className="text-gray-900 dark:text-white font-medium">{channel.value}%</span>
                  <span className="text-gray-500 dark:text-gray-400 ml-2">${channel.revenue.toLocaleString()}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Orders Overview */}
      <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-800 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Orders Overview</h2>
          <div className="flex items-center gap-2 text-sm">
            <span className="text-gray-500 dark:text-gray-400">Total: 371</span>
            <span className="text-green-600 dark:text-green-400">+12.5%</span>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={ordersData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" strokeOpacity={0.2} />
            <XAxis dataKey="name" stroke="#6b7280" fontSize={12} />
            <YAxis stroke="#6b7280" fontSize={12} />
            <Tooltip 
              contentStyle={{ backgroundColor: '#1f2937', border: 'none', borderRadius: '8px' }}
              itemStyle={{ color: '#fff' }}
            />
            <Bar dataKey="orders" fill="#3b82f6" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Tables Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Top Selling Products */}
        <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-800">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Top Selling Products</h2>
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-800">
                <th className="text-left py-3 px-2 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">Product</th>
                <th className="text-right py-3 px-2 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">Sales</th>
                <th className="text-right py-3 px-2 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">Revenue</th>
              </tr>
            </thead>
            <tbody>
              {topProducts.map((product, index) => (
                <tr key={index} className="border-b border-gray-100 dark:border-gray-800 last:border-0">
                  <td className="py-3 px-2 text-sm text-gray-900 dark:text-white">{product.name}</td>
                  <td className="py-3 px-2 text-sm text-gray-600 dark:text-gray-400 text-right">{product.sales}</td>
                  <td className="py-3 px-2 text-sm text-gray-900 dark:text-white font-medium text-right">${product.revenue.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Top Categories */}
        <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-800">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Top Categories</h2>
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-800">
                <th className="text-left py-3 px-2 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">Category</th>
                <th className="text-right py-3 px-2 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">Orders</th>
                <th className="text-right py-3 px-2 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">Revenue</th>
              </tr>
            </thead>
            <tbody>
              {topCategories.map((category, index) => (
                <tr key={index} className="border-b border-gray-100 dark:border-gray-800 last:border-0">
                  <td className="py-3 px-2 text-sm text-gray-900 dark:text-white">{category.name}</td>
                  <td className="py-3 px-2 text-sm text-gray-600 dark:text-gray-400 text-right">{category.orders}</td>
                  <td className="py-3 px-2 text-sm text-gray-900 dark:text-white font-medium text-right">${category.revenue.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Customer Insights */}
      <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-800 mb-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Customer Insights</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {customerInsights.map((insight) => (
            <InsightCard key={insight.title} {...insight} />
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="text-center text-sm text-gray-500 dark:text-gray-400">
        Analytics data is updated every 30 minutes. All times are shown in your local timezone.
      </div>
    </div>
  );
}
