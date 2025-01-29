import { Star, StarHalf } from "lucide-react";

interface StarRatingProps {
	rating: number;
}

export function StarRating({ rating }: StarRatingProps) {
	const fullStars = Math.floor(rating);
	const hasHalfStar = rating % 1 >= 0.5;

	return (
		<div className="flex justify-center items-center">
			{[...Array(fullStars)].map((_, i) => (
				<Star
					key={i}
					className="w-5 h-5 fill-amber-400 text-amber-400"
				/>
			))}
			{hasHalfStar && <StarHalf className="w-5 h-5 text-amber-400" />}
			<span className="ml-2 text-sm text-gray-600">
				{rating.toFixed(1)}
			</span>
		</div>
	);
}
