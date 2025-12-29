"use client";

import React from "react";
import {
  Sidebar,
  Header,
  HeroSection,
  LibraryGrid,
  Footer,
  FloatingActionButton,
} from "../components/dashboard";

export default function UserDashboard() {
  return (
    <div className="relative h-screen overflow-hidden bg-dark-900">
      <div className="pointer-events-none absolute inset-0 bg-neon-glow opacity-35" />
      <div className="ambient-orb ambient-orb-purple -top-24 left-1/3 h-[520px] w-[520px] animate-float" />
      <div className="ambient-orb ambient-orb-blue bottom-[-180px] left-[-120px] h-[520px] w-[520px] animate-float" />
      <div className="ambient-orb ambient-orb-cyan -right-36 top-1/2 h-[420px] w-[420px] animate-float" />

      <Sidebar />

      <main className="relative z-10 h-screen overflow-y-auto pl-20 md:pl-64">
        <div className="mx-auto flex min-h-full w-full max-w-7xl flex-col gap-6 p-4 md:p-6 lg:p-8">
          <Header userName="Alex" />

          <HeroSection />

          <LibraryGrid />

          <div className="mt-auto pt-6">
            <Footer />
          </div>
        </div>
      </main>

      <FloatingActionButton />
    </div>
  );
}
