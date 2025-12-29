"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  House,
  MagnifyingGlass,
  Sparkle,
  UsersThree,
  SignOut,
  BookOpen,
} from "@phosphor-icons/react";

export interface SidebarUser {
  name: string;
  email?: string;
  initials?: string;
  isOnline?: boolean;
}

export interface SidebarNavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
}

export interface SidebarProps {
  user?: SidebarUser;
  navItems?: SidebarNavItem[];
  onSignOut?: () => void;
}

function getInitials(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  const [a, b] = parts;
  return `${a?.[0] ?? ""}${b?.[0] ?? ""}`.toUpperCase();
}

export function Sidebar({ user, navItems, onSignOut }: SidebarProps) {
  const pathname = usePathname();

  const safeUser: SidebarUser = {
    name: user?.name ?? "Alex Johnson",
    email: user?.email ?? "alex@lumina.learning",
    initials: user?.initials ?? getInitials(user?.name ?? "Alex Johnson"),
    isOnline: user?.isOnline ?? true,
  };

  const items: SidebarNavItem[] =
    navItems ??
    [
      { label: "Dashboard", href: "/dashboard", icon: <House /> },
      { label: "Search", href: "/search", icon: <MagnifyingGlass /> },
      { label: "AI Tools", href: "/ai", icon: <Sparkle weight="fill" /> },
      { label: "Community", href: "/community", icon: <UsersThree /> },
    ];

  return (
    <aside className="glass-strong fixed inset-y-0 left-0 z-40 flex h-screen w-20 border-r border-white/10 md:w-64">
      <div className="flex w-20 flex-col px-3 py-6 md:w-64 md:px-4">
        <div className="mb-6 flex items-center justify-center md:justify-start">
          <Link
            href="/dashboard"
            className="group flex items-center gap-3 rounded-2xl px-2 py-1.5 transition-colors hover:bg-white/5"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-neon-purple to-neon-blue shadow-neon-purple">
              <BookOpen className="h-6 w-6 text-white" weight="fill" />
            </div>
            <div className="hidden md:block">
              <div className="text-sm font-semibold tracking-tight text-white">
                Lumina
              </div>
              <div className="text-xs text-white/60">Learning</div>
            </div>
          </Link>
        </div>

        <nav className="flex flex-1 flex-col gap-2">
          {items.map((item) => {
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive ? "page" : undefined}
                className={
                  "glass glass-active glass-hover group flex items-center gap-3 rounded-2xl px-3 py-3 text-sm font-medium transition-colors focus-visible:ring-2 focus-visible:ring-neon-purple " +
                  (isActive
                    ? "text-white"
                    : "text-white/70 hover:text-white")
                }
              >
                <span className="flex h-6 w-6 items-center justify-center text-white/80 group-hover:text-white">
                  {item.icon}
                </span>
                <span className="hidden md:block">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="mt-6 border-t border-white/10 pt-4">
          <div className="flex items-center gap-3 rounded-2xl px-3 py-3">
            <div className="relative">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-neon-purple/30 to-neon-blue/30 text-sm font-semibold text-white">
                {safeUser.initials}
              </div>
              {safeUser.isOnline && (
                <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-[#050505] bg-neon-cyan" />
              )}
            </div>

            <div className="hidden flex-1 md:block">
              <div className="text-sm font-semibold text-white">
                {safeUser.name}
              </div>
              <div className="text-xs text-white/60">{safeUser.email}</div>
            </div>
          </div>

          <button
            type="button"
            onClick={onSignOut}
            className="glass glass-hover mt-2 flex w-full items-center gap-3 rounded-2xl px-3 py-3 text-sm font-medium text-white/70 hover:text-white"
          >
            <span className="flex h-6 w-6 items-center justify-center">
              <SignOut />
            </span>
            <span className="hidden md:block">Sign out</span>
          </button>
        </div>
      </div>
    </aside>
  );
}
