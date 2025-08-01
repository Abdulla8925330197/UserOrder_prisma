
import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { generateToken } from "../utils/jwt";
import bcrypt from "bcryptjs"

const prisma = new PrismaClient();

export const adminLoginController = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
   const admin = await prisma.admin.findUnique({
      where: { email: email.toLowerCase() }
    });
    const verify = await bcrypt.compare(password,admin?.password as string)

    if (!admin || !verify) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    
    const token = generateToken({
      id: admin.id,
      email: admin.email,
      role: "admin"
    });

    return res.json({ message: "Login successful", token });
  } catch (err: any) {
    return res.status(500).json({ message: err.message });
  }
};
