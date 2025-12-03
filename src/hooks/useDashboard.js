// hooks/useDashboard.js
import { useEffect, useState } from "react";
import { apiClient } from "../utils/apiClient";

export const useDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);

        const response = await apiClient(
          import.meta.env.VITE_BASE_URL + "/api/v1/dashboard/stats"
        );

        if (!response.ok) {
          const result = await response.json();
          throw new Error(result.error || "Failed to fetch stats");
        }

        const result = await response.json();

        if (!result.success) {
          throw new Error(result.message);
        }

        setStats(result.data);
      } catch (err) {
        console.error("Dashboard fetch error:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return { stats, loading, error };
};
