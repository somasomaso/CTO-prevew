"use client";

import React from "react";
import { Play, ArrowRight } from "@phosphor-icons/react";
import { ProgressBar } from "../ui/ProgressBar";

export interface ContinueCourse {
  title: string;
  description: string;
  category: string;
  progress: number;
  currentLesson?: string;
  nextLesson?: string;
}

export interface HeroSectionProps {
  course?: ContinueCourse;
  onResume?: () => void;
  onViewCourse?: () => void;
}

export function HeroSection({ course, onResume, onViewCourse }: HeroSectionProps) {
  const currentCourse: ContinueCourse =
    course ??
    ({
      title: "Advanced React Patterns",
      description: "Build resilient UI systems with hooks, composition, and state machines.",
      category: "Frontend Development",
      progress: 67,
      currentLesson: "Custom Hooks Deep Dive",
      nextLesson: "Context API Mastery",
    } satisfies ContinueCourse);

  return (
    <section className="animate-slide-up">
      <div className="group relative rounded-4xl bg-gradient-to-r from-neon-purple/60 via-neon-cyan/30 to-neon-blue/60 p-[1px] shadow-neon-glow transition-shadow duration-300 hover:shadow-neon-blue">
        <div className="light-leak glass-strong relative overflow-hidden rounded-4xl p-6 md:p-8">
          <div className="relative z-10 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/5 px-4 py-1.5 text-xs font-semibold tracking-wider text-white/80">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-neon-purple opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-neon-purple" />
                </span>
                <span className="gradient-text uppercase">Continue Learning</span>
              </div>

              <h2 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
                {currentCourse.title}
              </h2>
              <p className="mt-2 text-sm text-white/70 md:text-base">
                {currentCourse.description}
              </p>

              <div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-white/60">
                <span className="glass rounded-full px-3 py-1">
                  {currentCourse.category}
                </span>
                {currentCourse.currentLesson && (
                  <span className="glass rounded-full px-3 py-1">
                    Now: {currentCourse.currentLesson}
                  </span>
                )}
              </div>

              <div className="mt-6 max-w-xl">
                <div className="mb-2 flex items-center justify-between text-sm">
                  <span className="text-white/60">Progress</span>
                  <span className="font-semibold text-white">{currentCourse.progress}%</span>
                </div>
                <ProgressBar
                  value={currentCourse.progress}
                  className="gap-2"
                  trackClassName="h-2.5 bg-white/10"
                  barClassName="bg-gradient-to-r from-neon-purple via-neon-cyan to-neon-blue shadow-neon-purple"
                />
              </div>

              {currentCourse.nextLesson && (
                <p className="mt-4 text-sm text-white/60">
                  Up next: <span className="font-medium text-white">{currentCourse.nextLesson}</span>
                </p>
              )}
            </div>

            <div className="flex w-full flex-col gap-3 sm:flex-row lg:w-auto lg:flex-col">
              <button
                type="button"
                onClick={onResume}
                className="glass-hover inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-neon-purple to-neon-blue px-5 py-3 text-sm font-semibold text-white shadow-neon-purple transition-all duration-300 hover:scale-[1.03] focus-visible:ring-2 focus-visible:ring-neon-purple"
              >
                <span className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-white/10">
                  <Play weight="fill" className="h-5 w-5" />
                </span>
                <span>Resume</span>
              </button>

              <button
                type="button"
                onClick={onViewCourse}
                className="glass-hover inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl bg-white/5 px-5 py-3 text-sm font-semibold text-white/85 transition-colors hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-neon-blue"
              >
                View course
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-neon-purple/25 blur-[120px] transition-opacity duration-500 group-hover:opacity-90" />
          <div className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-neon-blue/20 blur-[120px] transition-opacity duration-500 group-hover:opacity-90" />
        </div>
      </div>
    </section>
  );
}
