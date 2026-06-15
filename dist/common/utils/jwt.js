import jwt from "jsonwebtoken";
import { env } from "../../config/env";
const JWT_SECRET = env.JWT_SECRET;
const JWT_OPTIONS = {
    expiresIn: env.JWT_EXPIRES_IN,
};
export function generateToken(payload) {
    return jwt.sign(payload, JWT_SECRET, JWT_OPTIONS);
}
export function verifyToken(token) {
    return jwt.verify(token, JWT_SECRET);
}
