import { auth } from "@/lib/auth/authConfig";
import { NextResponse } from "next/server";

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;

  const isApiAuthRoute = nextUrl.pathname.startsWith("/api/auth");
  const isPublicRoute = ["/", "/auth/auth-error"].includes(nextUrl.pathname);
  const isAuthRoute = nextUrl.pathname === "/auth/sign-in";

  // 1. Always allow API Auth routes (internal NextAuth business)
  if (isApiAuthRoute) return NextResponse.next();

  // 2. If user is on an Auth page (Sign In)
  if (isAuthRoute) {
    if (isLoggedIn) {
      // If already logged in, send them to dashboard
      return NextResponse.redirect(new URL("/dashboard", nextUrl));
    }
    return NextResponse.next();
  }

  // 3. Protection: If not logged in and not on a public route, redirect to sign-in
  if (!isLoggedIn && !isPublicRoute) {
    return NextResponse.redirect(new URL("/auth/sign-in", nextUrl));
  }

  return NextResponse.next();
});

// The matcher tells Next.js which routes to run this middleware on
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
