import { Navigate, Outlet } from "react-router";
import useAuthStore from "../../store/useAuthStore";

const ProtectedRoute = () => {
  const { isLoading, isLoggedIn } = useAuthStore();
  if (isLoading) return <div>loading</div>;
  if (!isLoggedIn) return <Navigate to="/" replace />;
  return <Outlet />;
};

export default ProtectedRoute;
