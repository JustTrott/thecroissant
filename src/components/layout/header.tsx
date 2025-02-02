"use client";

import { Trophy } from "lucide-react";
import Link from "next/link";

export function Header() {
	return (
		<header className="sticky top-0 z-50 w-full border-b bg-white">
			<div className="container mx-auto px-4 h-16 flex items-center justify-between">
				<Link
					href="/"
					className="text-2xl font-bold text-blue-700 hover:text-blue-800"
				>
					The Croissant
				</Link>

				<Link
					href="/leaderboard"
					className="flex items-center gap-2 text-blue-700 hover:text-blue-800 font-medium"
				>
					<Trophy className="h-5 w-5" />
					<span className="hidden sm:inline">Leaderboard</span>
				</Link>
			</div>
		</header>
	);
}
