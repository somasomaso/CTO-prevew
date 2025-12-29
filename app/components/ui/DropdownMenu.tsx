"use client";

import React, { useEffect, useRef, useState } from "react";

export interface DropdownMenuItem {
  label: string;
  onClick: () => void;
  disabled?: boolean;
  destructive?: boolean;
}

export interface DropdownMenuProps {
  trigger: React.ReactNode;
  items: DropdownMenuItem[];
  align?: "start" | "end";
}

export function DropdownMenu({ trigger, items, align = "end" }: DropdownMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="rounded-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        type="button"
      >
        {trigger}
      </button>
      {isOpen && (
        <div
          className={`
            absolute z-50 mt-2 w-48 rounded-lg border border-border bg-surface shadow-lg animate-slide-up
            ${align === "end" ? "right-0" : "left-0"}
          `}
          role="menu"
        >
          <div className="py-1">
            {items.map((item, index) => (
              <button
                key={index}
                onClick={() => {
                  if (!item.disabled) {
                    item.onClick();
                    setIsOpen(false);
                  }
                }}
                disabled={item.disabled}
                className={`
                  flex w-full items-center px-4 py-2 text-sm text-left
                  transition-colors duration-150
                  disabled:opacity-50 disabled:cursor-not-allowed
                  ${
                    item.destructive
                      ? "text-danger hover:bg-danger/10"
                      : "text-foreground hover:bg-muted"
                  }
                `}
                role="menuitem"
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
