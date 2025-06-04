import { Navigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useAuthStore from "../../store/authStore";

const ProtectedRoute = ({ element }) => {
  // const { isLoading, isLoggedIn } = useAuth();
  const { isLoading, isLoggedIn } = useAuthStore();
  if (isLoading) return <div>loading</div>;
  if (!isLoggedIn) return <Navigate to="/sign-in" replace />;
  return element;
};

export default ProtectedRoute;
