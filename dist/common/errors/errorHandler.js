"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const zod_1 = require("zod");
const env_1 = require("../../config/env");
const logger_1 = require("../../config/logger");
const AppError_1 = require("./AppError");
const errorHandler = (err, _req, res, _next) => {
    // Custom application errors
    if (err instanceof AppError_1.AppError) {
        if (err.statusCode >= 500) {
            logger_1.logger.error(err.message, {
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
    if (err instanceof zod_1.ZodError) {
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
    logger_1.logger.error(err instanceof Error ? err.message : "Unknown error", {
        stack: err instanceof Error ? err.stack : undefined,
    });
    res.status(500).json({
        success: false,
        message: env_1.env.NODE_ENV === "production"
            ? "Internal Server Error"
            : err instanceof Error
                ? err.message
                : "Unknown error",
    });
};
exports.errorHandler = errorHandler;
