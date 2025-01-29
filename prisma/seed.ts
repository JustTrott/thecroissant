const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
	// Clean existing data
	await prisma.bakery.deleteMany();
	await prisma.admin.deleteMany();

	// Create admin
	await prisma.admin.create({
		data: {
			username: "admin",
			// This is a hashed version of "admin123" - in production, use proper password hashing
			passwordHash:
				"$2b$10$EpRnTzVlqHNP0.fUbXUwSOyuiXe/QLSUG6xNekdHgTGmrpHEfIoxm",
		},
	});

	// Create bakeries
	const bakeries = [
		{
			name: "La Petite Boulangerie",
			address: "123 Main St, Seattle, WA 98101",
			hours: "Mon-Sat: 7am-6pm, Sun: 8am-3pm",
			contact: "(206) 555-0123",
			criticRating: 4.5,
			memberRating: 4.2,
			priceRating: 2, // Medium price
			totalRating: 4.3, // Weighted average
			review: "Perfectly flaky croissants with a beautifully laminated dough. The butter quality is evident in every bite. Slight room for improvement in terms of consistency between visits.",
			photos: [
				"https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1c/b1/9f/ff/some-of-our-ever-changing.jpg?w=900&h=500&s=1",
				"https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0f/7c/c2/7c/cafe-gourmand-pastry.jpg?w=900&h=500&s=1",
			],
		},
		{
			name: "Croissant & Co.",
			address: "456 Pike St, Seattle, WA 98101",
			hours: "Tue-Sun: 6:30am-4pm, Closed Mondays",
			contact: "(206) 555-0456",
			criticRating: 5.0,
			memberRating: 4.8,
			priceRating: 3, // High price
			totalRating: 4.9, // Weighted average
			review: "The holy grail of croissants in Seattle. Each layer shatters perfectly, with an ideal butter-to-dough ratio. The outside is deeply caramelized while maintaining a soft, honeycomb interior.",
			photos: [
				"https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1c/b1/a0/0d/a-brunch-plate.jpg?w=900&h=500&s=1",
			],
		},
		{
			name: "Morning Bakery",
			address: "789 1st Ave, Seattle, WA 98104",
			hours: "Daily: 7am-5pm",
			contact: "(206) 555-0789",
			criticRating: 3.5,
			memberRating: 3.8,
			priceRating: 1, // Low price
			totalRating: 3.7, // Weighted average
			review: "Decent neighborhood bakery with room for improvement. Croissants are fresh but could use better quality butter and more careful lamination. Good value for the price point.",
			photos: [
				"https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0f/7c/c2/7c/cafe-gourmand-pastry.jpg?w=900&h=500&s=1",
			],
		},
	];

	for (const bakery of bakeries) {
		await prisma.bakery.create({
			data: bakery,
		});
	}

	console.log("Seed data created successfully");
}

main()
	.catch((e) => {
		console.error(e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
