import React from "react";

export interface ProgressBarProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number;
  max?: number;
  showLabel?: boolean;
  trackClassName?: string;
  barClassName?: string;
}

export function ProgressBar({
  value,
  max = 100,
  showLabel = false,
  trackClassName,
  barClassName,
  className = "",
  ...props
}: ProgressBarProps) {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));

  return (
    <div className={`flex flex-col gap-2 ${className}`} {...props}>
      {showLabel && (
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span>Progress</span>
          <span>{Math.round(percentage)}%</span>
        </div>
      )}
      <div
        className={`h-2 w-full overflow-hidden rounded-full ${trackClassName ?? "bg-muted"}`}
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={max}
      >
        <div
          className={`h-full rounded-full transition-all duration-300 ${barClassName ?? "bg-primary"}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
