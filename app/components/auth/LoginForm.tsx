"use client";

import React, { useState } from "react";
import Link from "next/link";
import { EnvelopeSimple, Lock } from "@phosphor-icons/react";
import { useAuth } from "@/app/context/AuthContext";
import { Input } from "../forms/Input";
import { PasswordInput } from "../forms/PasswordInput";
import { Checkbox } from "../forms/Checkbox";
import { FormButton } from "../forms/FormButton";
import { FormError } from "../forms/FormError";

export function LoginForm() {
  const { login, loading, error, clearError } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};

    if (!formData.email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Please enter a valid email address";
    }

    if (!formData.password) {
      errors.password = "Password is required";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();
    
    if (!validateForm()) {
      return;
    }

    await login({
      email: formData.email,
      password: formData.password,
      rememberMe: formData.rememberMe,
    });
  };

  const handleChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (formErrors[field]) {
      setFormErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
    clearError();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <FormError message={error} />

      <Input
        label="Email"
        type="email"
        placeholder="Enter your email"
        value={formData.email}
        onChange={(e) => handleChange("email", e.target.value)}
        error={formErrors.email}
        leftIcon={<EnvelopeSimple size={20} />}
        disabled={loading}
        autoComplete="email"
        required
      />

      <PasswordInput
        label="Password"
        placeholder="Enter your password"
        value={formData.password}
        onChange={(e) => handleChange("password", e.target.value)}
        error={formErrors.password}
        leftIcon={<Lock size={20} />}
        disabled={loading}
        autoComplete="current-password"
        required
      />

      <div className="flex items-center justify-between">
        <Checkbox
          label="Remember me"
          checked={formData.rememberMe}
          onChange={(e) => handleChange("rememberMe", e.target.checked)}
          disabled={loading}
        />
      </div>

      <FormButton type="submit" loading={loading}>
        {loading ? "Signing in..." : "Sign in"}
      </FormButton>

      <p className="text-center text-sm text-muted-foreground">
        Don&apos;t have an account?{" "}
        <Link
          href="/signup"
          className="font-medium text-purple-400 hover:text-purple-300 transition-colors"
        >
          Sign up
        </Link>
      </p>
    </form>
  );
}
