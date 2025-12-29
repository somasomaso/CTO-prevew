"use client";

import React from "react";
import { WarningCircle } from "@phosphor-icons/react";

interface FormErrorProps {
  message?: string | null;
}

export function FormError({ message }: FormErrorProps) {
  if (!message) return null;

  return (
    <div className="flex items-start gap-2 rounded-md bg-danger/10 border border-danger/20 p-3 text-sm text-danger">
      <WarningCircle size={20} weight="fill" className="flex-shrink-0 mt-0.5" />
      <p>{message}</p>
    </div>
  );
}
