"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

interface ImageSlideshowProps {
	images: string[];
	alt: string;
}

export function ImageSlideshow({ images, alt }: ImageSlideshowProps) {
	const [currentIndex, setCurrentIndex] = useState(0);

	if (images.length === 0) {
		return (
			<div className="w-full h-[400px] bg-gray-100 flex items-center justify-center">
				<p className="text-gray-500">No images available</p>
			</div>
		);
	}

	const showPrevious = () => {
		setCurrentIndex((current) =>
			current === 0 ? images.length - 1 : current - 1
		);
	};

	const showNext = () => {
		setCurrentIndex((current) =>
			current === images.length - 1 ? 0 : current + 1
		);
	};

	return (
		<div className="relative w-full h-[400px] group">
			<Image
				src={images[currentIndex]}
				alt={`${alt} - Image ${currentIndex + 1}`}
				fill
				className="object-cover"
			/>

			{images.length > 1 && (
				<>
					{/* Navigation Arrows */}
					<button
						onClick={showPrevious}
						className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
						aria-label="Previous image"
					>
						<ChevronLeft className="h-6 w-6" />
					</button>
					<button
						onClick={showNext}
						className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
						aria-label="Next image"
					>
						<ChevronRight className="h-6 w-6" />
					</button>

					{/* Dots Indicator */}
					<div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
						{images.map((_, index) => (
							<button
								key={index}
								onClick={() => setCurrentIndex(index)}
								className={`w-2 h-2 rounded-full transition-all ${
									index === currentIndex
										? "bg-white w-4"
										: "bg-white/50 hover:bg-white/75"
								}`}
								aria-label={`Go to image ${index + 1}`}
							/>
						))}
					</div>
				</>
			)}
		</div>
	);
}
