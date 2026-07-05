import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET ?? "your_super_secret_key_change_this_in_production"
);

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Only protect /admin routes
  if (pathname.startsWith("/admin")) {
    const token = req.cookies.get("token")?.value;

    // No token → redirect to sign-in
    if (!token) {
      return NextResponse.redirect(new URL("/sing-in", req.url));
    }

    try {
      const { payload } = await jwtVerify(token, JWT_SECRET);

      // Token valid but not admin → redirect to home
      if (payload.role !== "admin") {
        return NextResponse.redirect(new URL("/", req.url));
      }

      // Admin — allow through
      return NextResponse.next();
    } catch {
      // Token invalid or expired → redirect to sign-in
      const response = NextResponse.redirect(new URL("/sing-in", req.url));
      response.cookies.delete("token");
      return response;
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
