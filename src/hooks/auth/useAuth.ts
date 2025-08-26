import { useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { selectIsAuthenticated, selectAuthUser, selectAuthLoading } from "@/providers/auth/selector/authSelector";
import { isAuthenticated } from "@/shared/store";

export const useAuth = () => {
  const isAuth = useSelector(selectIsAuthenticated);
  const user = useSelector(selectAuthUser);
  const loading = useSelector(selectAuthLoading);
  const router = useRouter();

  const hasValidTokens = isAuthenticated();

  useEffect(() => {
    
    if (!loading && !hasValidTokens && isAuth) {
      if (typeof window !== "undefined" && window.location.pathname !== "/login") {
        router.push("/login");
      }
    }
  }, [loading, hasValidTokens, isAuth, router]);

  return {
    isAuthenticated: isAuth && hasValidTokens,
    user,
    loading,
    hasValidTokens,
  };
};

export const useRequireAuth = () => {
  const { isAuthenticated, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push("/login");
    }
  }, [loading, isAuthenticated, router]);

  return { isAuthenticated, loading };
};
