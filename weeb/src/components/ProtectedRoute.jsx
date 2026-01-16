import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({
  children,
  requireActive = false,
  requireAdmin = false,
}) {
  const { isAuthenticated, isMember, isAdmin, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0F172A] text-white">
        Chargement...
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (requireAdmin && !isAdmin) {
    return <Navigate to="/articles" replace />;
  }

  if (requireActive && !(isMember || isAdmin)) {
    return <Navigate to="/articles" replace />;
  }

  return children;
}
