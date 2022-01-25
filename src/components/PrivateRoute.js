import { useAuth } from "context/AuthContext";
import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children, ...rest }) => {
  const { currentUser } = useAuth();
  return currentUser ? children : <Navigate to="login" />;
};

export default PrivateRoute;
