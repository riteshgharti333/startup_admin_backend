import type { ErrorRequestHandler } from "express";
import { ZodError } from "zod";

import { env } from "../../config/env";
import { logger } from "../../config/logger";
import { AppError } from "./AppError";

export const errorHandler: ErrorRequestHandler = (
  err,
  _req,
  res,
  _next
) => {
  // Custom application errors
  if (err instanceof AppError) {
    if (err.statusCode >= 500) {
      logger.error(err.message, {
        stack: err.stack,
        details: err.details,
      });
    }

    res.status(err.statusCode).json({
      success: false,
      message: err.message,
      details: err.details ?? null,
    });

    return;
  }

  // Zod validation errors
  if (err instanceof ZodError) {
    res.status(400).json({
      success: false,
      message: "Validation failed",
      errors: err.issues.map((issue) => ({
        path: issue.path.join("."),
        message: issue.message,
      })),
    });

    return;
  }

  // Unexpected errors
  logger.error(err instanceof Error ? err.message : "Unknown error", {
    stack: err instanceof Error ? err.stack : undefined,
  });

  res.status(500).json({
    success: false,
    message:
      env.NODE_ENV === "production"
        ? "Internal Server Error"
        : err instanceof Error
          ? err.message
          : "Unknown error",
  });
};