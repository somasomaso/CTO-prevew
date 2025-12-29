"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext";

export interface AuthGuardOptions {
  requiredRole?: string;
  requiredPermission?: string;
  redirectTo?: string;
}

export function useAuthGuard(options: AuthGuardOptions = {}) {
  const { user, loading, hasRole, hasPermission } = useAuth();
  const router = useRouter();
  const { requiredRole, requiredPermission, redirectTo = "/login" } = options;

  useEffect(() => {
    if (loading) return;

    if (!user) {
      router.push(redirectTo);
      return;
    }

    if (requiredRole && !hasRole(requiredRole)) {
      router.push("/dashboard");
      return;
    }

    if (requiredPermission && !hasPermission(requiredPermission)) {
      router.push("/dashboard");
      return;
    }
  }, [user, loading, requiredRole, requiredPermission, redirectTo, router, hasRole, hasPermission]);

  return { user, loading };
}
