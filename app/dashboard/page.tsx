"use client";

import React from "react";
import { Sidebar } from "../components/dashboard/Sidebar";
import { Header } from "../components/dashboard/Header";
import { HeroSection } from "../components/dashboard/HeroSection";
import { LibraryGrid } from "../components/dashboard/LibraryGrid";

export default function UserDashboard() {
  return (
    <div className="flex min-h-screen bg-background dark">
      <Sidebar />

      <main className="flex-1 overflow-auto">
        <div className="relative min-h-screen bg-gradient-to-br from-background via-[hsl(250_20%_8%)] to-[hsl(275_30%_10%)] p-4 md:p-6 lg:p-8">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-neon-purple/10 via-transparent to-transparent opacity-50" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-neon-blue/10 via-transparent to-transparent opacity-50" />
          
          <div className="relative z-10 space-y-6">
            <Header />
            
            <HeroSection />
            
            <LibraryGrid />
          </div>
        </div>
      </main>
    </div>
  );
}
