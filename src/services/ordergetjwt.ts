import { PrismaClient } from "@prisma/client";
import { OrderFilterDto } from "../dto/orderDto";

const prisma = new PrismaClient();

export const getOrdersWithFilters = async ({
  userId,
  status,
  search,
  startDate,
  endDate,
  page = 1,
  limit = 10,
}: OrderFilterDto) => {
  const where: any = {
    ...(userId && { userId: Number(userId) }),
    ...(status && { status }),
    ...(startDate && endDate && {
      createdAt: {
        gte: new Date(startDate),
        lte: new Date(endDate),
      },
    }),
    ...(search && {
      product: {
        name: {
          contains: search,
          // Removed `mode` to fix Prisma 6.12 compatibility issue
        },
      },
    }),
  };

  const [orders, totalCount] = await Promise.all([
    prisma.orders.findMany({
      where,
      include: { product: true },
      skip: (page - 1) * limit,
      take: limit,
      orderBy: { createdAt: "desc" },
    }),
    prisma.orders.count({ where }),
  ]);

  return {
    data: orders,
    pagination: {
      page,
      limit,
      totalCount,
      totalPages: Math.ceil(totalCount / limit),
    },
  };
};
