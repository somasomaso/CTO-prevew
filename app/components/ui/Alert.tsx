import React from "react";

export type AlertVariant = "info" | "success" | "warning" | "danger";

export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: AlertVariant;
  title?: string;
}

const variantStyles: Record<AlertVariant, string> = {
  info: "border-info/30 bg-info/10 text-foreground",
  success: "border-success/30 bg-success/10 text-foreground",
  warning: "border-warning/30 bg-warning/10 text-foreground",
  danger: "border-danger/30 bg-danger/10 text-foreground",
};

export function Alert({
  variant = "info",
  title,
  className = "",
  children,
  ...props
}: AlertProps) {
  return (
    <div
      role="alert"
      className={`rounded-lg border px-4 py-3 text-sm ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {title && <div className="mb-1 font-medium">{title}</div>}
      <div className="text-foreground/90">{children}</div>
    </div>
  );
}
