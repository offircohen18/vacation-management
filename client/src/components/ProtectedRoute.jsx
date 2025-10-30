import React from "react";
import { Navigate } from "react-router-dom";
import { useUser } from "../hooks/useUser";

export default function ProtectedRoute({ children, role }) {
  const [user, , loading] = useUser();

  if (loading) return null;

  if (!user) return <Navigate to="/" replace />; 
  if (role && user.role !== role) return <Navigate to="/" replace />; 

  return children;
}
