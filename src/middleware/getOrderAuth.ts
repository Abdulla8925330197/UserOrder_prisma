import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { OrderFilterDto } from "../dto/orderDto";

// Use standard Express `Request` here
export const decodeFilterToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers["authorization"]?.split(" ")[1];
  if (!token) return res.sendStatus(401);

  jwt.verify(token, process.env.JWT_SECRET || "your_jwt_secret", (err, decoded) => {
    if (err) return res.sendStatus(403);

    // Cast to your custom FilteredRequest here
    (req as any).filterPayload = decoded as OrderFilterDto;

    next();
  });
};
