export const revalidate = 60; // revalidate every 60 seconds

import { RecentBakery } from "@/components/home/recent-bakery";
import { TopBakeries } from "@/components/home/top-bakeries";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";

export default async function HomePage() {
	return (
		<main className="container mx-auto px-4 py-8">
			<Suspense fallback={<LoadingSpinner />}>
				<RecentBakery />
			</Suspense>

			<div className="mt-12">
				<div className="flex justify-between items-center mb-6">
					<h2 className="text-2xl font-bold">Top Rated Bakeries</h2>
					<Link
						href="/leaderboard"
						className="text-blue-700 hover:text-blue-800 font-medium"
					>
						See full rankings →
					</Link>
				</div>
				<Suspense fallback={<LoadingSpinner />}>
					<TopBakeries />
				</Suspense>
			</div>
		</main>
	);
}

export const metadata: Metadata = {
	title: "The Croissant",
	description:
		"Welcome to The Croissant - Your guide to the best croissants in Paris. Discover our latest reviews and top-rated bakeries.",
};
