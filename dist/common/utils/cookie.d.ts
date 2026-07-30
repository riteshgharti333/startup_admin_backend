import type { Response } from "express";
interface JwtPayload {
    userId: string;
    email: string;
    role: "ADMIN" | "USER";
}
export declare function generateToken(payload: JwtPayload): string;
export declare function setTokenCookie(res: Response, token: string): void;
export declare function clearTokenCookie(res: Response): void;
export declare function verifyToken(token: string): JwtPayload;
export {};
//# sourceMappingURL=cookie.d.ts.map