"use client";

import React, { useEffect } from "react";

export type ToastVariant = "info" | "success" | "warning" | "danger";

export interface ToastProps {
  variant?: ToastVariant;
  title?: string;
  message: string;
  onClose: () => void;
  duration?: number;
}

const variantStyles: Record<ToastVariant, string> = {
  info: "border-info/30 bg-info/10",
  success: "border-success/30 bg-success/10",
  warning: "border-warning/30 bg-warning/10",
  danger: "border-danger/30 bg-danger/10",
};

export function Toast({
  variant = "info",
  title,
  message,
  onClose,
  duration = 5000,
}: ToastProps) {
  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(onClose, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  return (
    <div
      className={`
        fixed bottom-4 right-4 z-50 w-full max-w-sm rounded-lg border p-4 shadow-lg animate-slide-up
        ${variantStyles[variant]}
      `}
      role="alert"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1">
          {title && (
            <div className="mb-1 font-medium text-foreground">{title}</div>
          )}
          <div className="text-sm text-foreground/90">{message}</div>
        </div>
        <button
          onClick={onClose}
          className="rounded-md p-1 text-muted-foreground hover:text-foreground transition-colors"
          aria-label="Close notification"
        >
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
}
