export const revalidate = 60; // revalidate every 60 seconds

import { ImageSlideshow } from "@/components/ui/image-slideshow";
import { StarRating } from "@/components/ui/star-rating";
import { getBakeryById } from "@/lib/actions/bakery";
import { Clock, MapPin, Phone } from "lucide-react";
import { Metadata } from "next";
import { notFound } from "next/navigation";

interface BakeryPageProps {
	params: {
		id: string;
	};
}

export default async function BakeryPage({ params }: BakeryPageProps) {
	const bakery = await getBakeryById(params.id);

	if (!bakery) {
		notFound();
	}

	return (
		<main className="container mx-auto px-4 py-8">
			<article className="max-w-4xl mx-auto">
				{/* Image Slideshow */}
				<div className="rounded-lg overflow-hidden shadow-lg mb-8">
					<ImageSlideshow images={bakery.photos} alt={bakery.name} />
				</div>

				{/* Bakery Info */}
				<div className="bg-white rounded-lg shadow-lg p-8">
					<header className="mb-6">
						<h1 className="text-4xl font-bold mb-4">
							{bakery.name}
						</h1>
						<div className="flex flex-wrap items-center gap-6 text-gray-600">
							<div className="flex items-center gap-2">
								<MapPin className="h-5 w-5" />
								<span>{bakery.address}</span>
							</div>
							{bakery.hours && (
								<div className="flex items-center gap-2">
									<Clock className="h-5 w-5" />
									<span>{bakery.hours}</span>
								</div>
							)}
							{bakery.contact && (
								<div className="flex items-center gap-2">
									<Phone className="h-5 w-5" />
									<span>{bakery.contact}</span>
								</div>
							)}
						</div>
					</header>

					{/* Ratings Section */}
					<div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6 bg-blue-50 rounded-lg mb-8">
						<div className="text-center">
							<div className="text-lg font-semibold mb-2">
								Critic Rating
							</div>
							<StarRating rating={bakery.criticRating} />
						</div>
						<div className="text-center">
							<div className="text-lg font-semibold mb-2">
								Member Rating
							</div>
							<StarRating rating={bakery.memberRating} />
						</div>
						<div className="text-center">
							<div className="text-lg font-semibold mb-2">
								Price Level
							</div>
							<div className="text-xl font-bold text-blue-700">
								{Array(bakery.priceRating).fill("$").join("")}
							</div>
						</div>
					</div>

					{/* Review Section */}
					<div className="prose prose-blue max-w-none">
						<h2 className="text-2xl font-bold mb-4">Our Review</h2>
						<div className="bg-gray-50 p-6 rounded-lg">
							<blockquote className="text-lg text-gray-700 italic">
								{bakery.review}
							</blockquote>
							<div className="mt-4 text-right">
								<cite className="text-blue-700 font-semibold not-italic">
									― The Croissant
								</cite>
							</div>
						</div>
					</div>

					{/* Review Date and Edit Date */}
					<div className="mt-8 text-right space-y-1">
						<p className="text-gray-500">
							Reviewed on{" "}
							{new Date(bakery.createdAt).toLocaleDateString(
								"en-US",
								{
									year: "numeric",
									month: "long",
									day: "numeric",
								}
							)}
						</p>
						{bakery.updatedAt > bakery.createdAt && (
							<p className="text-gray-400 text-sm">
								Last edited on{" "}
								{new Date(bakery.updatedAt).toLocaleDateString(
									"en-US",
									{
										year: "numeric",
										month: "long",
										day: "numeric",
									}
								)}
							</p>
						)}
					</div>
				</div>
			</article>
		</main>
	);
}

export async function generateMetadata({
	params,
}: {
	params: { id: string };
}): Promise<Metadata> {
	const bakery = await getBakeryById(params.id);

	if (!bakery) {
		return {
			title: "Bakery Not Found",
		};
	}

	return {
		title: bakery.name,
		description: `${bakery.name} - ${bakery.review.substring(0, 150)}...`,
		openGraph: {
			images: bakery.photos,
		},
	};
}
