import Link from "next/link";
import { Button } from "./components/ui/Button";
import { Card, CardHeader, CardContent } from "./components/ui/Card";
import { Container } from "./components/layout/Container";

export default function Home() {
  return (
    <div className="flex-1">
        <section className="border-b border-border bg-gradient-to-b from-muted/50 to-background py-20">
          <Container>
            <div className="mx-auto max-w-3xl text-center">
              <h1 className="mb-6 text-5xl font-bold tracking-tight">
                Interactive Educational Platform
              </h1>
              <p className="mb-8 text-xl text-muted-foreground">
                A comprehensive, minimalist design system with reusable components
                built for modern educational experiences.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4">
                <Link href="/design-system">
                  <Button size="lg">
                    Explore Design System
                  </Button>
                </Link>
                <Button variant="secondary" size="lg">
                  Browse Modules
                </Button>
              </div>
            </div>
          </Container>
        </section>

        <section className="py-20">
          <Container>
            <div className="mb-12 text-center">
              <h2 className="mb-4 text-3xl font-semibold">Key Features</h2>
              <p className="text-muted-foreground">
                Built with Next.js 16, React 19, TypeScript, and Tailwind CSS v4
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader>
                  <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    <svg
                      className="h-6 w-6 text-primary"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
                      />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold">Minimalist Design</h3>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Clean, modern UI with generous whitespace, subtle colors, and
                    elegant typography for optimal readability.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-lg bg-success/10">
                    <svg
                      className="h-6 w-6 text-success"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold">Accessible</h3>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    WCAG AA compliant with proper focus states, keyboard navigation,
                    and semantic HTML for all users.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-lg bg-info/10">
                    <svg
                      className="h-6 w-6 text-info"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold">Fully Responsive</h3>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Mobile-first approach with breakpoints optimized for all devices
                    from smartphones to large displays.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-lg bg-warning/10">
                    <svg
                      className="h-6 w-6 text-warning"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold">High Performance</h3>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Optimized animations, efficient rendering, and respects
                    prefers-reduced-motion for smooth experiences.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-lg bg-subject-math/10">
                    <svg
                      className="h-6 w-6 text-subject-math"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                      />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold">TypeScript First</h3>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Fully typed components with comprehensive prop interfaces for
                    better developer experience and fewer bugs.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-lg bg-subject-arts/10">
                    <svg
                      className="h-6 w-6 text-subject-arts"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
                      />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold">Design Tokens</h3>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Centralized design tokens for colors, typography, spacing, and
                    more with CSS custom properties and dark mode support.
                  </p>
                </CardContent>
              </Card>
            </div>
          </Container>
        </section>

        <section className="border-t border-border bg-muted/30 py-20">
          <Container>
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="mb-4 text-3xl font-semibold">
                Ready to Get Started?
              </h2>
              <p className="mb-8 text-muted-foreground">
                Explore our comprehensive design system and start building
                beautiful, accessible interfaces today.
              </p>
              <Link href="/design-system">
                <Button size="lg">View Design System</Button>
              </Link>
            </div>
          </Container>
        </section>
    </div>
  );
}
