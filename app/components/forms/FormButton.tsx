"use client";

import React from "react";

interface FormButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
  children: React.ReactNode;
}

export function FormButton({ loading = false, disabled, children, className = "", ...props }: FormButtonProps) {
  return (
    <button
      {...props}
      disabled={disabled || loading}
      className={`
        h-12 w-full rounded-md font-medium transition-all duration-200
        bg-gradient-to-r from-purple-500 to-blue-500 text-white
        hover:from-purple-600 hover:to-blue-600
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400
        disabled:opacity-50 disabled:cursor-not-allowed
        ${className}
      `}
      aria-busy={loading}
    >
      <span className="flex items-center justify-center gap-2">
        {loading && (
          <div
            className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"
            aria-hidden="true"
          />
        )}
        {children}
      </span>
    </button>
  );
}
