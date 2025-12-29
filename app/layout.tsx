import type { Metadata } from "next";
import React from "react";
import "./globals.css";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: {
    default: "Lumina Learning",
    template: "%s · Lumina Learning",
  },
  description:
    "Lumina Learning dashboard UI with a glassmorphism design system, neon accents, and micro-interactions.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full dark" suppressHydrationWarning>
      <body className="h-full antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
