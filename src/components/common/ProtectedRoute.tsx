"use client";

import { useRequireAuth } from "@/hooks/auth/useAuth";
import { ReactNode } from "react";

interface ProtectedRouteProps {
  children: ReactNode;
  fallback?: ReactNode;
}

export default function ProtectedRoute({ 
  children, 
  fallback = <div>Loading...</div> 
}: ProtectedRouteProps) {
  const { isAuthenticated, loading } = useRequireAuth();

  if (loading) {
    return <>{fallback}</>;
  }

  if (!isAuthenticated) {
    return null; // Will redirect to login
  }

  return <>{children}</>;
}
