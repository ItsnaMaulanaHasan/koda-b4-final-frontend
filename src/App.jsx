import { useEffect, useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";
import { ProfileContext } from "./context/ProfileContext";
import ProtectedRoute from "./context/ProtectedRoute";
import AuthLayout from "./layouts/AuthLayout";
import MainLayout from "./layouts/MainLayout";
import DashboardPage from "./pages/DashboardPage";
import LandingPage from "./pages/LandingPage";
import LinksManagementPage from "./pages/LinksManagementPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import SettingPage from "./pages/SettingPage";

const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <LandingPage />,
      },
      {
        path: "/dashboard",
        element: (
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "/links",
        element: (
          <ProtectedRoute>
            <LinksManagementPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "/settings",
        element: (
          <ProtectedRoute>
            <SettingPage />
          </ProtectedRoute>
        ),
      },
    ],
  },
  {
    element: <AuthLayout />,
    children: [
      {
        path: "/auth/register",
        element: <RegisterPage />,
      },
      {
        path: "/auth/login",
        element: <LoginPage />,
      },
    ],
  },
]);

function App() {
  const [accessToken, setAccessToken] = useState(() => {
    try {
      const data = window.localStorage.getItem("accessToken");
      return data ? data : null;
    } catch (error) {
      console.log("Failed to parse access token from localStorage:", error);
      return null;
    }
  });

  const [profile, setProfile] = useState(() => {
    try {
      const data = window.localStorage.getItem("profile");
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.log("Failed to parse profile from localStorage:", error);
      return null;
    }
  });

  useEffect(() => {
    if (accessToken === null) {
      localStorage.removeItem("accessToken");
    } else {
      localStorage.setItem("accessToken", accessToken);
    }
  }, [accessToken]);

  useEffect(() => {
    if (profile === null) {
      localStorage.removeItem("profile");
    } else {
      localStorage.setItem("profile", JSON.stringify(profile));
    }
  }, [profile]);

  return (
    <AuthContext.Provider value={{ accessToken, setAccessToken }}>
      <ProfileContext.Provider value={{ profile, setProfile }}>
        <RouterProvider router={router} />
      </ProfileContext.Provider>
    </AuthContext.Provider>
  );
}

export default App;
