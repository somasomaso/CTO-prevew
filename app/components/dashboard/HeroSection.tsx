"use client";

import React from "react";
import { ProgressBar } from "../ui/ProgressBar";
import { Button } from "../ui/Button";

export function HeroSection() {
  const currentCourse = {
    title: "Advanced React Patterns",
    subject: "Frontend Development",
    progress: 67,
    currentModule: "Custom Hooks Deep Dive",
    nextModule: "Context API Mastery",
    totalModules: 12,
    completedModules: 8,
    thumbnail: (
      <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-neon-purple/30 to-neon-blue/30">
        <svg className="h-16 w-16 text-neon-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      </div>
    ),
  };

  return (
    <section className="relative overflow-hidden rounded-2xl glass-strong border border-white/10 p-6 md:p-8 animate-slide-up">
      <div className="absolute inset-0 bg-gradient-to-r from-neon-purple/10 via-neon-blue/10 to-neon-purple/10 opacity-50" />
      <div className="absolute -right-20 -top-20 h-80 w-80 rounded-full bg-neon-purple/20 blur-[100px]" />
      <div className="absolute -left-20 -bottom-20 h-80 w-80 rounded-full bg-neon-blue/20 blur-[100px]" />

      <div className="relative z-10">
        <div className="mb-6 flex items-start justify-between">
          <div className="flex-1">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-neon-purple/20 to-neon-blue/20 px-4 py-1.5 border border-neon-purple/30">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-neon-purple opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-neon-purple"></span>
              </span>
              <span className="text-xs font-medium gradient-text uppercase tracking-wider">
                Continue Learning
              </span>
            </div>
            
            <h2 className="mb-2 text-3xl font-bold text-foreground md:text-4xl">
              {currentCourse.title}
            </h2>
            <p className="mb-4 text-muted-foreground">
              {currentCourse.subject} • {currentCourse.currentModule}
            </p>
            
            <div className="mb-4 max-w-lg">
              <div className="mb-2 flex items-center justify-between text-sm">
                <span className="text-muted-foreground">
                  Module {currentCourse.completedModules} of {currentCourse.totalModules}
                </span>
                <span className="font-semibold gradient-text">
                  {currentCourse.progress}%
                </span>
              </div>
              <ProgressBar value={currentCourse.progress} />
            </div>
          </div>

          <div className="hidden md:block">
            <div className="relative h-40 w-48 overflow-hidden rounded-2xl glass-light border border-white/20">
              {currentCourse.thumbnail}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-muted-foreground">
            <span className="text-white font-medium">Up next:</span> {currentCourse.nextModule}
          </p>
          
          <div className="flex gap-3">
            <Button 
              variant="ghost" 
              className="border border-white/10 bg-white/5 text-white hover:bg-white/10"
            >
              View Course
            </Button>
            <Button 
              className="bg-gradient-to-r from-neon-purple to-neon-blue text-white shadow-neon-purple hover:shadow-neon-purple hover:scale-105 transition-all duration-300"
            >
              <svg className="mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Resume Learning
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
