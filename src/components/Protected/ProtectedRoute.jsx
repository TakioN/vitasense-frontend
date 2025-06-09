import { Navigate, Outlet } from "react-router";
import useAuthStore from "../../store/authStore";

const ProtectedRoute = () => {
  // const { isLoading, isLoggedIn } = useAuth();
  const { isLoading, isLoggedIn } = useAuthStore();
  if (isLoading) return <div>loading</div>;
  if (!isLoggedIn) return <Navigate to="/sign-in" replace />;
  return <Outlet />;
};

export default ProtectedRoute;
