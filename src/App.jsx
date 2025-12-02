import { createBrowserRouter, RouterProvider } from "react-router-dom";
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
        element: <DashboardPage />,
      },
      {
        path: "/links",
        element: <LinksManagementPage />,
      },
      {
        path: "/settings",
        element: <SettingPage />,
      },
    ],
  },
  {
    element: <LoginPage />,
    path: "/auth/login",
  },
  {
    element: <RegisterPage />,
    path: "/auth/register",
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
