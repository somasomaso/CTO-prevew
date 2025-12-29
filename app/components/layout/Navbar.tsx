"use client";

import React from "react";
import Link from "next/link";
import { Button } from "../ui/Button";
import { DropdownMenu } from "../ui/DropdownMenu";

export interface NavbarProps {
  title?: string;
}

export function Navbar({ title = "EduPlatform" }: NavbarProps) {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-background/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-6">
          <Link
            href="/"
            className="text-lg font-semibold tracking-tight text-foreground hover:opacity-80 transition-opacity"
          >
            {title}
          </Link>
          <nav className="hidden md:flex items-center gap-4 text-sm text-muted-foreground">
            <Link href="/design-system" className="hover:text-foreground transition-colors">
              Design System
            </Link>
            <Link href="#" className="hover:text-foreground transition-colors">
              Modules
            </Link>
            <Link href="#" className="hover:text-foreground transition-colors">
              Subjects
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden sm:block w-64">
            <input
              type="search"
              placeholder="Search modules..."
              className="h-10 w-full rounded-md border border-border bg-background px-3 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            />
          </div>

          <DropdownMenu
            trigger={
              <div className="flex items-center gap-2 rounded-md border border-border bg-surface px-3 py-2 text-sm hover:bg-muted transition-colors">
                <div className="h-6 w-6 rounded-full bg-muted" />
                <span className="hidden sm:inline">Account</span>
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            }
            items={[
              { label: "Profile", onClick: () => {} },
              { label: "Settings", onClick: () => {} },
              { label: "Sign out", onClick: () => {}, destructive: true },
            ]}
          />

          <Button variant="ghost" size="md" className="md:hidden">
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </Button>
        </div>
      </div>
    </header>
  );
}
