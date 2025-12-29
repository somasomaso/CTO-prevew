import type { Metadata } from "next";
import "../globals.css";

export const metadata: Metadata = {
  title: "User Dashboard",
  description: "Track your learning progress and access course materials.",
};

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark h-full">
      <body className="h-full antialiased">
        {children}
      </body>
    </html>
  );
}
