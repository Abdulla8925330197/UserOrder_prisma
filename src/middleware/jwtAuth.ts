
import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwt";

export const verifyAdmin = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Token missing" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = verifyToken(token); 

    if (decoded.role !== "admin") {
      return res.status(403).json({ message: "Access denied: Admins only" });
    }

    
    (req as any).user = decoded;

  
    next();
  } catch (err) {
    return res.status(403).json({ message: "Invalid or expired token" });
  }
};
