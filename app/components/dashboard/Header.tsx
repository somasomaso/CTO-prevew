"use client";

import React from "react";
import { Fire, CheckCircle, Timer } from "@phosphor-icons/react";

export interface DashboardStats {
  streakDays: number;
  modulesCompleted: number;
  timeSpent: string;
}

export interface HeaderProps {
  userName?: string;
  stats?: DashboardStats;
}

interface StatBadgeProps {
  icon: React.ReactNode;
  value: string;
  label: string;
  accent: "purple" | "blue" | "cyan";
}

function StatBadge({ icon, value, label, accent }: StatBadgeProps) {
  const accentClasses: Record<StatBadgeProps["accent"], string> = {
    purple: "from-neon-purple/20 to-neon-purple/5 border-neon-purple/25",
    blue: "from-neon-blue/20 to-neon-blue/5 border-neon-blue/25",
    cyan: "from-neon-cyan/20 to-neon-cyan/5 border-neon-cyan/25",
  };

  const iconClasses: Record<StatBadgeProps["accent"], string> = {
    purple: "text-neon-purple",
    blue: "text-neon-blue",
    cyan: "text-neon-cyan",
  };

  return (
    <div
      className={
        "glass glass-hover flex min-h-[56px] items-center gap-3 rounded-2xl border bg-gradient-to-br px-4 py-3 " +
        accentClasses[accent]
      }
    >
      <div className={"flex h-9 w-9 items-center justify-center rounded-xl bg-white/5 " + iconClasses[accent]}>
        {icon}
      </div>
      <div>
        <div className="text-sm font-semibold text-white">{value}</div>
        <div className="text-xs text-white/60">{label}</div>
      </div>
    </div>
  );
}

export function Header({ userName = "Alex", stats }: HeaderProps) {
  const safeStats: DashboardStats =
    stats ?? ({ streakDays: 12, modulesCompleted: 47, timeSpent: "24h" } satisfies DashboardStats);

  return (
    <header className="animate-fade-in-down">
      <div className="glass rounded-3xl p-5 md:p-6">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
              <span className="gradient-text">Welcome back, {userName}</span>
            </h1>
            <p className="mt-1 text-sm text-white/60 md:text-base">
              Ready to continue your learning journey?
            </p>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            <StatBadge
              icon={<Fire weight="fill" />}
              value={`${safeStats.streakDays} days`}
              label="Streak"
              accent="purple"
            />
            <StatBadge
              icon={<CheckCircle weight="fill" />}
              value={`${safeStats.modulesCompleted}`}
              label="Modules completed"
              accent="blue"
            />
            <StatBadge
              icon={<Timer weight="fill" />}
              value={safeStats.timeSpent}
              label="Time spent"
              accent="cyan"
            />
          </div>
        </div>
      </div>
    </header>
  );
}
