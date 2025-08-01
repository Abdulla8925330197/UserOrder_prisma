import { Request, Response } from "express";
import * as OrderService from "../services/orderService";
import { Order, OrderFilterDto } from "../dto/orderDto";


export const getAllOrder = async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      userId,
      page = "1",
      limit = "5",
      status,
      search,
      startDate,
      endDate,
    } = req.query;

    const pageNumber = parseInt(page as string, 10);
    const pageSize = parseInt(limit as string, 10);

    const filters: OrderFilterDto = {
      userId: userId ? Number(userId) : undefined,
      status: status as string | undefined,
      search: search as string | undefined,
      startDate: startDate ? new Date(startDate as string) : undefined,
      endDate: endDate ? new Date(endDate as string) : undefined,
      page: pageNumber,
      limit: pageSize,
    };

    const orders = await OrderService.getAllOrder(filters);
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ message: "Order get method failed", error: err });
  }
};


export const createOrder = async (req: Request, res: Response) => {
  const data: Order = req.body;
  try {
    const order = await OrderService.createOrder(data);
    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: "Order creation failed", error });
  }
};








