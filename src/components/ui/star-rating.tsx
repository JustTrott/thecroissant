import { Star } from "lucide-react";

interface StarRatingProps {
	rating: number;
}

export function StarRating({ rating }: StarRatingProps) {
	// Always show 5 stars
	const MAX_STARS = 5;

	return (
		<div className="flex items-center justify-center">
			<div className="flex">
				{[...Array(MAX_STARS)].map((_, index) => {
					const fillPercentage = Math.max(
						0,
						Math.min(100, (rating - index) * 100)
					);
					return (
						<div key={index} className="relative w-5 h-5">
							{/* Background star (empty) */}
							<Star className="absolute w-5 h-5 text-gray-200" />
							{/* Foreground star (filled) with width based on rating */}
							<div
								className="absolute overflow-hidden"
								style={{ width: `${fillPercentage}%` }}
							>
								<Star className="w-5 h-5 text-amber-400 fill-amber-400" />
							</div>
						</div>
					);
				})}
			</div>
			<span className="ml-2 text-sm text-gray-600">
				{rating.toFixed(1)}
			</span>
		</div>
	);
}
