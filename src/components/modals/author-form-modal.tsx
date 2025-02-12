import { OurFileRouter } from "@/app/api/uploadthing/core";
import { Author } from "@prisma/client";
import { UploadButton } from "@uploadthing/react";
import Image from "next/image";
import React, { useState } from "react";

interface AuthorFormModalProps {
	isOpen: boolean;
	onClose: () => void;
	initialData?: Author | null;
}

export function AuthorFormModal({
	isOpen,
	onClose,
	initialData,
}: AuthorFormModalProps) {
	const [isLoading, setIsLoading] = useState(false);
	const [uploadedImage, setUploadedImage] = useState<string>(
		initialData?.image || ""
	);

	if (!isOpen) return null;

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setIsLoading(true);

		const formData = new FormData(e.currentTarget);
		const data = {
			firstName: formData.get("firstName") as string,
			lastName: formData.get("lastName") as string,
			image: uploadedImage,
		};

		try {
			const response = await fetch("/api/admin/authors", {
				method: initialData ? "PUT" : "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					...data,
					id: initialData?.id,
				}),
			});

			if (!response.ok) {
				throw new Error("Failed to save author");
			}

			onClose();
		} catch (error) {
			console.error("Error saving author:", error);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
			<div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
				<div className="p-6">
					<div className="flex justify-between items-center mb-6">
						<h2 className="text-2xl font-bold">
							{initialData ? "Edit Author" : "Add New Author"}
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
									First Name
								</label>
								<input
									type="text"
									name="firstName"
									required
									defaultValue={initialData?.firstName}
									className="w-full px-3 py-2 border rounded-md"
									disabled={isLoading}
								/>
							</div>

							<div>
								<label className="block text-sm font-medium text-gray-700 mb-1">
									Last Name
								</label>
								<input
									type="text"
									name="lastName"
									required
									defaultValue={initialData?.lastName}
									className="w-full px-3 py-2 border rounded-md"
									disabled={isLoading}
								/>
							</div>

							<div>
								<label className="block text-sm font-medium text-gray-700 mb-1">
									Profile Image
								</label>
								{uploadedImage && (
									<div className="relative w-32 h-32 mb-4 rounded-full overflow-hidden">
										<Image
											src={uploadedImage}
											alt="Author"
											fill
											className="object-cover"
										/>
										<button
											type="button"
											onClick={() => setUploadedImage("")}
											className="absolute top-0 right-0 bg-red-500 text-white p-1 rounded-full"
										>
											✕
										</button>
									</div>
								)}
								<UploadButton<OurFileRouter, "authorImages">
									endpoint="authorImages"
									onClientUploadComplete={(res) => {
										if (res?.[0]) {
											setUploadedImage(res[0].url);
										}
									}}
									onUploadError={(error: Error) => {
										console.error("Error uploading image:", error);
									}}
								/>
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
									: "Create Author"}
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
}
