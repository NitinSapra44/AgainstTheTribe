import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "./userContext.jsx";

const ProtectedRoute = ({ children }) => {
  const { user, ready } = useContext(UserContext);

  if (!ready) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
