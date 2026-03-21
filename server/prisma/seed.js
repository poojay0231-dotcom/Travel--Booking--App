require("dotenv").config();

const { PrismaClient } = require("@prisma/client");
const { PrismaPg } = require("@prisma/adapter-pg");

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL is missing in .env");
}

const adapter = new PrismaPg({ connectionString });

const prisma = new PrismaClient({
  adapter,
});

async function main() {
  await prisma.destination.createMany({
    data: [
      {
  title: "Bali Retreat",
  slug: "bali-retreat",
  location: "Indonesia",
  description: "Relax in Bali with beaches and luxury stays",
  pricePerPerson: 450,
  durationDays: 5,
  heroImage: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
  maxTravelers: 10,
},
{
  title: "Maldives Paradise",
  slug: "maldives-paradise",
  location: "Maldives",
  description: "Luxury overwater villas experience",
  pricePerPerson: 1200,
  durationDays: 4,
  heroImage: "https://images.unsplash.com/photo-1500375592092-40eb2168fd21",
  maxTravelers: 6,
},
{
  title: "Swiss Alps Escape",
  slug: "swiss-alps",
  location: "Switzerland",
  description: "Snowy mountains and scenic views",
  pricePerPerson: 900,
  durationDays: 6,
  heroImage: "https://images.unsplash.com/photo-1501785888041-af3ef285b470",
  maxTravelers: 8,
},    
],
  });

  console.log("Seed data inserted");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });