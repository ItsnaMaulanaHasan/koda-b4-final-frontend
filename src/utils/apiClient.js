export const apiClient = async (url, options = {}) => {
  const accessToken = (localStorage.getItem("accessToken") || "").replace(
    /^"|"$/g,
    ""
  );

  let response = await fetch(url, {
    ...options,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
      ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
    },
  });

  if (response.status === 401) {
    try {
      console.log("Token expired, refreshing...");
      const refreshResponse = await fetch(
        import.meta.env.VITE_BASE_URL + "/api/v1/auth/refresh",
        {
          method: "POST",
          credentials: "include",
        }
      );

      if (refreshResponse.ok) {
        const result = await refreshResponse.json();

        if (result.success && result.data?.accessToken) {
          const newAccessToken = result.data.accessToken;
          localStorage.setItem("accessToken", newAccessToken);

          response = await fetch(url, {
            ...options,
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
              ...options.headers,
              Authorization: `Bearer ${newAccessToken}`,
            },
          });

          console.log("Token refreshed successfully");
        } else {
          throw new Error("Invalid refresh response");
        }
      } else {
        console.error("Refresh failed, status:", refreshResponse.status);
        throw new Error("Refresh token expired");
      }
    } catch (error) {
      console.error("Token refresh error:", error);
      if (error.message !== "Failed to fetch") {
        localStorage.removeItem("accessToken");
        window.location.href = "/auth/login";
      }
    }
  }

  return response;
};
