"use client";

import React from "react";
import { Sparkle } from "@phosphor-icons/react";

export interface FloatingActionButtonProps {
  label?: string;
  tooltip?: string;
  onClick?: () => void;
}

export function FloatingActionButton({
  label = "Ask AI Assistant",
  tooltip = "Ask AI Assistant",
  onClick,
}: FloatingActionButtonProps) {
  return (
    <div className="fixed bottom-8 right-8 z-50">
      <button
        type="button"
        onClick={onClick}
        aria-label={label}
        className="group relative flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-neon-purple to-neon-blue text-white shadow-neon-glow transition-all duration-300 hover:scale-105 focus-visible:ring-2 focus-visible:ring-neon-purple animate-pulse-glow"
      >
        <Sparkle weight="fill" className="h-6 w-6" />

        <span className="pointer-events-none absolute right-full mr-3 hidden whitespace-nowrap rounded-xl bg-black/60 px-3 py-2 text-xs font-semibold text-white opacity-0 backdrop-blur-md transition-all duration-200 group-hover:opacity-100 group-focus-visible:opacity-100 md:block">
          {tooltip}
        </span>

        <span className="pointer-events-none absolute -top-2 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-white/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <Sparkle weight="fill" className="h-3 w-3 animate-float" />
        </span>
      </button>
    </div>
  );
}
