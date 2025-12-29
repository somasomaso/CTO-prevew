import React from "react";
import Link from "next/link";

export interface DashboardFooterProps {
  links?: Array<{ label: string; href: string }>;
}

export function Footer({
  links = [
    { label: "Privacy", href: "#" },
    { label: "Terms", href: "#" },
    { label: "Support", href: "#" },
  ],
}: DashboardFooterProps) {
  return (
    <footer className="glass rounded-3xl px-5 py-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="text-sm text-white/60">
          © {new Date().getFullYear()} Lumina Learning
        </div>
        <div className="flex flex-wrap items-center gap-4 text-sm">
          {links.map((l) => (
            <Link
              key={l.label}
              href={l.href}
              className="text-white/60 transition-colors hover:text-white focus-visible:ring-2 focus-visible:ring-neon-purple"
            >
              {l.label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
