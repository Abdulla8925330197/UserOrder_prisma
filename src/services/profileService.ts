import { PrismaClient } from "@prisma/client";
import { ProfileCreateDto } from "../dto/profileDto";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export const createProfile = async (data: ProfileCreateDto) => {
  const {id, name, email, password } = data;

  const passwordHash = await bcrypt.hash(password, 10);

  return prisma.profiles.create({
    data: {
      id,
      name,
      email,
      passwordHash
    },
  });
};

export const getAllProfiles = async () => {
  return prisma.profiles.findMany();
};
