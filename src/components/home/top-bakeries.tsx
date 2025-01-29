import { StarRating } from "@/components/ui/star-rating";
import { getTopBakeries } from "@/lib/actions/bakery";
import Image from "next/image";
import Link from "next/link";

export async function TopBakeries() {
	const bakeries = await getTopBakeries();

	return (
		<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
			{bakeries.map((bakery) => (
				<Link
					key={bakery.id}
					href={`/bakery/${bakery.id}`}
					className="block group"
				>
					<div className="rounded-lg overflow-hidden bg-white shadow-lg hover:shadow-xl transition-shadow">
						<div className="relative h-48">
							{bakery.photos[0] && (
								<Image
									src={bakery.photos[0]}
									alt={bakery.name}
									fill
									className="object-cover"
								/>
							)}
						</div>

						<div className="p-4">
							<h3 className="font-bold text-lg mb-2">
								{bakery.name}
							</h3>
							<div className="flex items-center space-x-2 mb-2">
								<StarRating rating={bakery.totalRating} />
								<span className="text-gray-600 text-sm">
									{Array(bakery.priceRating)
										.fill("$")
										.join("")}
								</span>
							</div>
							<p className="text-gray-600 text-sm mb-2">
								{bakery.address}
							</p>
							<p className="text-gray-500 text-sm">
								Reviewed:{" "}
								{new Date(
									bakery.createdAt
								).toLocaleDateString()}
							</p>
						</div>
					</div>
				</Link>
			))}
		</div>
	);
}
