// import { Request, Response } from "express";
// import { PrismaClient } from "@prisma/client";
// import bcrypt from "bcryptjs";
// import { generateToken } from "../utils/getJwtProfile";

// const prisma = new PrismaClient();

// export const loginProfile = async (req: Request, res: Response): Promise<void> => {
//   try {
//     const { email, password } = req.body;

//     const profile = await prisma.profiles.findUnique({
//       where: { email },
//     });

//     const validPassword = await bcrypt.compare(password, profile?.passwordHash || "");

//     if (!profile || !validPassword) {
//       res.status(401).json({ message: "Invalid email or password" });
//       return;
//     }

//     //
//     const token = generateToken({
//       id: profile.id,
//       name: profile.name,
//       email: profile.email,
//     });

//     res.status(200).json({ message: "Login successful", token });
//   } catch (err: any) {
//     res.status(500).json({ message: "Login failed", error: err.message });
//   }
// };
