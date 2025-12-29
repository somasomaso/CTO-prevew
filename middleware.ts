import { NextRequest, NextResponse } from "next/server";

function base64UrlDecode(input: string) {
  const pad = "=".repeat((4 - (input.length % 4)) % 4);
  const base64 = (input + pad).replace(/-/g, "+").replace(/_/g, "/");
  return atob(base64);
}

function decodeJwtPayload(token: string): Record<string, unknown> | null {
  try {
    const parts = token.split(".");
    if (parts.length !== 3) return null;
    return JSON.parse(base64UrlDecode(parts[1]));
  } catch {
    return null;
  }
}

function isAuthPage(pathname: string) {
  return pathname.startsWith("/login") || pathname.startsWith("/signup");
}

function isProtected(pathname: string) {
  return (
    pathname.startsWith("/dashboard") ||
    pathname.startsWith("/profile") ||
    pathname.startsWith("/upload") ||
    pathname.startsWith("/admin")
  );
}

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Skip next internals and static assets
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/favicon") ||
    pathname.startsWith("/public") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  const token = req.cookies.get("accessToken")?.value;

  if (!token && isProtected(pathname)) {
    const url = req.nextUrl.clone();
    url.pathname = "/login";
    url.searchParams.set("redirect", pathname);
    return NextResponse.redirect(url);
  }

  if (token && isAuthPage(pathname)) {
    const url = req.nextUrl.clone();
    url.pathname = "/dashboard";
    url.search = "";
    return NextResponse.redirect(url);
  }

  if (token) {
    const payload = decodeJwtPayload(token);
    const roles: string[] = Array.isArray(payload?.roles) ? payload.roles : [];

    if (pathname.startsWith("/admin") && !roles.includes("admin")) {
      const url = req.nextUrl.clone();
      url.pathname = "/dashboard";
      url.search = "";
      return NextResponse.redirect(url);
    }

    if (pathname.startsWith("/upload")) {
      const allowed = roles.some((r) => ["contributor", "moderator", "admin"].includes(r));
      if (!allowed) {
        const url = req.nextUrl.clone();
        url.pathname = "/dashboard";
        url.search = "";
        return NextResponse.redirect(url);
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api).*)"],
};
