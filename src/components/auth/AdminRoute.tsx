
import { Navigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

interface AdminRouteProps {
  children: React.ReactNode;
}

const AdminRoute = ({ children }: AdminRouteProps) => {
  const { currentUser, loading, userProfile } = useAuth();

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (!currentUser || !userProfile || userProfile.role !== "vendor") {
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
};

export default AdminRoute;
