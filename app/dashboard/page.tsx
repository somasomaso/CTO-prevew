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
import { House, UploadSimple, ShieldStar } from "@phosphor-icons/react";
import { ProtectedRoute } from "../components/ProtectedRoute";
import { useAuth } from "../context/AuthContext";

export default function UserDashboard() {
  const { user, logout, hasRole } = useAuth();

  const isContributor = hasRole("contributor") || hasRole("moderator") || hasRole("admin");
  const isAdmin = hasRole("admin");

  const navItems = [
    { label: "Dashboard", href: "/dashboard", icon: <House /> },
    ...(isContributor ? [{ label: "Upload", href: "/upload", icon: <UploadSimple /> }] : []),
    ...(isAdmin ? [{ label: "Admin", href: "/admin", icon: <ShieldStar /> }] : []),
  ];

  return (
    <ProtectedRoute>
      <div className="relative h-screen overflow-hidden bg-dark-900">
      <div className="pointer-events-none absolute inset-0 bg-neon-glow opacity-35" />
      <div className="ambient-orb ambient-orb-purple -top-24 left-1/3 h-[520px] w-[520px] animate-float" />
      <div className="ambient-orb ambient-orb-blue bottom-[-180px] left-[-120px] h-[520px] w-[520px] animate-float" />
      <div className="ambient-orb ambient-orb-cyan -right-36 top-1/2 h-[420px] w-[420px] animate-float" />

      <Sidebar
        user={{
          name: user?.username || "User",
          email: user?.email,
        }}
        navItems={navItems}
        onSignOut={() => {
          void logout();
        }}
      />

      <main className="relative z-10 h-screen overflow-y-auto pl-20 md:pl-64">
        <div className="mx-auto flex min-h-full w-full max-w-7xl flex-col gap-6 p-4 md:p-6 lg:p-8">
          <Header userName={user?.username || "User"} />

          <HeroSection />

          <LibraryGrid />

          <div className="mt-auto pt-6">
            <Footer />
          </div>
        </div>
      </main>

      <FloatingActionButton />
      </div>
    </ProtectedRoute>
  );
}
