"use client";

import React from "react";
import { AuthLayout } from "@/app/components/auth/AuthLayout";
import { LoginForm } from "@/app/components/auth/LoginForm";
import { ProtectedRoute } from "@/app/components/ProtectedRoute";

export default function LoginPage() {
  return (
    <ProtectedRoute requireAuth={false}>
      <AuthLayout
        title="Welcome back"
        subtitle="Sign in to continue your learning journey"
      >
        <LoginForm />
      </AuthLayout>
    </ProtectedRoute>
  );
}
