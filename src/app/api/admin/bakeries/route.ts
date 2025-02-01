import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// GET /api/admin/bakeries
export async function GET() {
	try {
		const bakeries = await prisma.bakery.findMany({
			where: {
				deletedAt: null, // Only get non-deleted bakeries
			},
			orderBy: {
				updatedAt: "desc",
			},
		});

		return NextResponse.json(bakeries);
	} catch (error) {
		console.error("Error fetching bakeries:", error);
		return NextResponse.json(
			{ error: "Failed to fetch bakeries" },
			{ status: 500 }
		);
	}
}

// POST /api/admin/bakeries
export async function POST(request: Request) {
	try {
		const data = await request.json();

		// Calculate total rating
		const totalRating =
			data.criticRating * 0.4 +
			data.memberRating * 0.4 +
			data.priceRating * 0.2;

		const bakery = await prisma.bakery.create({
			data: {
				...data,
				totalRating,
			},
		});

		return NextResponse.json(bakery);
	} catch (error) {
		console.error("Error creating bakery:", error);
		return NextResponse.json(
			{ error: "Failed to create bakery" },
			{ status: 500 }
		);
	}
}

// PUT /api/admin/bakeries
export async function PUT(request: Request) {
	try {
		const data = await request.json();
		const { id, ...updateData } = data;

		// Calculate total rating
		const totalRating =
			(updateData.criticRating + updateData.memberRating) / 2;

		const bakery = await prisma.bakery.update({
			where: { id },
			data: {
				...updateData,
				totalRating,
			},
		});

		return NextResponse.json(bakery);
	} catch (error) {
		console.error("Error updating bakery:", error);
		return NextResponse.json(
			{ error: "Failed to update bakery" },
			{ status: 500 }
		);
	}
}

// DELETE /api/admin/bakeries
export async function DELETE(request: Request) {
	try {
		const { searchParams } = new URL(request.url);
		const id = searchParams.get("id");

		if (!id) {
			return NextResponse.json(
				{ error: "Bakery ID is required" },
				{ status: 400 }
			);
		}

		// Soft delete by setting deletedAt
		const bakery = await prisma.bakery.update({
			where: { id },
			data: {
				deletedAt: new Date(),
			},
		});

		return NextResponse.json(bakery);
	} catch (error) {
		console.error("Error deleting bakery:", error);
		return NextResponse.json(
			{ error: "Failed to delete bakery" },
			{ status: 500 }
		);
	}
}
