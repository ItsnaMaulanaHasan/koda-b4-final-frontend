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
import { useDashboard } from "../hooks/useDashboard";

function DashboardPage() {
  const { stats, loading, error } = useDashboard();

  if (loading) {
    return (
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <p>Loading...</p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <p className="text-red-600">Error: {error}</p>
      </main>
    );
  }

  const chartData =
    stats?.Last7DaysStat && Array.isArray(stats.Last7DaysStat)
      ? stats.Last7DaysStat.map((item) => ({
          date: new Date(item.day).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
          }),
          visits: item.count,
        }))
      : [];

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
        <p className="text-gray-600">
          Welcome back! Here's your link performance overview.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatsCard
          icon={Link2}
          label="Total Links"
          value={stats.TotalLinks.toString()}
          change=""
          changeType="positive"
        />
        <StatsCard
          icon={Eye}
          label="Total Views"
          value={stats.TotalVisits.toLocaleString()}
          change=""
          changeType="positive"
        />
        <StatsCard
          icon={MousePointerClick}
          label="Avg. Click Rate"
          value={stats.AvgClickRate.toFixed(1)}
          change=""
          changeType="positive"
        />
      </div>

      <div className="bg-white rounded-xl p-6 border border-gray-200">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">
            Visitor Analytics
          </h2>
        </div>

        {chartData.length > 0 ? (
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
        ) : (
          <div className="flex items-center justify-center h-[300px] text-gray-500">
            No chart data available
          </div>
        )}
      </div>
    </main>
  );
}

export default DashboardPage;
