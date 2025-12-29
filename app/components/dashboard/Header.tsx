"use client";

import React from "react";

interface StatItem {
  icon: React.ReactNode;
  value: string;
  label: string;
  color: "purple" | "blue" | "pink" | "cyan";
}

export function Header() {
  const stats: StatItem[] = [
    {
      icon: (
        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z" />
        </svg>
      ),
      value: "12",
      label: "Day Streak",
      color: "purple",
    },
    {
      icon: (
        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      value: "47",
      label: "Modules Completed",
      color: "blue",
    },
    {
      icon: (
        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
        </svg>
      ),
      value: "3,250",
      label: "XP Points",
      color: "pink",
    },
    {
      icon: (
        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      value: "24h",
      label: "Time Spent",
      color: "cyan",
    },
  ];

  const colorClasses = {
    purple: "from-neon-purple/20 to-neon-purple/5 border-neon-purple/30",
    blue: "from-neon-blue/20 to-neon-blue/5 border-neon-blue/30",
    pink: "from-neon-pink/20 to-neon-pink/5 border-neon-pink/30",
    cyan: "from-neon-cyan/20 to-neon-cyan/5 border-neon-cyan/30",
  };

  const iconColorClasses = {
    purple: "text-neon-purple",
    blue: "text-neon-blue",
    pink: "text-neon-pink",
    cyan: "text-neon-cyan",
  };

  return (
    <header className="glass rounded-2xl p-6 mb-6 animate-fade-in">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold gradient-text mb-1">
            Welcome back, Alex! 👋
          </h1>
          <p className="text-muted-foreground">
            Ready to continue your learning journey?
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:flex md:gap-4">
          {stats.map((stat, index) => (
            <div
              key={index}
              className={`flex min-w-[140px] flex-col items-center justify-center rounded-xl bg-gradient-to-br border p-4 transition-all duration-300 hover:scale-105 ${colorClasses[stat.color]}`}
            >
              <div className={`mb-2 ${iconColorClasses[stat.color]}`}>
                {stat.icon}
              </div>
              <span className="text-xl font-bold text-foreground">
                {stat.value}
              </span>
              <span className="text-xs text-muted-foreground">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </header>
  );
}
