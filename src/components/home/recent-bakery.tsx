import { StarRating } from "@/components/ui/star-rating";
import { getRecentBakery } from "@/lib/actions/bakery";
import { Quote } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export async function RecentBakery() {
	const bakery = await getRecentBakery();

	if (!bakery) {
		return (
			<section className="rounded-lg overflow-hidden bg-white shadow-lg p-6">
				<p className="text-gray-600">No recent bakery available.</p>
			</section>
		);
	}

	return (
		<>
			<h2 className="text-2xl font-bold mb-6">
				Recently Reviewed Bakery
			</h2>
			<section className="rounded-lg overflow-hidden bg-white shadow-lg">
				<div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
					{/* Left side - Review Quote */}
					<div className="flex flex-col justify-center">
						<div className="relative">
							<Quote className="absolute -left-4 -top-4 h-8 w-8 text-blue-200" />
							<blockquote className="pl-8 pr-4">
								<p className="text-lg text-gray-700 italic leading-relaxed">
									{bakery.review}
								</p>
								<footer className="mt-4 text-right">
									<cite className="text-blue-700 font-semibold not-italic">
										― The Croissant
									</cite>
								</footer>
							</blockquote>
						</div>
					</div>

					{/* Right side - Details */}
					<div className="space-y-6">
						{/* Image */}
						<div className="relative h-[300px] rounded-lg overflow-hidden">
							{bakery.photos[0] && (
								<Image
									src={bakery.photos[0]}
									alt={bakery.name}
									fill
									className="object-cover"
								/>
							)}
						</div>

						{/* Bakery Details */}
						<div className="space-y-4">
							<h1 className="text-2xl font-bold">
								{bakery.name}
							</h1>

							<div className="flex items-center space-x-4">
								<StarRating rating={bakery.totalRating} />
								<span className="text-gray-600 font-medium">
									{Array(bakery.priceRating)
										.fill("$")
										.join("")}
								</span>
							</div>

							<div className="space-y-2">
								<p className="text-gray-600">
									{bakery.address}
								</p>
								<p className="text-gray-500 text-sm">
									Reviewed on{" "}
									{new Date(
										bakery.createdAt
									).toLocaleDateString("en-US", {
										year: "numeric",
										month: "long",
										day: "numeric",
									})}
								</p>
							</div>

							<Link
								href={`/bakery/${bakery.id}`}
								className="inline-block px-6 py-3 bg-blue-700 text-white rounded-full hover:bg-blue-800 transition-colors"
							>
								Read Full Review
							</Link>
						</div>
					</div>
				</div>
			</section>
		</>
	);
}
