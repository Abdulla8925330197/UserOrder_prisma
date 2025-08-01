import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { generateToken } from "../utils/getJwtProfile";

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || "your_secret_key";

export const loginProfileService = async (email: string, password: string) => {
  const profile = await prisma.profiles.findUnique({ where: { email } });

  const isValid = await bcrypt.compare(password, profile?.passwordHash || "");

  if (!profile || !isValid) {
    throw new Error("Invalid email or password");
  }

  const token = generateToken({
    id: profile.id,
    name: profile.name,
    email: profile.email,
  });

  return token;
};

export const getProfileFromTokenService = (token: string) => {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as {
      id: number;
      name: string;
      email: string;
    };
    return decoded;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
