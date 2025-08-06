import { Request } from "express";
import { OrderFilterDto } from "../dto/orderDto";

export interface FilteredRequest extends Request {
  filterPayload: OrderFilterDto;
}
