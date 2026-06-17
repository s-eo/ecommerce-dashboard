import { ArrowUp } from 'lucide-react';
import { LineChart, Line, ResponsiveContainer, Tooltip } from 'recharts';
import type {Metric} from "../../types.ts";

type MetricCardProps = Metric;

export default function MetricCard({ title, value, change, color, data }: MetricCardProps) {
  const colorClasses = {
    green: '#22c55e',
    blue: '#3b82f6',
    purple: '#a855f7',
    orange: '#f97316',
  };

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-800">
      <div className="flex items-start justify-between mb-4">
        <div>
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">{title}</p>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{value}</h3>
        </div>
        <div className="flex items-center gap-1 text-green-600 dark:text-green-400 text-sm font-medium">
          <ArrowUp className="w-4 h-4" />
          <span>{change}</span>
        </div>
      </div>
      <div className="h-16">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <Line
              type="monotone"
              dataKey="value"
              stroke={colorClasses[color]}
              strokeWidth={2}
              dot={false}
            />
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 px-3 py-1 rounded-lg text-sm">
                      {payload[0].value}
                    </div>
                  );
                }
                return null;
              }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
