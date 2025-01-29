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
		},
	});

	return bakery;
}

export async function getTopBakeries() {
	return await prisma.bakery.findMany({
		orderBy: {
			totalRating: "desc",
		},
		take: 3,
	});
}

export async function searchBakeries(query: string) {
	return await prisma.bakery.findMany({
		where: {
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
	return await prisma.bakery.findUnique({
		where: { id },
	});
}
