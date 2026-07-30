import type { NextFunction, Request, Response } from "express";
type UserRole = "ADMIN" | "USER";
export declare const authorize: (...allowedRoles: UserRole[]) => (req: Request, _res: Response, next: NextFunction) => void;
export {};
//# sourceMappingURL=authorize.middleware.d.ts.map