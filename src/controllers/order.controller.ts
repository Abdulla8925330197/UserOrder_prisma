import { Request,Response } from "express";
import { getOrdersWithFilters } from "../services/ordergetjwt";

import { OrderFilterDto } from "dto/orderDto";


export const getOrders = async (req: Request, res: Response):Promise<void> => {
  try {
    const filters:OrderFilterDto = req.body;
    const result = await getOrdersWithFilters(filters);
    res.json(result);
    return
  } catch (error) {
    console.error("Order error:", error);
    res.status(500).json({ error: "Something went wrong" });
    return
  }
};
