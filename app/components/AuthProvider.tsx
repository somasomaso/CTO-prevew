"use client";

import React from "react";
import { AuthContextProvider } from "@/app/context/AuthContext";
import { useTokenRefresh } from "@/app/hooks/useTokenRefresh";

class AuthErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-screen items-center justify-center p-6">
          <div className="glass max-w-md rounded-2xl border border-white/10 p-6 text-center">
            <h1 className="text-xl font-semibold text-white">Authentication error</h1>
            <p className="mt-2 text-sm text-white/70">
              Something went wrong while loading your session. Please refresh the page.
            </p>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  useTokenRefresh();

  return (
    <AuthErrorBoundary>
      <AuthContextProvider>{children}</AuthContextProvider>
    </AuthErrorBoundary>
  );
}
