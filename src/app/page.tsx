import { RecentBakery } from "@/components/home/recent-bakery";
import { TopBakeries } from "@/components/home/top-bakeries";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
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
						className="text-amber-600 hover:text-amber-700 font-medium"
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
