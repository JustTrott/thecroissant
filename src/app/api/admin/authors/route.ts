import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// GET /api/admin/authors
export async function GET() {
  try {
    const authors = await prisma.author.findMany({
      where: {
        deletedAt: null,
      },
      orderBy: {
        lastName: "asc",
      },
    });

    return NextResponse.json(authors);
  } catch (error) {
    console.error("Error fetching authors:", error);
    return NextResponse.json(
      { error: "Failed to fetch authors" },
      { status: 500 }
    );
  }
}

// POST /api/admin/authors
export async function POST(request: Request) {
  try {
    const data = await request.json();
    const author = await prisma.author.create({
      data,
    });

    return NextResponse.json(author);
  } catch (error) {
    console.error("Error creating author:", error);
    return NextResponse.json(
      { error: "Failed to create author" },
      { status: 500 }
    );
  }
}

// PUT /api/admin/authors
export async function PUT(request: Request) {
  try {
    const data = await request.json();
    const { id, ...updateData } = data;

    const author = await prisma.author.update({
      where: { id },
      data: updateData,
    });

    return NextResponse.json(author);
  } catch (error) {
    console.error("Error updating author:", error);
    return NextResponse.json(
      { error: "Failed to update author" },
      { status: 500 }
    );
  }
}

// DELETE /api/admin/authors
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "Author ID is required" },
        { status: 400 }
      );
    }

    // Soft delete by setting deletedAt
    const author = await prisma.author.update({
      where: { id },
      data: {
        deletedAt: new Date(),
      },
    });

    return NextResponse.json(author);
  } catch (error) {
    console.error("Error deleting author:", error);
    return NextResponse.json(
      { error: "Failed to delete author" },
      { status: 500 }
    );
  }
}
