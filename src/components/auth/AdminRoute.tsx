
import { Navigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

interface AdminRouteProps {
  children: React.ReactNode;
}

const AdminRoute = ({ children }: AdminRouteProps) => {
  const { user,  userData } = useAuth();

  // if (loading) {
  //   return <div className="flex justify-center items-center h-screen">Loading...</div>;
  // }

  if (!user || !userData || userData.role !== "admin") {
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
};

export default AdminRoute;
