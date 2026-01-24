import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

export interface ChartDataPoint {
  day: string;
  revenue: number;
  orders: number;
  month?: number;
}

export interface RevenueOverviewResponse {
  period: "7days" | "30days" | "3months";
  totalRevenue: number;
  totalOrders: number;
  chartData: ChartDataPoint[];
}

interface Props {
  data: RevenueOverviewResponse;
  onPeriodChange: (period: RevenueOverviewResponse["period"]) => void;
}

const periodLabelMap = {
  "7days": "Last 7 Days",
  "30days": "Last 30 Days",
  "3months": "Last 3 Months",
};

const RevenueOverviewChart = ({ data, onPeriodChange }: Props) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 w-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-800">
          Revenue Overview
        </h2>

        <select
          value={data.period}
          onChange={(e) =>
            onPeriodChange(e.target.value as RevenueOverviewResponse["period"])
          }
          className="border rounded-md px-3 py-1.5 text-sm outline-none focus:ring-2 focus:ring-blue-500"
        >
          {Object.entries(periodLabelMap).map(([key, label]) => (
            <option key={key} value={key}>
              {label}
            </option>
          ))}
        </select>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-gray-50 rounded-lg p-4">
          <p className="text-sm text-gray-500">Total Revenue</p>
          <p className="text-xl font-bold text-gray-800">
            ₹{data.totalRevenue.toLocaleString()}
          </p>
        </div>

        <div className="bg-gray-50 rounded-lg p-4">
          <p className="text-sm text-gray-500">Total Orders</p>
          <p className="text-xl font-bold text-gray-800">
            {data.totalOrders}
          </p>
        </div>
      </div>

      {/* Chart */}
      <div className="h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data.chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="day"
              tick={{ fontSize: 12 }}
              stroke="#6B7280"
            />
            <YAxis
              tick={{ fontSize: 12 }}
              stroke="#6B7280"
            />
            <Tooltip
              formatter={(value?: number) =>
                value !== undefined ? `₹${value.toLocaleString()}` : "₹0"
              }
            />

            <Line
              type="monotone"
              dataKey="revenue"
              stroke="#2563EB"
              strokeWidth={2}
              dot={{ r: 3 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default RevenueOverviewChart;
