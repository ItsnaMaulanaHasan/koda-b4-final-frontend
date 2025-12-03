// eslint-disable-next-line no-unused-vars
function StatsCard({ icon: Icon, label, value, change, changeType }) {
  const isPositive = changeType === "positive";
  return (
    <div className="bg-white rounded-xl p-6 border border-gray-200">
      <div className="flex items-center justify-between mb-4">
        <div
          className={`w-10 h-10 rounded-lg flex items-center justify-center ${
            label === "Total Links"
              ? "bg-blue-100"
              : label === "Total Views"
              ? "bg-purple-100"
              : "bg-green-100"
          }`}>
          <Icon
            className={`w-5 h-5 ${
              label === "Total Links"
                ? "text-blue-600"
                : label === "Total Views"
                ? "text-purple-600"
                : "text-green-600"
            }`}
          />
        </div>
      </div>
      <div className="text-sm text-gray-600 mb-1">{label}</div>
      <div className="text-3xl font-bold text-gray-900 mb-2">{value}</div>
      <div
        className={`text-sm ${isPositive ? "text-green-600" : "text-red-600"}`}>
        {change}
      </div>
    </div>
  );
}

export default StatsCard;
