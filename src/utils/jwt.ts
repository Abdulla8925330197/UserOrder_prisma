import jwt, { JwtPayload } from "jsonwebtoken";

const secret = process.env.JWT_SECRET || "defaultsecret";

export const verifyToken = (token: string): JwtPayload => {
  return jwt.verify(token, secret) as JwtPayload;
};

export const generateToken = (payload: object, expiresIn = "2h"): string => {
  return jwt.sign(payload, secret, { expiresIn :"2h"});
};
   