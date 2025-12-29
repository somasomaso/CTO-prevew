"use client";

import React from "react";

export interface CheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: string;
  error?: string;
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, error, className = "", id, disabled, ...props }, ref) => {
    const autoId = React.useId();
    const checkboxId = id ?? autoId;
    const hasError = !!error;

    return (
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <input
            ref={ref}
            type="checkbox"
            id={checkboxId}
            disabled={disabled}
            className={`
              h-4 w-4 shrink-0 rounded border bg-background
              transition-colors duration-150
              focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2
              disabled:cursor-not-allowed disabled:opacity-50
              checked:bg-primary checked:border-primary
              ${hasError ? "border-danger" : "border-border"}
              ${className}
            `}
            {...props}
          />
          {label && (
            <label
              htmlFor={checkboxId}
              className="text-sm font-medium leading-none text-foreground cursor-pointer select-none"
            >
              {label}
            </label>
          )}
        </div>
        {error && <p className="text-sm text-danger">{error}</p>}
      </div>
    );
  }
);

Checkbox.displayName = "Checkbox";
