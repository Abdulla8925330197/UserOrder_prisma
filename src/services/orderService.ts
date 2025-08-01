import { PrismaClient } from "@prisma/client";
import { Order, OrderFilterDto } from "../dto/orderDto";

const prisma = new PrismaClient();

export const getAllOrder = async (filters: OrderFilterDto) => {
  const {
    userId,
    page = 1,
    limit = 10,
    status,
    startDate,
    endDate,
  } = filters;

  const where: any = {};

  if (userId) where.userId = userId;
  if (status) where.status = status;
 
  if (startDate && endDate) {
    where.createdAt = {
      gte: startDate,
      lte: endDate,
    };
  }

  const orders = await prisma.orders.findMany({
    where,
    skip: (page - 1) * limit,
    take: limit,
   
    include: {
      profiles: true, 
    },
  });

  const total = await prisma.orders.count({ where });

  return {
    total,
    page,
    limit,
    orders,
  };
};


export const createOrder = async (data: Order) => {
  return prisma.orders.create({
    data,
  });
};







