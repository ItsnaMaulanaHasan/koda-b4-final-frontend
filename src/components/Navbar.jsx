import {
  ExternalLink,
  LayoutDashboard,
  Link2,
  LogOut,
  Settings,
} from "lucide-react";
import { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { ProfileContext } from "../context/ProfileContext";
import Alert from "./Alert";
import ModalConfirmation from "./ModalConfirmation";

function Navbar() {
  const navigate = useNavigate();
  const { accessToken, setAccessToken } = useContext(AuthContext);
  const { setProfile } = useContext(ProfileContext);
  const isLoggedIn = !!accessToken;
  const [showModal, setShowModal] = useState(false);
  const [alertStatus, setAlertStatus] = useState({ type: "", message: "" });

  const handleLogout = async () => {
    try {
      const res = await fetch(
        import.meta.env.VITE_BASE_URL + "/api/v1/auth/logout",
        {
          method: "POST",
          credentials: "include",
        }
      );

      if (!res.ok) {
        const result = await res.json();
        throw new Error(result.error || "Failed to logout");
      }

      const result = await res.json();

      if (!result.success) {
        throw new Error(result.error);
      }

      setAccessToken("");
      setProfile(null);
      navigate("/auth/login");
    } catch (error) {
      let errorMessage = "Failed to logout";
      if (error.message) {
        errorMessage = error.message;
      } else if (!navigator.onLine) {
        errorMessage = "No internet connection";
      }
      setAlertStatus({
        type: "error",
        message: errorMessage,
      });
    }
  };

  return (
    <header className="bg-white border-b border-gray-200">
      <Alert
        type={alertStatus.type}
        message={alertStatus.message}
        onClose={() => setAlertStatus({ type: "", message: "" })}
      />
      <ModalConfirmation
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={handleLogout}
        title="Confirm Logout"
        message="Are you sure you want to logout?"
        confirmText="Logout"
        cancelText="Cancel"
        type="warning"
      />
      <div
        className={`${
          isLoggedIn ? "max-w-7xl" : "max-w-6xl"
        } mx-auto px-4 sm:px-6 lg:px-8`}>
        <div className="flex justify-between items-center py-4">
          {/* logo */}
          <div className="flex items-center gap-8">
            <div
              className="flex items-center gap-2 cursor-pointer"
              onClick={() => navigate("/")}>
              <Link2 className="w-6 h-6 text-blue-600" />
              <span className="text-xl font-semibold text-gray-900">
                Koda Shortlink
              </span>
            </div>

            {isLoggedIn && (
              <nav className="hidden md:flex items-center gap-6">
                <NavLink
                  to="/dashboard"
                  className={({ isActive }) =>
                    `flex items-center gap-2 font-medium ${
                      isActive
                        ? "text-blue-600"
                        : "text-gray-600 hover:text-gray-900"
                    }`
                  }>
                  <LayoutDashboard className="w-4 h-4" />
                  Dashboard
                </NavLink>
                <NavLink
                  to="/links"
                  className={({ isActive }) =>
                    `flex items-center gap-2 font-medium ${
                      isActive
                        ? "text-blue-600"
                        : "text-gray-600 hover:text-gray-900"
                    }`
                  }>
                  <ExternalLink className="w-4 h-4" />
                  Links
                </NavLink>
                <NavLink
                  to="/settings"
                  className={({ isActive }) =>
                    `flex items-center gap-2 font-medium ${
                      isActive
                        ? "text-blue-600"
                        : "text-gray-600 hover:text-gray-900"
                    }`
                  }>
                  <Settings className="w-4 h-4" />
                  Settings
                </NavLink>
                <button
                  onClick={() => {
                    setShowModal(true);
                  }}
                  className="p-2 flex gap-2 items-center text-gray-600 hover:text-gray-900 cursor-pointer"
                  title="Logout">
                  <LogOut className="w-5 h-5" />
                  Logout
                </button>
              </nav>
            )}
          </div>

          <div className="flex items-center gap-3">
            {isLoggedIn ? (
              <>
                <button
                  onClick={() => navigate("/")}
                  className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition flex items-center gap-2">
                  <span className="text-lg">+</span>
                  Create Short Link
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => navigate("/auth/login")}
                  className="px-4 py-2 text-gray-700 hover:text-gray-900 font-medium cursor-pointer">
                  Sign In
                </button>
                <button
                  onClick={() => navigate("/auth/register")}
                  className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition">
                  Get Started
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
