import jwt  from "jsonwebtoken"
import {OrderFilterDto} from "../dto/orderDto"
export const generateTokenFromPayload = (payload:OrderFilterDto) => {
  return jwt.sign(payload, process.env.JWT_SECRET || "your_jwt_secret", {
    expiresIn: "1h",
  });
};
