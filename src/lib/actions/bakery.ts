import { prisma } from "@/lib/prisma";

export async function getRecentBakery() {
	const bakery = await prisma.bakery.findFirst({
		orderBy: {
			createdAt: "desc",
		},
		where: {
			NOT: {
				totalRating: 0,
			},
			deletedAt: null,
		},
	});

	return bakery;
}

export async function getTopBakeries() {
	return await prisma.bakery.findMany({
		where: {
			deletedAt: null,
		},
		orderBy: {
			totalRating: "desc",
		},
		take: 3,
	});
}

export async function searchBakeries(query: string) {
	return await prisma.bakery.findMany({
		where: {
			deletedAt: null,
			OR: [
				{ name: { contains: query, mode: "insensitive" } },
				{ address: { contains: query, mode: "insensitive" } },
			],
		},
		orderBy: {
			totalRating: "desc",
		},
	});
}

export async function getBakeryById(id: string) {
	return await prisma.bakery.findFirst({
		where: {
			id,
			deletedAt: null,
		},
	});
}

export type SortField =
	| "totalRating"
	| "criticRating"
	| "memberRating"
	| "priceRating";
export type SortOrder = "asc" | "desc";

export async function getAllBakeries(
	sortField: SortField = "totalRating",
	sortOrder: SortOrder = "desc"
) {
	return await prisma.bakery.findMany({
		where: {
			deletedAt: null,
		},
		orderBy: {
			[sortField]: sortOrder,
		},
	});
}
