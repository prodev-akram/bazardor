import { NextRequest, NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

// Protected routes: product details + profile pages.
export function middleware(request: NextRequest) {
  const session = getSessionCookie(request);
  if (!session) {
    const url = new URL("/signin", request.url);
    url.searchParams.set("from", request.nextUrl.pathname);
    return NextResponse.redirect(url);
  }
  return NextResponse.next();
}

export const config = { matcher: ["/product/:path*", "/profile/:path*"] };
