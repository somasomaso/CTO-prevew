"use client";

import React, { useState } from "react";
import Link from "next/link";

export interface SidebarItem {
  id: string;
  label: string;
  href: string;
  icon?: React.ReactNode;
  children?: Omit<SidebarItem, "children">[];
}

export interface SidebarProps {
  items: SidebarItem[];
  className?: string;
}

function SidebarItemComponent({ item }: { item: SidebarItem }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const hasChildren = item.children && item.children.length > 0;

  return (
    <div>
      <div className="flex items-center">
        <Link
          href={item.href}
          className="flex flex-1 items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
        >
          {item.icon && <span className="flex-shrink-0">{item.icon}</span>}
          <span className="flex-1">{item.label}</span>
        </Link>
        {hasChildren && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-2 text-muted-foreground hover:text-foreground transition-colors"
            aria-label={isExpanded ? "Collapse" : "Expand"}
          >
            <svg
              className={`h-4 w-4 transition-transform ${isExpanded ? "rotate-90" : ""}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        )}
      </div>
      {hasChildren && isExpanded && (
        <div className="ml-6 mt-1 space-y-1 border-l border-border pl-3">
          {item.children!.map((child) => (
            <Link
              key={child.id}
              href={child.href}
              className="flex items-center gap-2 rounded-md px-3 py-1.5 text-sm text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
            >
              {child.icon && <span className="flex-shrink-0">{child.icon}</span>}
              {child.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export function Sidebar({ items, className = "" }: SidebarProps) {
  return (
    <aside
      className={`w-64 flex-shrink-0 border-r border-border bg-surface ${className}`}
    >
      <nav className="space-y-1 p-4">
        {items.map((item) => (
          <SidebarItemComponent key={item.id} item={item} />
        ))}
      </nav>
    </aside>
  );
}
