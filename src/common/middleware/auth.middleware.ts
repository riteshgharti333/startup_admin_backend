import type { NextFunction, Request, Response } from "express";

import { AppError } from "../errors/AppError";
import { verifyToken } from "../utils/jwt";
import { HTTP_STATUS } from "../constants/httpStatus";
import { MESSAGES } from "../constants/messages";

export const authMiddleware = (
  req: Request,
  _res: Response,
  next: NextFunction,
): void => {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith("Bearer ")) {
    return next(
      new AppError({
        statusCode: HTTP_STATUS.UNAUTHORIZED,
        message: MESSAGES.AUTHENTICATION_REQUIRED,
      }),
    );
  }

  const token = authHeader.substring(7);

  try {
    const payload = verifyToken(token);

    req.user = {
      userId: payload.userId,
      email: payload.email,
      role: payload.role,
    };

    next();
  } catch {
    next(
      new AppError({
        statusCode: HTTP_STATUS.UNAUTHORIZED,
        message: MESSAGES.INVALID_OR_EXPIRED_TOKEN,
      }),
    );
  }
};
