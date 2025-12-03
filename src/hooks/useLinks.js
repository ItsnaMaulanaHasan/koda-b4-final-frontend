import { useCallback, useEffect, useState } from "react";
import { apiClient } from "../utils/apiClient";

export const useLinks = (page = 1, limit = 10, search = "", status = "") => {
  const [links, setLinks] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchLinks = useCallback(async () => {
    try {
      setLoading(true);

      const params = new URLSearchParams();
      params.append("page", page);
      params.append("limit", limit);
      if (search) params.append("search", search);
      if (status && status !== "all") params.append("status", status);

      const response = await apiClient(
        `${import.meta.env.VITE_BASE_URL}/api/v1/links?${params.toString()}`
      );

      if (!response.ok) {
        const result = await response.json();
        throw new Error(result.error || "Failed to fetch links");
      }

      const result = await response.json();

      if (!result.success) {
        throw new Error(result.message);
      }

      setLinks(result.data.links || []);
      setPagination(result.data.pagination);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [limit, page, search, status]);

  useEffect(() => {
    fetchLinks();
  }, [page, limit, search, status, fetchLinks]);

  const deleteLink = async (shortCode) => {
    try {
      const response = await apiClient(
        `${import.meta.env.VITE_BASE_URL}/api/v1/links/${shortCode}`,
        { method: "DELETE" }
      );

      if (!response.ok) {
        const result = await response.json();
        throw new Error(result.error || "Failed to delete link");
      }

      await fetchLinks();
      return true;
    } catch (err) {
      console.error("Delete error:", err);
      return false;
    }
  };

  return { links, pagination, loading, error, deleteLink, refetch: fetchLinks };
};
