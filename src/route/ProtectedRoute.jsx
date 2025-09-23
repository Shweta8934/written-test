import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const user = useSelector((state) => state.user.user);
  const location = useLocation();

  if (!user) {
    // Agar user login nahi hai, login page pe bhej do
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return children; // Agar login hai toh children render karo
};

export default ProtectedRoute;
