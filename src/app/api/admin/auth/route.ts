import { NextResponse } from "next/server";

export async function POST(request: Request) {
	try {
		const { username, password } = await request.json();

		// Use private environment variables
		const validUsername = process.env.ADMIN_USERNAME;
		const validPassword = process.env.ADMIN_PASSWORD;

		if (!validUsername || !validPassword) {
			console.error("Admin credentials not configured");
			return NextResponse.json(
				{ error: "Server configuration error" },
				{ status: 500 }
			);
		}

		if (username === validUsername && password === validPassword) {
			// Generate a simple session token (you might want to use a proper JWT library in production)
			const sessionToken =
				Math.random().toString(36).substring(2) +
				Date.now().toString(36);

			return NextResponse.json(
				{ token: sessionToken },
				{
					status: 200,
					headers: {
						"Set-Cookie": `admin_session=${sessionToken}; Path=/; HttpOnly; SameSite=Strict; Max-Age=${
							60 * 60 * 24
						}`, // 24 hours
					},
				}
			);
		}

		return NextResponse.json(
			{ error: "Invalid credentials" },
			{ status: 401 }
		);
	} catch (error) {
		console.error("Auth error:", error);
		return NextResponse.json(
			{ error: "Authentication failed" },
			{ status: 500 }
		);
	}
}
