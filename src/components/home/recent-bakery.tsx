import { StarRating } from "@/components/ui/star-rating";
import { getRecentBakery } from "@/lib/actions/bakery";
import { PLACEHOLDER_IMAGE } from "@/lib/constants";
import { truncateText } from "@/lib/utils/text";
import { Quote, User } from "lucide-react";
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

	const truncatedReview = truncateText(bakery.review, 300);
	const isReviewTruncated = truncatedReview !== bakery.review;

	return (
		<>
			<h2 className="text-2xl font-bold mb-6">Recently Reviewed Bakery</h2>
			<section className="rounded-lg overflow-hidden bg-white shadow-lg">
				<div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
					{/* Left side - Review Quote */}
					<div className="flex flex-col justify-center">
						<div className="relative">
							<Quote className="absolute -left-4 -top-4 h-8 w-8 text-blue-200" />
							<blockquote className="pl-8 pr-4 whitespace-pre-wrap break-words">
								<p className="text-lg text-gray-700 italic leading-relaxed">
									{truncatedReview}
								</p>
								{isReviewTruncated && (
									<Link
										href={`/bakery/${bakery.id}`}
										className="block mt-2 text-blue-700 hover:text-blue-800 font-medium"
									>
										Read full review →
									</Link>
								)}
								<footer className="mt-4 flex items-center justify-end gap-3">
									{bakery.author && (
										<div className="flex items-center gap-3">
											{bakery.author.image && (
												<div className="relative w-8 h-8 rounded-full overflow-hidden">
													<Image
														src={bakery.author.image}
														alt={`${bakery.author.firstName} ${bakery.author.lastName}`}
														fill
														className="object-cover"
													/>
												</div>
											)}
											<cite className="text-blue-700 font-semibold not-italic">
												{bakery.author.firstName} {bakery.author.lastName}
											</cite>
										</div>
									)}
									{!bakery.author && (
										<div className="flex items-center gap-2">
											<User className="h-5 w-5 text-gray-400" />
											<cite className="text-gray-500 font-semibold not-italic">
												Anonymous Reviewer
											</cite>
										</div>
									)}
								</footer>
							</blockquote>
						</div>
					</div>

					{/* Right side - Details */}
					<div className="space-y-6">
						{/* Image */}
						<div className="relative h-[300px] rounded-lg overflow-hidden">
							<Image
								src={bakery.photos[0] || PLACEHOLDER_IMAGE}
								alt={bakery.name}
								fill
								className="object-cover"
							/>
						</div>

						{/* Bakery Details */}
						<div className="space-y-4">
							<h1 className="text-2xl font-bold">{bakery.name}</h1>

							<div className="flex items-center space-x-4">
								<StarRating rating={bakery.totalRating} />
								<span className="text-gray-600 font-medium">
									{Array(bakery.priceRating).fill("$").join("")}
								</span>
							</div>

							<div className="space-y-2">
								<p className="text-gray-600">{bakery.address}</p>
								<p className="text-gray-500 text-sm">
									Reviewed on{" "}
									{new Date(bakery.createdAt).toLocaleDateString("en-US", {
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
