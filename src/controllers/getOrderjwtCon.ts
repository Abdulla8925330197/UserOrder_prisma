import { Request, Response } from "express";
import { generateTokenFromPayload } from "../utils/jwtgetOrder";

export const generateFilterToken = (req: Request, res: Response) => {
  const {
    userId,
    status,
    search,
    startDate,
    endDate,
    page,
    limit,
  } = req.body;

  const payload = {
    userId: userId ? Number(userId) : undefined,
    status: status || undefined,
    search: search || undefined,
    startDate: startDate ? new Date(startDate) : undefined,
    endDate: endDate ? new Date(endDate) : undefined,
    page: page ? Number(page) : 1,
    limit: limit ? Number(limit) : 10,
  };

  const token = generateTokenFromPayload(payload);
  res.json({ token });
};
