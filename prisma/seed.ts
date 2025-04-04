import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  console.log("Starting seed...");

  // Clean up existing data
  await prisma.friend.deleteMany({});
  await prisma.teeTime.deleteMany({});
  await prisma.userPreference.deleteMany({});
  await prisma.user.deleteMany({});
  await prisma.golfCourse.deleteMany({});

  console.log("Deleted existing data");

  // Create users
  const passwordHash = await bcrypt.hash("password123", 10);

  const user1 = await prisma.user.create({
    data: {
      name: "John Doe",
      email: "john@example.com",
      passwordHash,
    },
  });

  const user2 = await prisma.user.create({
    data: {
      name: "Jane Smith",
      email: "jane@example.com",
      passwordHash,
    },
  });

  const user3 = await prisma.user.create({
    data: {
      name: "Bob Johnson",
      email: "bob@example.com",
      passwordHash,
    },
  });

  console.log("Created users");

  // Create golf courses
  const pineHill = await prisma.golfCourse.create({
    data: {
      name: "Pine Hill Golf Club",
      description: "Scenic 18-hole championship course nestled among towering pines.",
      imageUrl: "https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?q=80&w=2070&auto=format&fit=crop",
      address: "123 Pine Hill Road",
      city: "Pine Hills",
      state: "CA",
      zipCode: "90210",
      phone: "555-123-4567",
      website: "www.pinehillgolf.com",
      par: 72,
      holes: 18,
    },
  });

  const meadows = await prisma.golfCourse.create({
    data: {
      name: "The Meadows",
      description: "Open layout with rolling fairways and challenging water features.",
      imageUrl: "https://images.unsplash.com/photo-1535131749006-b7f58c99034b?q=80&w=2070&auto=format&fit=crop",
      address: "456 Meadow Lane",
      city: "Meadowville",
      state: "CA",
      zipCode: "90211",
      phone: "555-234-5678",
      website: "www.meadowsgolf.com",
      par: 71,
      holes: 18,
    },
  });

  const lakeside = await prisma.golfCourse.create({
    data: {
      name: "Lakeside Golf Course",
      description: "Stunning waterfront views with signature holes along the lakefront.",
      imageUrl: "https://images.unsplash.com/photo-1510534316479-a9b4893f7e5a?q=80&w=2069&auto=format&fit=crop",
      address: "789 Lake Drive",
      city: "Lakeville",
      state: "CA",
      zipCode: "90212",
      phone: "555-345-6789",
      website: "www.lakesidegolf.com",
      par: 72,
      holes: 18,
    },
  });

  // This course is available in the database but not used in the seed data
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const oakridge = await prisma.golfCourse.create({
    data: {
      name: "Oak Ridge Country Club",
      description: "Premium private club featuring meticulously maintained greens.",
      imageUrl: "https://images.unsplash.com/photo-1611165334142-b8455843c91e?q=80&w=2070&auto=format&fit=crop",
      address: "101 Oak Ridge Blvd",
      city: "Oak Ridge",
      state: "CA",
      zipCode: "90213",
      phone: "555-456-7890",
      website: "www.oakridgegolf.com",
      par: 72,
      holes: 18,
    },
  });

  console.log("Created golf courses");

  // Create user preferences
  await prisma.userPreference.create({
    data: {
      userId: user1.id,
      handicap: 12.5,
      preferredTeeTime: "Morning",
      preferredCourseId: pineHill.id,
    },
  });

  console.log("Created user preferences");

  // Create friendships
  await prisma.friend.create({
    data: {
      userId: user1.id,
      friendId: user2.id,
    },
  });

  await prisma.friend.create({
    data: {
      userId: user1.id,
      friendId: user3.id,
    },
  });

  console.log("Created friendships");

  // Create tee times
  const today = new Date();
  const nextWeek = new Date(today);
  nextWeek.setDate(today.getDate() + 7);

  await prisma.teeTime.create({
    data: {
      userId: user1.id,
      courseId: pineHill.id,
      date: nextWeek,
      time: "09:30 AM",
      players: 4,
      confirmed: true,
    },
  });

  const twoWeeks = new Date(today);
  twoWeeks.setDate(today.getDate() + 14);

  await prisma.teeTime.create({
    data: {
      userId: user1.id,
      courseId: meadows.id,
      date: twoWeeks,
      time: "10:15 AM",
      players: 3,
      confirmed: false,
    },
  });

  const lastWeek = new Date(today);
  lastWeek.setDate(today.getDate() - 7);

  await prisma.teeTime.create({
    data: {
      userId: user1.id,
      courseId: lakeside.id,
      date: lastWeek,
      time: "08:00 AM",
      players: 2,
      confirmed: true,
    },
  });

  console.log("Created tee times");
  console.log("Seed completed successfully");
}

main()
  .catch((e) => {
    console.error("Error during seeding:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
