"use client";

import React from "react";
import { AuthLayout } from "@/app/components/auth/AuthLayout";
import { SignupForm } from "@/app/components/auth/SignupForm";
import { ProtectedRoute } from "@/app/components/ProtectedRoute";

export default function SignupPage() {
  return (
    <ProtectedRoute requireAuth={false}>
      <AuthLayout
        title="Create account"
        subtitle="Join Lumina Learning and start progressing"
      >
        <SignupForm />
      </AuthLayout>
    </ProtectedRoute>
  );
}
