export const apiClient = async (url, options = {}) => {
  const accessToken = localStorage.getItem("accessToken");

  let response = await fetch(url, {
    ...options,
    credentials: "include",
    headers: {
      ...options.headers,
      ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
    },
  });

  if (response.status === 401) {
    try {
      const refreshResponse = await fetch(
        import.meta.env.VITE_BASE_URL + "/api/v1/auth/refresh",
        {
          method: "POST",
          credentials: "include",
        }
      );

      if (refreshResponse.ok) {
        const result = await refreshResponse.json();
        const newAccessToken = result.data.accessToken;

        localStorage.setItem("accessToken", newAccessToken);

        response = await fetch(url, {
          ...options,
          credentials: "include",
          headers: {
            ...options.headers,
            Authorization: `Bearer ${newAccessToken}`,
          },
        });
      } else {
        localStorage.removeItem("accessToken");
        window.location.href = "/auth/login";
      }
    } catch (error) {
      console.log(error);
      localStorage.removeItem("accessToken");
      window.location.href = "/auth/login";
    }
  }

  return response;
};
