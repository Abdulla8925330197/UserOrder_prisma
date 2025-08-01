import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your_secret_key";


interface ProfileTokenPayload {
  id: number;
  name: string;
  email: string;
}

export const generateToken = (profile: ProfileTokenPayload): string => {
  return jwt.sign(profile, JWT_SECRET, {
    expiresIn: "1d", 
  });
};
