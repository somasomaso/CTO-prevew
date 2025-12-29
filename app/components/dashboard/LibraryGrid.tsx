"use client";

import React, { useMemo, useState } from "react";
import {
  DotsThree,
  Plus,
  Code,
  Database,
  Palette,
  Cloud,
  Robot,
  Book,
} from "@phosphor-icons/react";
import { ProgressBar } from "../ui/ProgressBar";

export type LibraryFilter = "all" | "in-progress" | "completed";

export interface LibraryCourse {
  id: string;
  title: string;
  category: string;
  progress: number;
  totalLessons: number;
  completedLessons: number;
  icon: React.ReactNode;
  accent: "purple" | "blue" | "cyan" | "pink";
}

export interface LibraryGridProps {
  courses?: LibraryCourse[];
  onAddCourse?: () => void;
}

export function LibraryGrid({ courses, onAddCourse }: LibraryGridProps) {
  const [filter, setFilter] = useState<LibraryFilter>("all");
  const [sort, setSort] = useState<"recent" | "progress">("recent");

  const defaultCourses: LibraryCourse[] = [
    {
      id: "1",
      title: "TypeScript Fundamentals",
      category: "Backend",
      progress: 85,
      totalLessons: 10,
      completedLessons: 8,
      icon: <Code weight="fill" />,
      accent: "blue",
    },
    {
      id: "2",
      title: "Database Design",
      category: "Data",
      progress: 45,
      totalLessons: 8,
      completedLessons: 3,
      icon: <Database weight="fill" />,
      accent: "cyan",
    },
    {
      id: "3",
      title: "UI/UX Design Principles",
      category: "Design",
      progress: 100,
      totalLessons: 6,
      completedLessons: 6,
      icon: <Palette weight="fill" />,
      accent: "pink",
    },
    {
      id: "4",
      title: "Cloud Architecture",
      category: "DevOps",
      progress: 60,
      totalLessons: 9,
      completedLessons: 5,
      icon: <Cloud weight="fill" />,
      accent: "purple",
    },
    {
      id: "5",
      title: "Machine Learning Basics",
      category: "AI",
      progress: 20,
      totalLessons: 15,
      completedLessons: 3,
      icon: <Robot weight="fill" />,
      accent: "cyan",
    },
  ];

  const allCourses = courses ?? defaultCourses;

  const filteredCourses = useMemo(() => {
    const base = allCourses.filter((course) => {
      if (filter === "in-progress") return course.progress > 0 && course.progress < 100;
      if (filter === "completed") return course.progress === 100;
      return true;
    });

    if (sort === "progress") {
      return [...base].sort((a, b) => b.progress - a.progress);
    }

    return base;
  }, [allCourses, filter, sort]);

  const filters: Array<{ id: LibraryFilter; label: string }> = [
    { id: "all", label: "All" },
    { id: "in-progress", label: "In progress" },
    { id: "completed", label: "Completed" },
  ];

  const accentBadge: Record<LibraryCourse["accent"], string> = {
    purple:
      "bg-neon-purple/15 text-neon-purple shadow-[0_0_22px_rgba(168,85,247,0.25)]",
    blue: "bg-neon-blue/15 text-neon-blue shadow-[0_0_22px_rgba(59,130,246,0.22)]",
    cyan: "bg-neon-cyan/15 text-neon-cyan shadow-[0_0_22px_rgba(6,182,212,0.18)]",
    pink: "bg-neon-pink/15 text-neon-pink shadow-[0_0_22px_rgba(236,72,153,0.18)]",
  };

  const accentProgress: Record<LibraryCourse["accent"], string> = {
    purple: "from-neon-purple via-neon-blue to-neon-cyan",
    blue: "from-neon-blue via-neon-cyan to-neon-purple",
    cyan: "from-neon-cyan via-neon-blue to-neon-purple",
    pink: "from-neon-pink via-neon-purple to-neon-blue",
  };

  return (
    <section className="animate-slide-up" style={{ animationDelay: "100ms" }}>
      <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-white/5 text-white">
              <Book weight="fill" />
            </div>
            <h2 className="text-2xl font-bold tracking-tight text-white">Your Library</h2>
          </div>
          <p className="mt-1 text-sm text-white/60">Pick up where you left off.</p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="flex gap-2">
            {filters.map((f) => (
              <button
                key={f.id}
                type="button"
                onClick={() => setFilter(f.id)}
                className={
                  "glass-hover min-h-12 rounded-2xl px-4 text-sm font-semibold focus-visible:ring-2 focus-visible:ring-neon-purple " +
                  (filter === f.id
                    ? "glass-active bg-gradient-to-r from-neon-purple/15 to-neon-blue/15 text-white"
                    : "glass bg-white/0 text-white/70 hover:text-white")
                }
                data-active={filter === f.id}
              >
                {f.label}
              </button>
            ))}
          </div>

          <label className="glass flex min-h-12 items-center gap-2 rounded-2xl px-4 text-sm text-white/70">
            <span className="hidden sm:inline">Sort</span>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as typeof sort)}
              className="bg-transparent text-sm font-semibold text-white outline-none"
              aria-label="Sort courses"
            >
              <option value="recent">Recent</option>
              <option value="progress">Progress</option>
            </select>
          </label>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-5 lg:grid-cols-4">
        <button
          type="button"
          onClick={onAddCourse}
          className="glass glass-hover group flex min-h-[220px] flex-col items-center justify-center gap-3 rounded-3xl border border-dashed border-white/15 bg-white/0 p-6 text-left text-white/70 hover:text-white focus-visible:ring-2 focus-visible:ring-neon-blue"
        >
          <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/5 text-white">
            <Plus weight="bold" />
          </span>
          <div className="text-base font-semibold">Add course</div>
          <div className="text-sm text-white/50">Import a new learning path</div>
        </button>

        {filteredCourses.map((course) => (
          <article
            key={course.id}
            className="glass glass-hover group relative min-h-[220px] overflow-hidden rounded-3xl p-5"
          >
            <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(168,85,247,0.14),transparent_60%)]" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,_rgba(59,130,246,0.12),transparent_60%)]" />
            </div>

            <div className="relative z-10 flex h-full flex-col">
              <div className="flex items-start justify-between">
                <div
                  className={
                    "flex h-11 w-11 items-center justify-center rounded-2xl " +
                    accentBadge[course.accent]
                  }
                >
                  <span className="text-lg">{course.icon}</span>
                </div>

                <button
                  type="button"
                  className="glass-hover flex h-10 w-10 items-center justify-center rounded-2xl text-white/70 hover:text-white"
                  aria-label="Course options"
                >
                  <DotsThree weight="bold" />
                </button>
              </div>

              <div className="mt-4">
                <h3 className="line-clamp-1 text-base font-semibold text-white">
                  {course.title}
                </h3>
                <p className="mt-1 text-sm text-white/60">{course.category}</p>
              </div>

              <div className="mt-4">
                <div className="mb-2 flex items-center justify-between text-xs text-white/60">
                  <span>
                    {course.completedLessons}/{course.totalLessons} lessons
                  </span>
                  <span className="font-semibold text-white">{course.progress}%</span>
                </div>
                <ProgressBar
                  value={course.progress}
                  trackClassName="h-2 bg-white/10"
                  barClassName={`bg-gradient-to-r ${accentProgress[course.accent]} shadow-neon-purple`}
                />
              </div>

              <button
                type="button"
                className="glass-hover mt-auto inline-flex min-h-12 items-center justify-center rounded-2xl bg-white/5 px-4 text-sm font-semibold text-white hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-neon-purple"
              >
                {course.progress === 0
                  ? "Start"
                  : course.progress === 100
                    ? "Review"
                    : "Continue"}
              </button>
            </div>

            {course.progress === 100 && (
              <div className="absolute right-4 top-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-neon-cyan to-neon-blue shadow-neon-blue">
                  <span className="text-xs font-bold text-white">✓</span>
                </div>
              </div>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}
