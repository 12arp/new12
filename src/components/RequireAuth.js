import React from "react";
import { Navigate } from "react-router-dom";

export default function RequireAuth({ children }) {
  const isLoggedIn = !!localStorage.getItem("adminToken");
  return isLoggedIn ? children : <Navigate to="/login" replace />;
} 