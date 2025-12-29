import React from "react";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "elevated";
}

export function Card({
  variant = "default",
  className = "",
  ...props
}: CardProps) {
  const base =
    "rounded-lg border border-border bg-surface text-foreground transition-shadow";
  const styles =
    variant === "elevated" ? "shadow-md hover:shadow-lg" : "shadow-sm";

  return <div className={`${base} ${styles} ${className}`} {...props} />;
}

export function CardHeader({
  className = "",
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={`flex flex-col gap-1 border-b border-border px-5 py-4 ${className}`}
      {...props}
    />
  );
}

export function CardContent({
  className = "",
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={`px-5 py-4 ${className}`} {...props} />;
}

export function CardFooter({
  className = "",
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={`flex items-center justify-between gap-3 border-t border-border px-5 py-4 ${className}`}
      {...props}
    />
  );
}
