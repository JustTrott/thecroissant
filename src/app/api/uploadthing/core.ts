import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

export const ourFileRouter = {
	bakeryImages: f({
		image: {
			maxFileSize: "8MB",
			maxFileCount: 5,
		},
	})
		.middleware(() => {
			// No auth required for now, but we could add it here later
			return {};
		})
		.onUploadComplete(async ({ file }) => {
			console.log("Upload complete for file:", file.url);
			return { url: file.url };
		}),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
