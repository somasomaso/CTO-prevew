"use client";

import React from "react";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, helperText, className = "", id, disabled, ...props }, ref) => {
    const autoId = React.useId();
    const textareaId = id ?? autoId;
    const hasError = !!error;

    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label
            htmlFor={textareaId}
            className="text-sm font-medium text-foreground"
          >
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          id={textareaId}
          disabled={disabled}
          className={`
            flex min-h-[96px] w-full rounded-md border bg-background px-3 py-2 text-base
            transition-colors duration-150
            placeholder:text-muted-foreground
            focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2
            disabled:cursor-not-allowed disabled:opacity-50
            ${hasError ? "border-danger focus-visible:ring-danger" : "border-border"}
            ${className}
          `}
          {...props}
        />
        {(error || helperText) && (
          <p className={`text-sm ${error ? "text-danger" : "text-muted-foreground"}`}>
            {error || helperText}
          </p>
        )}
      </div>
    );
  }
);

Textarea.displayName = "Textarea";
