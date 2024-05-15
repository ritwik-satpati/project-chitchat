import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const RestrictedRoute = ({ children, user, redirect = "/" }) => {
  const location = useLocation();
  const redirectPath = new URLSearchParams(location.search).get("redirectTo");

  // console.log(redirectPath);

  if (!user) return <Navigate to={redirectPath ? redirectPath : redirect} />;
  return children ? children : <Outlet />;
};

export default RestrictedRoute;
