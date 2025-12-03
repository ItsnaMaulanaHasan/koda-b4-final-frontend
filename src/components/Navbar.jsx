import {
  ExternalLink,
  LayoutDashboard,
  Link2,
  LogOut,
  Settings,
} from "lucide-react";
import { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function Navbar() {
  const navigate = useNavigate();
  const { accessToken } = useContext(AuthContext);
  const isLoggedIn = !!accessToken;

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <header className="bg-white border-b border-gray-200">
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
                  onClick={handleLogout}
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
                  onClick={() => navigate("/create-link")}
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
