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
			photos: [],
		},
		{
			name: "Le Croissant Doré",
			address: "234 Broadway E, Seattle, WA 98102",
			hours: "Mon-Sun: 7am-7pm",
			contact: "(206) 555-0234",
			criticRating: 4.8,
			memberRating: 4.6,
			priceRating: 3,
			totalRating: 4.7,
			review: "A true Parisian experience in Seattle. Their croissants are consistently excellent, with a perfect balance of buttery layers and crispy exterior. The attention to detail is remarkable.",
			photos: [
				"https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0f/7c/c2/7c/cafe-gourmand-pastry.jpg?w=900&h=500&s=1",
			],
		},
		{
			name: "Boulangerie Moderne",
			address: "567 Olive Way, Seattle, WA 98101",
			hours: "Tue-Sun: 8am-6pm",
			contact: "(206) 555-0567",
			criticRating: 4.2,
			memberRating: 4.4,
			priceRating: 2,
			totalRating: 4.3,
			review: "Modern take on traditional French pastries. Their croissants strike a good balance between innovation and tradition. The chocolate croissant is particularly noteworthy.",
			photos: [
				"https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1c/b1/9f/ff/some-of-our-ever-changing.jpg?w=900&h=500&s=1",
			],
		},
		{
			name: "The Daily Croissant",
			address: "890 University St, Seattle, WA 98101",
			hours: "Mon-Fri: 6:30am-3pm",
			contact: "(206) 555-0890",
			criticRating: 3.8,
			memberRating: 4.0,
			priceRating: 1,
			totalRating: 3.9,
			review: "A reliable spot for your morning croissant fix. While not the most exceptional, they maintain good quality and friendly service. Perfect for a quick breakfast.",
			photos: [
				"https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1c/b1/a0/0d/a-brunch-plate.jpg?w=900&h=500&s=1",
			],
		},
		{
			name: "Artisan's Corner",
			address: "345 Pine St, Seattle, WA 98101",
			hours: "Wed-Sun: 7:30am-5pm",
			contact: "(206) 555-0345",
			criticRating: 4.6,
			memberRating: 4.3,
			priceRating: 2,
			totalRating: 4.4,
			review: "Artisanal approach with exceptional results. Their croissants showcase the perfect combination of traditional techniques and high-quality local ingredients. Worth the visit.",
			photos: [
				"https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0f/7c/c2/7c/cafe-gourmand-pastry.jpg?w=900&h=500&s=1",
			],
		},
		{
			name: "Butter & Bread",
			address: "678 Madison St, Seattle, WA 98104",
			hours: "Mon-Sat: 8am-4pm",
			contact: "(206) 555-0678",
			criticRating: 4.0,
			memberRating: 4.1,
			priceRating: 2,
			totalRating: 4.1,
			review: "Solid neighborhood bakery with consistent quality. Their croissants are well-executed, if not revolutionary. The almond variation is particularly popular.",
			photos: [
				"https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1c/b1/9f/ff/some-of-our-ever-changing.jpg?w=900&h=500&s=1",
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
