"use client";

import { OurFileRouter } from "@/app/api/uploadthing/core";
import { Bakery } from "@prisma/client";
import { UploadButton } from "@uploadthing/react";
import Image from "next/image";
import React, { useState } from "react";

interface ReviewFormModalProps {
	isOpen: boolean;
	onClose: () => void;
	initialData?: Bakery | null;
}

export function ReviewFormModal({
	isOpen,
	onClose,
	initialData,
}: ReviewFormModalProps) {
	const [isLoading, setIsLoading] = useState(false);
	const [uploadedImages, setUploadedImages] = useState<string[]>(
		initialData?.photos || []
	);

	if (!isOpen) return null;

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setIsLoading(true);

		const formData = new FormData(e.currentTarget);
		const data = {
			name: formData.get("name") as string,
			address: formData.get("address") as string,
			hours: formData.get("hours") as string,
			contact: formData.get("contact") as string,
			criticRating: parseFloat(formData.get("criticRating") as string),
			memberRating: parseFloat(formData.get("memberRating") as string),
			priceRating: parseInt(formData.get("priceRating") as string),
			review: formData.get("review") as string,
			photos: uploadedImages,
		};

		try {
			const response = await fetch("/api/admin/bakeries", {
				method: initialData ? "PUT" : "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					...data,
					id: initialData?.id,
				}),
			});

			if (!response.ok) {
				throw new Error("Failed to save review");
			}

			onClose();
		} catch (error) {
			console.error("Error saving review:", error);
		} finally {
			setIsLoading(false);
		}
	};

	const removeImage = (indexToRemove: number) => {
		setUploadedImages((prev) =>
			prev.filter((_, index) => index !== indexToRemove)
		);
	};

	return (
		<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
			<div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
				<div className="p-6">
					<div className="flex justify-between items-center mb-6">
						<h2 className="text-2xl font-bold">
							{initialData ? "Edit Review" : "Add New Review"}
						</h2>
						<button
							onClick={onClose}
							className="text-gray-500 hover:text-gray-700"
						>
							✕
						</button>
					</div>

					<form onSubmit={handleSubmit} className="space-y-6">
						<div className="space-y-4">
							<div>
								<label className="block text-sm font-medium text-gray-700 mb-1">
									Bakery Name
								</label>
								<input
									type="text"
									name="name"
									required
									defaultValue={initialData?.name}
									className="w-full px-3 py-2 border rounded-md"
									disabled={isLoading}
								/>
							</div>

							<div>
								<label className="block text-sm font-medium text-gray-700 mb-1">
									Address
								</label>
								<input
									type="text"
									name="address"
									required
									defaultValue={initialData?.address}
									className="w-full px-3 py-2 border rounded-md"
									disabled={isLoading}
								/>
							</div>

							<div className="grid grid-cols-2 gap-4">
								<div>
									<label className="block text-sm font-medium text-gray-700 mb-1">
										Opening Hours
									</label>
									<input
										type="text"
										name="hours"
										defaultValue={initialData?.hours || ""}
										className="w-full px-3 py-2 border rounded-md"
										disabled={isLoading}
									/>
								</div>

								<div>
									<label className="block text-sm font-medium text-gray-700 mb-1">
										Contact
									</label>
									<input
										type="text"
										name="contact"
										defaultValue={
											initialData?.contact || ""
										}
										className="w-full px-3 py-2 border rounded-md"
										disabled={isLoading}
									/>
								</div>
							</div>

							<div className="grid grid-cols-3 gap-4">
								<div>
									<label className="block text-sm font-medium text-gray-700 mb-1">
										Critic Rating
									</label>
									<input
										type="number"
										name="criticRating"
										min="0"
										max="5"
										step="0.1"
										required
										defaultValue={
											initialData?.criticRating || 0
										}
										className="w-full px-3 py-2 border rounded-md"
										disabled={isLoading}
									/>
								</div>

								<div>
									<label className="block text-sm font-medium text-gray-700 mb-1">
										Member Rating
									</label>
									<input
										type="number"
										name="memberRating"
										min="0"
										max="5"
										step="0.1"
										required
										defaultValue={
											initialData?.memberRating || 0
										}
										className="w-full px-3 py-2 border rounded-md"
										disabled={isLoading}
									/>
								</div>

								<div>
									<label className="block text-sm font-medium text-gray-700 mb-1">
										Price Rating
									</label>
									<select
										name="priceRating"
										required
										defaultValue={
											initialData?.priceRating || 1
										}
										className="w-full px-3 py-2 border rounded-md"
										disabled={isLoading}
									>
										<option value="1">$</option>
										<option value="2">$$</option>
										<option value="3">$$$</option>
									</select>
								</div>
							</div>

							<div>
								<label className="block text-sm font-medium text-gray-700 mb-1">
									Review
								</label>
								<textarea
									name="review"
									required
									rows={4}
									defaultValue={initialData?.review}
									className="w-full px-3 py-2 border rounded-md"
									disabled={isLoading}
								/>
							</div>

							<div>
								<label className="block text-sm font-medium text-gray-700 mb-1">
									Photos
								</label>
								<div className="space-y-4">
									{uploadedImages.length > 0 && (
										<div className="grid grid-cols-2 gap-4">
											{uploadedImages.map(
												(url, index) => (
													<div
														key={url}
														className="relative group"
													>
														<div className="relative h-40 rounded-lg overflow-hidden">
															<Image
																src={url}
																alt={`Bakery photo ${
																	index + 1
																}`}
																fill
																className="object-cover"
															/>
														</div>
														<button
															type="button"
															onClick={() =>
																removeImage(
																	index
																)
															}
															className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
														>
															✕
														</button>
													</div>
												)
											)}
										</div>
									)}

									{uploadedImages.length < 5 && (
										<UploadButton<
											OurFileRouter,
											"bakeryImages"
										>
											endpoint="bakeryImages"
											onClientUploadComplete={(res) => {
												if (res) {
													const newUrls = res.map(
														(file) => file.url
													);
													setUploadedImages(
														(prev) => [
															...prev,
															...newUrls,
														]
													);
												}
											}}
											onUploadError={(error: Error) => {
												console.error(
													"Upload error:",
													error
												);
											}}
										/>
									)}
								</div>
							</div>
						</div>

						<div className="flex justify-end space-x-3 pt-4 border-t">
							<button
								type="button"
								onClick={onClose}
								className="px-4 py-2 text-sm border rounded-md hover:bg-gray-50"
								disabled={isLoading}
							>
								Cancel
							</button>
							<button
								type="submit"
								className="px-4 py-2 text-sm bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50"
								disabled={isLoading}
							>
								{isLoading
									? "Saving..."
									: initialData
									? "Save Changes"
									: "Create Review"}
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
}
