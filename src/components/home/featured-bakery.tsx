import { StarRating } from "@/components/ui/star-rating";
import { getRecentBakery } from "@/lib/actions/bakery";
import Image from "next/image";
import Link from "next/link";

export async function FeaturedBakery() {
	const bakery = await getRecentBakery();

	// Debug log
	console.log("Featured bakery in component:", bakery);

	if (!bakery) {
		// Add a fallback UI when no bakery is found
		return (
			<section className="rounded-lg overflow-hidden bg-white shadow-lg p-6">
				<p className="text-gray-600">No featured bakery available.</p>
			</section>
		);
	}

	return (
		<section className="rounded-lg overflow-hidden bg-white shadow-lg">
			<div className="relative h-[400px]">
				{bakery.photos[0] && (
					<Image
						src={bakery.photos[0]}
						alt={bakery.name}
						fill
						className="object-cover"
					/>
				)}
			</div>

			<div className="p-6">
				<h1 className="text-3xl font-bold mb-2">{bakery.name}</h1>

				<div className="flex items-center space-x-4 mb-4">
					<StarRating rating={bakery.totalRating} />
					<span className="text-gray-600">
						${Array(bakery.priceRating).fill("$").join("")}
					</span>
				</div>

				<p className="text-gray-600 mb-4">{bakery.address}</p>
				<p className="mb-4">{bakery.review.substring(0, 200)}...</p>

				<Link
					href={`/bakery/${bakery.id}`}
					className="inline-block px-6 py-2 bg-amber-600 text-white rounded-full hover:bg-amber-700"
				>
					View Details
				</Link>
			</div>
		</section>
	);
}
