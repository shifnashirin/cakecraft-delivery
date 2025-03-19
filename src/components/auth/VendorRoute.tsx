
import { Navigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

interface VendorRouteProps {
  children: React.ReactNode;
}

const VendorRoute = ({ children }: VendorRouteProps) => {
  const { user,  userData } = useAuth();

  // if (loading) {
  //   return <div className="flex justify-center items-center h-screen">Loading...</div>;
  // }

  if (!user || !userData || userData.role !== "vendor") {
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
};

export default VendorRoute;
