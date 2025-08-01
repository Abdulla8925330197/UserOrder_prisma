import { PrismaClient } from "@prisma/client";
import { Product } from "../dto/productDto";

const prisma = new PrismaClient();

export const createProduct = async (data: Product) => {
  return prisma.product.create({ data });
};

export const getAllProducts = async () => {
  return prisma.product.findMany();
};

export const getProductById = async (id: number) => {
  return prisma.product.findUnique({
    where: { id },
  });
};

export const updateProduct = async (id: number, data: Partial<Product>) => {
  return prisma.product.update({
    where: { id },
    data,
  });
};

export const deleteProduct = async (id: number) => {
  return prisma.product.delete({
    where: { id },
  });
};
