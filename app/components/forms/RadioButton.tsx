"use client";

import React from "react";

export interface RadioButtonProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: string;
  error?: string;
}

export const RadioButton = React.forwardRef<HTMLInputElement, RadioButtonProps>(
  ({ label, error, className = "", id, disabled, ...props }, ref) => {
    const autoId = React.useId();
    const radioId = id ?? autoId;

    return (
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <input
            ref={ref}
            type="radio"
            id={radioId}
            disabled={disabled}
            className={`
              h-4 w-4 shrink-0 border-border bg-background
              transition-colors duration-150
              focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2
              disabled:cursor-not-allowed disabled:opacity-50
              accent-primary
              ${className}
            `}
            {...props}
          />
          {label && (
            <label
              htmlFor={radioId}
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

RadioButton.displayName = "RadioButton";
