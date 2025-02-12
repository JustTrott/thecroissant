import { PrismaClient } from "@prisma/client";
import { calculateTotalRating } from "../src/lib/utils/rating";

const prisma = new PrismaClient();

async function recalculateRatings() {
  try {
    // Get all bakeries
    const bakeries = await prisma.bakery.findMany({
      where: {
        deletedAt: null,
      },
    });

    console.log(`Found ${bakeries.length} bakeries to update...`);

    // Update each bakery with the new rating calculation
    for (const bakery of bakeries) {
      const newTotalRating = calculateTotalRating(
        bakery.criticRating,
        bakery.memberRating
      );

      await prisma.bakery.update({
        where: { id: bakery.id },
        data: { totalRating: newTotalRating },
      });

      console.log(
        `Updated ${bakery.name}: new rating = ${newTotalRating.toFixed(2)}`
      );
    }

    console.log("Successfully recalculated all ratings!");
  } catch (error) {
    console.error("Error recalculating ratings:", error);
  } finally {
    await prisma.$disconnect();
  }
}

// Run the script
recalculateRatings();
