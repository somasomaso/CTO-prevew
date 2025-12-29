"use client";

import React, { useState } from "react";
import { ProgressBar } from "../ui/ProgressBar";

interface Course {
  id: string;
  title: string;
  subject: string;
  progress: number;
  totalModules: number;
  completedModules: number;
  thumbnail: React.ReactNode;
  subjectColor: "blue" | "green" | "purple" | "yellow" | "indigo" | "rose";
}

export function LibraryGrid() {
  const [filter, setFilter] = useState<"all" | "in-progress" | "completed">("all");

  const courses: Course[] = [
    {
      id: "1",
      title: "TypeScript Fundamentals",
      subject: "Backend Development",
      progress: 85,
      totalModules: 10,
      completedModules: 8,
      thumbnail: (
        <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-blue-500/30 to-cyan-500/30">
          <span className="text-2xl">TS</span>
        </div>
      ),
      subjectColor: "blue",
    },
    {
      id: "2",
      title: "Database Design",
      subject: "Data Science",
      progress: 45,
      totalModules: 8,
      completedModules: 3,
      thumbnail: (
        <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-green-500/30 to-emerald-500/30">
          <span className="text-2xl">DB</span>
        </div>
      ),
      subjectColor: "green",
    },
    {
      id: "3",
      title: "UI/UX Design Principles",
      subject: "Design",
      progress: 100,
      totalModules: 6,
      completedModules: 6,
      thumbnail: (
        <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-purple-500/30 to-pink-500/30">
          <span className="text-2xl">UX</span>
        </div>
      ),
      subjectColor: "purple",
    },
    {
      id: "4",
      title: "Python for Data Analysis",
      subject: "Data Science",
      progress: 20,
      totalModules: 12,
      completedModules: 2,
      thumbnail: (
        <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-yellow-500/30 to-orange-500/30">
          <span className="text-2xl">PY</span>
        </div>
      ),
      subjectColor: "yellow",
    },
    {
      id: "5",
      title: "Cloud Architecture",
      subject: "DevOps",
      progress: 60,
      totalModules: 9,
      completedModules: 5,
      thumbnail: (
        <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-indigo-500/30 to-blue-500/30">
          <span className="text-2xl">☁️</span>
        </div>
      ),
      subjectColor: "indigo",
    },
    {
      id: "6",
      title: "Machine Learning Basics",
      subject: "AI & ML",
      progress: 0,
      totalModules: 15,
      completedModules: 0,
      thumbnail: (
        <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-rose-500/30 to-red-500/30">
          <span className="text-2xl">🤖</span>
        </div>
      ),
      subjectColor: "rose",
    },
  ];

  const subjectColorMap: Record<Course["subjectColor"], string> = {
    blue: "linear-gradient(to right, hsl(217 91% 60% / 0.2), hsl(180 100% 50% / 0.2))",
    green: "linear-gradient(to right, hsl(142 76% 36% / 0.2), hsl(150 86% 46% / 0.2))",
    purple: "linear-gradient(to right, hsl(275 85% 65% / 0.2), hsl(330 81% 60% / 0.2))",
    yellow: "linear-gradient(to right, hsl(38 92% 50% / 0.2), hsl(24 95% 53% / 0.2))",
    indigo: "linear-gradient(to right, hsl(238 84% 67% / 0.2), hsl(217 91% 60% / 0.2))",
    rose: "linear-gradient(to right, hsl(350 89% 60% / 0.2), hsl(0 84% 60% / 0.2))",
  };

  const filteredCourses = courses.filter((course) => {
    if (filter === "in-progress") {
      return course.progress > 0 && course.progress < 100;
    }
    if (filter === "completed") {
      return course.progress === 100;
    }
    return true;
  });

  const filters = [
    { id: "all" as const, label: "All Courses" },
    { id: "in-progress" as const, label: "In Progress" },
    { id: "completed" as const, label: "Completed" },
  ];

  return (
    <section className="animate-slide-up" style={{ animationDelay: "100ms" }}>
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-foreground">
          Your Library
        </h2>
        
        <div className="flex gap-2">
          {filters.map((f) => (
            <button
              key={f.id}
              onClick={() => setFilter(f.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                filter === f.id
                  ? "bg-gradient-to-r from-neon-purple/20 to-neon-blue/20 border border-neon-purple/30 text-white shadow-neon-purple"
                  : "bg-transparent text-muted-foreground hover:bg-white/5 hover:text-white"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filteredCourses.map((course) => (
          <div
            key={course.id}
            className="group relative overflow-hidden rounded-2xl glass border border-white/10 transition-all duration-300 hover:scale-[1.02] hover:shadow-neon-purple hover:border-neon-purple/30"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-neon-purple/5 to-neon-blue/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            
            <div className="relative z-10 p-5">
              <div className="mb-4 flex h-24 w-full overflow-hidden rounded-xl glass-light">
                {course.thumbnail}
              </div>

              <div className="mb-3">
                <span 
                  className="mb-1 inline-block rounded-full px-3 py-1 text-xs font-medium text-white/90"
                  style={{
                    background: subjectColorMap[course.subjectColor]
                  }}
                >
                  {course.subject}
                </span>
                <h3 className="text-lg font-semibold text-foreground group-hover:text-white transition-colors">
                  {course.title}
                </h3>
              </div>

              <div className="mb-4">
                <div className="mb-2 flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">
                    {course.completedModules}/{course.totalModules} modules
                  </span>
                  <span className={`font-semibold ${course.progress === 100 ? "text-neon-cyan" : "text-white"}`}>
                    {course.progress}%
                  </span>
                </div>
                <ProgressBar 
                  value={course.progress} 
                  showLabel={false}
                  className="h-2"
                />
              </div>

              <button className="w-full rounded-xl bg-gradient-to-r from-white/5 to-white/10 py-2.5 text-sm font-medium text-white transition-all duration-300 hover:from-white/10 hover:to-white/15 border border-white/10 hover:border-white/20">
                {course.progress === 0 ? "Start Course" : course.progress === 100 ? "Review Course" : "Continue"}
              </button>
            </div>

            {course.progress === 100 && (
              <div className="absolute right-3 top-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-neon-cyan to-neon-blue shadow-neon-blue">
                  <svg className="h-4 w-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
