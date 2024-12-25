import { FC } from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute: FC = () => {
  const token = localStorage.getItem("authToken");

  if (!token) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
