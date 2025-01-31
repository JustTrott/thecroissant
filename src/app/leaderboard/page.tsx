import { StarRating } from "@/components/ui/star-rating";
import { getAllBakeries, type SortField } from "@/lib/actions/bakery";
import { ArrowDownIcon, ArrowUpIcon, MapPin } from "lucide-react";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

interface SortableColumnHeaderProps {
	title: string;
	field: SortField;
	currentSort: SortField;
	sortOrder: "asc" | "desc";
}

function SortableColumnHeader({
	title,
	field,
	currentSort,
	sortOrder,
}: SortableColumnHeaderProps) {
	const isActive = field === currentSort;
	const nextOrder = sortOrder === "asc" ? "desc" : "asc";

	return (
		<Link
			href={`/leaderboard?sort=${field}&order=${
				isActive ? nextOrder : "desc"
			}`}
			className={`flex items-center gap-1 hover:text-amber-600 transition-colors ${
				isActive ? "text-amber-600" : ""
			}`}
		>
			{title}
			{isActive && (
				<span className="ml-1">
					{sortOrder === "asc" ? (
						<ArrowUpIcon className="h-4 w-4" />
					) : (
						<ArrowDownIcon className="h-4 w-4" />
					)}
				</span>
			)}
		</Link>
	);
}

export default async function LeaderboardPage({
	searchParams,
}: {
	searchParams: { sort?: SortField; order?: "asc" | "desc" };
}) {
	const sortField = searchParams.sort || "totalRating";
	const sortOrder = searchParams.order || "desc";
	const bakeries = await getAllBakeries(sortField, sortOrder);

	return (
		<div className="container mx-auto px-4 py-16">
			<div className="max-w-6xl mx-auto">
				<h1 className="text-3xl font-bold mb-8">Bakery Leaderboard</h1>

				<div className="bg-white rounded-lg shadow-lg overflow-hidden">
					<div className="overflow-x-auto">
						<table className="w-full">
							<thead className="bg-amber-50">
								<tr>
									<th className="px-6 py-4 text-left">
										Rank
									</th>
									<th className="px-6 py-4 text-left">
										Bakery
									</th>
									<th className="px-6 py-4 text-left">
										<SortableColumnHeader
											title="Overall"
											field="totalRating"
											currentSort={sortField}
											sortOrder={sortOrder}
										/>
									</th>
									<th className="px-6 py-4 text-left">
										<SortableColumnHeader
											title="Critic"
											field="criticRating"
											currentSort={sortField}
											sortOrder={sortOrder}
										/>
									</th>
									<th className="px-6 py-4 text-left">
										<SortableColumnHeader
											title="Members"
											field="memberRating"
											currentSort={sortField}
											sortOrder={sortOrder}
										/>
									</th>
									<th className="px-6 py-4 text-left">
										<SortableColumnHeader
											title="Price"
											field="priceRating"
											currentSort={sortField}
											sortOrder={sortOrder}
										/>
									</th>
									<th className="px-6 py-4 text-left">
										Location
									</th>
								</tr>
							</thead>
							<tbody className="divide-y divide-gray-200">
								{bakeries.map((bakery, index) => (
									<tr
										key={bakery.id}
										className="hover:bg-gray-50 transition-colors"
									>
										<td className="px-6 py-4">
											<span className="font-bold text-2xl text-amber-600">
												#{index + 1}
											</span>
										</td>
										<td className="px-6 py-4">
											<Link
												href={`/bakery/${bakery.id}`}
												className="flex items-center gap-4 group"
											>
												<div className="relative w-16 h-16 rounded-lg overflow-hidden">
													{bakery.photos[0] ? (
														<Image
															src={
																bakery.photos[0]
															}
															alt={bakery.name}
															fill
															className="object-cover"
														/>
													) : (
														<div className="w-full h-full bg-gray-100 flex items-center justify-center">
															<span className="text-gray-400">
																No image
															</span>
														</div>
													)}
												</div>
												<div>
													<h2 className="font-semibold text-lg group-hover:text-amber-600 transition-colors">
														{bakery.name}
													</h2>
													<p className="text-sm text-gray-500">
														Reviewed{" "}
														{new Date(
															bakery.createdAt
														).toLocaleDateString(
															"en-US",
															{
																month: "short",
																day: "numeric",
																year: "numeric",
															}
														)}
													</p>
												</div>
											</Link>
										</td>
										<td className="px-6 py-4">
											<StarRating
												rating={bakery.totalRating}
											/>
										</td>
										<td className="px-6 py-4">
											<span className="font-medium">
												{bakery.criticRating.toFixed(1)}
												/5.0
											</span>
										</td>
										<td className="px-6 py-4">
											<span className="font-medium">
												{bakery.memberRating.toFixed(1)}
												/5.0
											</span>
										</td>
										<td className="px-6 py-4">
											<span className="text-lg font-medium text-amber-600">
												{Array(bakery.priceRating)
													.fill("$")
													.join("")}
											</span>
										</td>
										<td className="px-6 py-4">
											<div className="flex items-center gap-2 text-gray-600">
												<MapPin className="h-4 w-4" />
												<span>{bakery.address}</span>
											</div>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	);
}

export const metadata: Metadata = {
	title: "Bakery Leaderboard",
	description:
		"Discover the top-rated croissant bakeries in Paris, ranked by our critics and community members.",
};
