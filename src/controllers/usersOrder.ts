import { Request, Response } from "express";
import {
loginProfileService,getProfileFromTokenService
} from "../services/profileGetService"; 
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const loginProfilewithOrder = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const token = await loginProfileService(email, password);
    res.status(200).json({ message: "Login successful", token });
  } catch (error: any) {
    res.status(401).json({ message: error.message });
  }
}; 
export const getProfileFromTokenforOrder = async (req: Request, res: Response) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Token not provided" });
  }

  try {
    const decoded = getProfileFromTokenService(token);

    
    const profile = await prisma.profiles.findUnique({
      where: { id: decoded.id },
      include: {
        Orders: true, 
      },
     
    });

    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    res.status(200).json({ message: "Profile fetched", profile });
  } catch (err: any) {
    res.status(403).json({ message: "Invalid token", error: err.message });
  }
};
 