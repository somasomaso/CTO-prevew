import type { Metadata } from "next";
import { Footer, Navbar } from "./components/layout";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "EduPlatform",
    template: "%s · EduPlatform",
  },
  description:
    "Interactive educational modules with a minimalist, accessible design system.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className="h-full antialiased">
        <div className="flex min-h-screen flex-col">
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
