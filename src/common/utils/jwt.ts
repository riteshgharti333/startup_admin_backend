import jwt, { type Secret, type SignOptions } from "jsonwebtoken";

import { env } from "../../config/env";

interface JwtPayload {
  userId: string;
  email: string;
  role: "ADMIN" | "USER";
}

const JWT_SECRET: Secret = env.JWT_SECRET;


const JWT_OPTIONS: SignOptions = {
  expiresIn: env.JWT_EXPIRES_IN as SignOptions['expiresIn'],
};

export function generateToken(payload: JwtPayload): string {
  return jwt.sign(payload, JWT_SECRET, JWT_OPTIONS);
}

export function verifyToken(token: string): JwtPayload {
  return jwt.verify(token, JWT_SECRET) as JwtPayload;
}