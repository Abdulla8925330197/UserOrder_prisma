import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  
  const hashedAdminPassword = await bcrypt.hash("Abd@123", 10);

  
  await prisma.admin.create({
    data: {
      email: "abd@gmail.com",
      password: hashedAdminPassword,
      role: "admin",
    },
  });

  
  await prisma.profiles.createMany({
    data: [
      {
        name: "Vini",
        email: "vini@example.com",
        passwordHash: await bcrypt.hash("vini123", 10),
      },
      {
        name: "Tilesh",
        email: "tilesh@example.com",
        passwordHash: await bcrypt.hash("tilesh123", 10),
      },
    ],
  });

  
  await prisma.product.createMany({
    data: [
      {
        name: "shirt",
        description: "Comfortable cotton t-shirt",
        price: 19.99,
      },
      {
        name: "Nike",
        description: "Running shoes",
        price: 49.99,
      },
    ],
  });

  
  const user1 = await prisma.profiles.findUnique({ where: { email: "vini@example.com" } });
  const user2 = await prisma.profiles.findUnique({ where: { email: "tilesh@example.com" } });

  if (!user1 || !user2) {
    throw new Error(" One or both users not found.");
  }

 
  await prisma.orders.createMany({
    data: [
      {
        productName: "shirt",
        status: "pending",
        amount: 19.99,
        createdAt: new Date("2025-07-20"),
        userId: user1.id,
      },
      {
        productName: "Nike",
        status: "shipped",
        amount: 49.99,
        createdAt: new Date("2025-07-22"),
        userId: user2.id,
      },
    ],
  });

  console.log(" Seed completed.");
}

main()
  .catch((e) => {
    console.error(" Seeding error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
