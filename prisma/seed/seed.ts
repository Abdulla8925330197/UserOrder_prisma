import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  // 1. Create Admin
  const hashedAdminPassword = await bcrypt.hash("Abd@123", 10);
  await prisma.admin.create({
    data: {
      email: "abd@gmail.com",
      password: hashedAdminPassword,
      role: "admin",
    },
  });

  // 2. Create Profiles
  const vini = await prisma.profiles.create({
    data: {
      id:1,
      name: "Vini",
      email: "vini@example.com",
      passwordHash: await bcrypt.hash("vini123", 10),
    },
  });

  const tilesh = await prisma.profiles.create({
    data: {
      id:2,
      name: "Tilesh",
      email: "tilesh@example.com",
      passwordHash: await bcrypt.hash("tilesh123", 10),
    },
  });

  // 3. Create Products
  const shirt = await prisma.product.create({
    data: {
      name: "shirt",
      description: "Comfortable cotton t-shirt",
      price: 19.99,
    },
  });

  const nike = await prisma.product.create({
    data: {
      name: "Nike",
      description: "Running shoes",
      price: 49.99,
    },
  });

  // 4. Create Orders (link with userId and productId)
  await prisma.orders.createMany({
    data: [
      {
        productName: shirt.name,
        status: "pending",
        amount: shirt.price,
        createdAt: new Date("2025-07-20"),
        userId: vini.id,
        productId: shirt.id,
      },
      {
        productName: nike.name,
        status: "shipped",
        amount: nike.price,
        createdAt: new Date("2025-07-22"),
        userId: tilesh.id,
        productId: nike.id,
      },
    ],
  });

  console.log("✅ Seeding completed successfully.");
}

main()
  .catch((e) => {
    console.error("❌ Seeding error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
