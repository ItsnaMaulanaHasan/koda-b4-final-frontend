import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";

function ProtectedRoute({ children, redirectIfAuthenticated = false }) {
  const { accessToken } = useContext(AuthContext);
  const isAuthenticated = !!accessToken;

  if (redirectIfAuthenticated) {
    if (isAuthenticated) {
      return <Navigate to="/" replace />;
    }
    return children;
  }

  if (!isAuthenticated) {
    return <Navigate to="/auth/login" replace />;
  }

  return children;
}

export default ProtectedRoute;
