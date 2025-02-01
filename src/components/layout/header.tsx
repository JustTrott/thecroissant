"use client";

import Link from "next/link";

export function Header() {
	return (
		<header className="sticky top-0 z-50 w-full border-b bg-white">
			<div className="container mx-auto px-4 h-16 flex items-center">
				<Link
					href="/"
					className="text-2xl font-bold text-blue-700 hover:text-blue-800"
				>
					The Croissant
				</Link>
			</div>
		</header>
	);
}
