"use client";

import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { authService, type User, type SignupData, type LoginData } from "@/app/lib/authService";
import { clearAccessToken, getAccessToken, setAccessToken, type TokenPersistMode } from "@/app/lib/tokenStorage";

export interface LoginInput extends LoginData {
  rememberMe?: boolean;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  login: (data: LoginInput) => Promise<{ success: boolean; error?: string }>;
  signup: (data: SignupData) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  clearError: () => void;
  isAuthenticated: boolean;
  hasRole: (role: string) => boolean;
  hasPermission: (permission: string) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthContextProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const logout = useCallback(async () => {
    setLoading(true);

    try {
      await authService.logout();
    } catch {
      // ignore
    } finally {
      clearAccessToken();
      setUser(null);
      setLoading(false);
      router.push("/login");
    }
  }, [router]);

  const initializeAuth = useCallback(async () => {
    const token = getAccessToken();

    if (!token) {
      setLoading(false);
      return;
    }

    try {
      const response = await authService.getCurrentUser();

      if (response.success && response.data?.user) {
        setUser(response.data.user);
      } else {
        clearAccessToken();
        setUser(null);
      }
    } catch {
      clearAccessToken();
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void initializeAuth();
  }, [initializeAuth]);

  const login = async (data: LoginInput): Promise<{ success: boolean; error?: string }> => {
    setLoading(true);
    setError(null);

    const persistMode: TokenPersistMode = data.rememberMe ? "local" : "session";

    try {
      const response = await authService.login({
        email: data.email,
        password: data.password,
      });

      if (!response.success || !response.data) {
        const errorMessage = response.error || "Login failed";
        setError(errorMessage);
        return { success: false, error: errorMessage };
      }

      setAccessToken(response.data.token, persistMode);

      const profile = await authService.getCurrentUser();
      if (profile.success && profile.data?.user) {
        setUser(profile.data.user);
      } else {
        setUser(response.data.user);
      }

      router.push("/dashboard");
      return { success: true };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "An unexpected error occurred";
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  const signup = async (data: SignupData): Promise<{ success: boolean; error?: string }> => {
    setLoading(true);
    setError(null);

    try {
      const response = await authService.signup(data);

      if (!response.success || !response.data) {
        const errorMessage = response.error || "Signup failed";
        setError(errorMessage);
        return { success: false, error: errorMessage };
      }

      setAccessToken(response.data.token, "local");

      const profile = await authService.getCurrentUser();
      if (profile.success && profile.data?.user) {
        setUser(profile.data.user);
      } else {
        setUser(response.data.user);
      }

      router.push("/dashboard");
      return { success: true };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "An unexpected error occurred";
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  const clearError = () => {
    setError(null);
  };

  const hasRole = (role: string): boolean => {
    if (!user?.roles) return false;
    return user.roles.includes(role);
  };

  const hasPermission = (permission: string): boolean => {
    if (!user?.permissions) return false;
    return user.permissions.includes(permission);
  };

  const value: AuthContextType = {
    user,
    loading,
    error,
    login,
    signup,
    logout,
    clearError,
    isAuthenticated: !!user,
    hasRole,
    hasPermission,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthContextProvider");
  }
  return context;
}
