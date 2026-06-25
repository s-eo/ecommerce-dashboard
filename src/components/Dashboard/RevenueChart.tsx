import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface RevenueChartProps {
  data: Array<{ date: string; value: number }>;
}

export default function RevenueChart({ data }: RevenueChartProps) {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-800 h-full">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Revenue Overview</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            $128,430 <span className="text-green-600 dark:text-green-400">12.4% vs last month</span>
          </p>
        </div>
        <select className="px-3 py-2 bg-gray-100 dark:bg-gray-800 border-0 rounded-lg text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
          <option>This Month</option>
          <option>Last Month</option>
          <option>Last 3 Months</option>
          <option>Last Year</option>
        </select>
      </div>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%"  initialDimension={{ width: 444, height: 487 }}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" strokeOpacity={0.5} />
            <XAxis
              dataKey="date"
              stroke="#9ca3af"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="#9ca3af"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `$${value}`}
            />
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 px-4 py-2 rounded-lg shadow-lg">
                      <p className="text-sm font-medium">${payload[0]?.value?.toLocaleString()}</p>
                      <p className="text-xs text-gray-400 dark:text-gray-600">{payload[0].payload.date}</p>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#3b82f6"
              strokeWidth={2}
              dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
