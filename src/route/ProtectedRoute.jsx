import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { isLoggedIn } = useSelector((state) => state.user);

  // If user is not logged in, redirect to login page
  if (!isLoggedIn) {
    return <Navigate to="/" replace />;
  }

  // If logged in, render the children route
  return children;
};

export default ProtectedRoute;
