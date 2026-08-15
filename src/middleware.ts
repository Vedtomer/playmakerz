import { NextRequest, NextResponse } from "next/server";
import { verifySessionToken, ADMIN_SESSION_COOKIE } from "@/lib/session";

export const config = {
  matcher: ["/admin/:path*"],
  runtime: "nodejs",
};

export function middleware(req: NextRequest) {
  if (req.nextUrl.pathname === "/admin/login") {
    return NextResponse.next();
  }

  const session = verifySessionToken(req.cookies.get(ADMIN_SESSION_COOKIE)?.value);
  if (!session) {
    const loginUrl = new URL("/admin/login", req.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}
