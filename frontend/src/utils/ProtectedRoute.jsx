import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { SocketProvider } from "../socket.jsx";

const ProtectedRoute = ({
  children,
  user,
  currentPath,
  redirect = "/login",
}) => {
  // if (!user) return <Navigate to={`${redirect}?redirect=${currentPath}`} />;
  if (!user)
    return (
      <Navigate
        to={currentPath ? `${redirect}?redirectTo=${currentPath}` : redirect}
      />
    );

  return <SocketProvider>{children ? children : <Outlet />}</SocketProvider>;
};

export default ProtectedRoute;
