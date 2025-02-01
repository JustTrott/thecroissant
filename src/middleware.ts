import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function middleware(request: NextRequest) {
	// Only protect /admin routes
	if (request.nextUrl.pathname.startsWith("/admin")) {
		// Skip protection for login page and API routes
		if (
			request.nextUrl.pathname === "/admin/login" ||
			request.nextUrl.pathname.startsWith("/api/")
		) {
			return NextResponse.next();
		}

		const sessionCookie = request.cookies.get("admin_session");

		if (!sessionCookie?.value) {
			return NextResponse.redirect(new URL("/admin/login", request.url));
		}

		// Here you could add additional validation of the session token
		// For example, comparing against stored valid sessions in a database
	}

	return NextResponse.next();
}

export const config = {
	matcher: ["/admin/:path*"],
};
