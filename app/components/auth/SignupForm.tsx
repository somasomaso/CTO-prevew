"use client";

import React, { useState } from "react";
import Link from "next/link";
import { EnvelopeSimple, User, Lock } from "@phosphor-icons/react";
import { useAuth } from "@/app/context/AuthContext";
import { Input } from "../forms/Input";
import { PasswordInput } from "../forms/PasswordInput";
import { Checkbox } from "../forms/Checkbox";
import { FormButton } from "../forms/FormButton";
import { FormError } from "../forms/FormError";

export function SignupForm() {
  const { signup, loading, error, clearError } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
    acceptTerms: false,
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const validatePassword = (password: string): string | null => {
    if (password.length < 8) return "Password must be at least 8 characters";
    if (!/[A-Z]/.test(password)) return "Password must contain at least one uppercase letter";
    if (!/\d/.test(password)) return "Password must contain at least one number";
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) return "Password must contain at least one special character";
    return null;
  };

  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};

    if (!formData.email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Please enter a valid email address";
    }

    if (!formData.username) {
      errors.username = "Username is required";
    } else if (formData.username.length < 3 || formData.username.length > 20) {
      errors.username = "Username must be 3-20 characters";
    } else if (!/^[a-zA-Z0-9_]+$/.test(formData.username)) {
      errors.username = "Username can only contain letters, numbers, and underscores";
    }

    if (!formData.password) {
      errors.password = "Password is required";
    } else {
      const passwordError = validatePassword(formData.password);
      if (passwordError) {
        errors.password = passwordError;
      }
    }

    if (!formData.confirmPassword) {
      errors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }

    if (!formData.acceptTerms) {
      errors.acceptTerms = "You must accept the terms and conditions";
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

    await signup({
      email: formData.email,
      username: formData.username,
      password: formData.password,
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

      <Input
        label="Username"
        type="text"
        placeholder="Choose a username"
        value={formData.username}
        onChange={(e) => handleChange("username", e.target.value)}
        error={formErrors.username}
        leftIcon={<User size={20} />}
        disabled={loading}
        autoComplete="username"
        required
      />

      <PasswordInput
        label="Password"
        placeholder="Create a password"
        value={formData.password}
        onChange={(e) => handleChange("password", e.target.value)}
        error={formErrors.password}
        leftIcon={<Lock size={20} />}
        disabled={loading}
        showStrength
        autoComplete="new-password"
        required
      />

      <PasswordInput
        label="Confirm password"
        placeholder="Confirm your password"
        value={formData.confirmPassword}
        onChange={(e) => handleChange("confirmPassword", e.target.value)}
        error={formErrors.confirmPassword}
        leftIcon={<Lock size={20} />}
        disabled={loading}
        autoComplete="new-password"
        required
      />

      <Checkbox
        label="I agree to the Terms & Conditions"
        checked={formData.acceptTerms}
        onChange={(e) => handleChange("acceptTerms", e.target.checked)}
        error={formErrors.acceptTerms}
        disabled={loading}
        required
      />

      <FormButton type="submit" loading={loading}>
        {loading ? "Creating account..." : "Create account"}
      </FormButton>

      <p className="text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link
          href="/login"
          className="font-medium text-purple-400 hover:text-purple-300 transition-colors"
        >
          Sign in
        </Link>
      </p>
    </form>
  );
}
