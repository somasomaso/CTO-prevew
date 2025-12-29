"use client";

import React, { useState } from "react";
import { Eye, EyeSlash } from "@phosphor-icons/react";
import { Input, type InputProps } from "./Input";

export interface PasswordInputProps extends Omit<InputProps, 'type' | 'rightIcon'> {
  showStrength?: boolean;
}

export const PasswordInput = React.forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ showStrength = false, value, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);
    
    const getPasswordStrength = (password: string): { strength: string; color: string; width: string } => {
      if (!password) return { strength: '', color: '', width: '0%' };
      
      const length = password.length;
      const hasLower = /[a-z]/.test(password);
      const hasUpper = /[A-Z]/.test(password);
      const hasNumber = /\d/.test(password);
      const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);
      
      const score = 
        (length >= 8 ? 1 : 0) +
        (hasLower ? 1 : 0) +
        (hasUpper ? 1 : 0) +
        (hasNumber ? 1 : 0) +
        (hasSpecial ? 1 : 0);
      
      if (score <= 2) {
        return { strength: 'Weak', color: 'bg-danger', width: '33%' };
      } else if (score <= 4) {
        return { strength: 'Medium', color: 'bg-warning', width: '66%' };
      } else {
        return { strength: 'Strong', color: 'bg-success', width: '100%' };
      }
    };
    
    const strength = showStrength && value ? getPasswordStrength(String(value)) : null;
    
    const toggleIcon = (
      <button
        type="button"
        onClick={() => setShowPassword(!showPassword)}
        className="cursor-pointer text-muted-foreground hover:text-foreground transition-colors"
        tabIndex={-1}
      >
        {showPassword ? <EyeSlash size={20} /> : <Eye size={20} />}
      </button>
    );

    return (
      <div className="flex flex-col gap-2">
        <Input
          {...props}
          ref={ref}
          type={showPassword ? 'text' : 'password'}
          value={value}
          rightIcon={toggleIcon}
        />
        
        {strength && strength.strength && (
          <div className="space-y-1">
            <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
              <div
                className={`h-full ${strength.color} transition-all duration-300`}
                style={{ width: strength.width }}
              />
            </div>
            <p className="text-xs text-muted-foreground">
              Password strength: <span className="font-medium">{strength.strength}</span>
            </p>
          </div>
        )}
      </div>
    );
  }
);

PasswordInput.displayName = "PasswordInput";
