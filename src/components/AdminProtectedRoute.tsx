// AdminProtectedRoute.tsx
import { Navigate } from "react-router-dom";
import { useUserContext } from "@/hooks/contextHooks"; // Make sure to adjust the path as necessary

interface AdminProtectedRouteProps {
  children: React.ReactNode;
}

const AdminProtectedRoute: React.FC<AdminProtectedRouteProps> = ({ children }) => {
  const { user } = useUserContext();

  if (!user || user.role !== "admin") {
    return <Navigate to="/" replace />;
  }
  return <>{children}</>;
};

export default AdminProtectedRoute;
