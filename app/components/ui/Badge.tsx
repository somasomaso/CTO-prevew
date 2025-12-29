import React from "react";

export type BadgeVariant = "default" | "primary" | "success" | "warning" | "danger" | "info";
export type BadgeSize = "sm" | "md";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  size?: BadgeSize;
}

const variantStyles: Record<BadgeVariant, string> = {
  default: "bg-muted text-foreground border-border",
  primary: "bg-primary text-primary-foreground border-primary",
  success: "bg-success text-success-foreground border-success",
  warning: "bg-warning text-warning-foreground border-warning",
  danger: "bg-danger text-danger-foreground border-danger",
  info: "bg-info text-info-foreground border-info",
};

const sizeStyles: Record<BadgeSize, string> = {
  sm: "text-xs px-2 py-0.5",
  md: "text-sm px-2.5 py-1",
};

export function Badge({
  variant = "default",
  size = "sm",
  className = "",
  ...props
}: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-md border font-medium transition-colors ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      {...props}
    />
  );
}
