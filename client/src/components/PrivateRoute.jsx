import React, { ComponentType } from "react";
import { Navigate, useLocation } from "react-router-dom";

const PrivateRoute = ({ component: Component, isAuthenticated }) => {
  const location = useLocation();

  return isAuthenticated ? (
    <Component />
  ) : (
    <Navigate to="/signin" state={{ from: location }} />
  );
};

export default PrivateRoute;
