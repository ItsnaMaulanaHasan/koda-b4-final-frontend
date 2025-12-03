import { Eye, Link2, MousePointerClick } from "lucide-react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import StatsCard from "../components/StatsCard";

function DashboardPage() {
  const chartData = [
    { date: "Nov 23", visits: 50 },
    { date: "Nov 24", visits: 52 },
    { date: "Nov 25", visits: 48 },
    { date: "Nov 26", visits: 55 },
    { date: "Nov 27", visits: 62 },
    { date: "Nov 28", visits: 65 },
    { date: "Nov 29", visits: 58 },
    { date: "Nov 30", visits: 70 },
  ];
  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* gage header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
        <p className="text-gray-600">
          Welcome back! Here's your link performance overview.
        </p>
      </div>

      {/* statistik */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatsCard
          icon={Link2}
          label="Total Links"
          value="247"
          change="+15 this week"
          changeType="positive"
        />
        <StatsCard
          icon={Eye}
          label="Total Views"
          value="18,564"
          change="+8.3% from last week"
          changeType="positive"
        />
        <StatsCard
          icon={MousePointerClick}
          label="Avg. Click Rate"
          value="75.2"
          change="+31% increase"
          changeType="positive"
        />
      </div>

      {/* chart */}
      <div className="bg-white rounded-xl p-6 border border-gray-200">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">
            Visitor Analytics
          </h2>
        </div>

        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis
              dataKey="date"
              stroke="#9ca3af"
              style={{ fontSize: "12px" }}
            />
            <YAxis stroke="#9ca3af" style={{ fontSize: "12px" }} />
            <Tooltip
              contentStyle={{
                backgroundColor: "white",
                border: "1px solid #e5e7eb",
                borderRadius: "8px",
              }}
            />
            <Line
              type="monotone"
              dataKey="visits"
              stroke="#3b82f6"
              strokeWidth={2}
              dot={{ fill: "#3b82f6", r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </main>
  );
}

export default DashboardPage;
