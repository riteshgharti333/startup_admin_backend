"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const zod_1 = require("zod");
const client_1 = require("@prisma/client");
const env_1 = require("../../config/env");
const logger_1 = require("../../config/logger");
const AppError_1 = require("./AppError");
const errorHandler = (err, _req, res, _next) => {
    // ============================================
    // 1. Custom Application Errors
    // ============================================
    if (err instanceof AppError_1.AppError) {
        // Log server errors
        if (err.statusCode >= 500) {
            logger_1.logger.error("Application Error:", {
                message: err.message,
                statusCode: err.statusCode,
                stack: err.stack,
            });
        }
        res.status(err.statusCode).json({
            success: false,
            message: err.message,
            ...(err.details ? { details: err.details } : {}),
        });
        return;
    }
    // ============================================
    // 2. Zod Validation Errors
    // ============================================
    if (err instanceof zod_1.ZodError) {
        logger_1.logger.warn("Validation Error:", {
            errors: err.issues,
        });
        res.status(400).json({
            success: false,
            message: "Validation failed",
            errors: err.issues.map((issue) => ({
                field: issue.path.join("."),
                message: issue.message,
            })),
        });
        return;
    }
    // ============================================
    // 3. Prisma Database Errors
    // ============================================
    if (err instanceof client_1.Prisma.PrismaClientKnownRequestError) {
        logger_1.logger.error("Database Error:", {
            code: err.code,
            message: err.message,
            meta: err.meta,
        });
        // Handle specific Prisma error codes
        switch (err.code) {
            case "P2002": // Unique constraint violation
                res.status(409).json({
                    success: false,
                    message: "A record with this value already exists.",
                });
                break;
            case "P2025": // Record not found
                res.status(404).json({
                    success: false,
                    message: "Record not found.",
                });
                break;
            case "P2003": // Foreign key constraint failed
                res.status(400).json({
                    success: false,
                    message: "Invalid reference. Related record does not exist.",
                });
                break;
            default:
                res.status(500).json({
                    success: false,
                    message: "A database error occurred. Please try again later.",
                });
        }
        return;
    }
    // Prisma Client Validation Error
    if (err instanceof client_1.Prisma.PrismaClientValidationError) {
        logger_1.logger.error("Prisma Validation Error:", {
            message: err.message,
        });
        res.status(400).json({
            success: false,
            message: "Invalid data provided.",
        });
        return;
    }
    // Prisma Client Initialization Error (Connection issues)
    if (err instanceof client_1.Prisma.PrismaClientInitializationError) {
        logger_1.logger.error("Database Connection Error:", {
            message: err.message,
        });
        res.status(503).json({
            success: false,
            message: "Service temporarily unavailable. Please try again later.",
        });
        return;
    }
    // ============================================
    // 4. JWT Errors
    // ============================================
    if (err.name === "JsonWebTokenError" || err.name === "TokenExpiredError") {
        res.status(401).json({
            success: false,
            message: "Invalid or expired token. Please login again.",
        });
        return;
    }
    // ============================================
    // 5. Multer File Upload Errors
    // ============================================
    if (err.name === "MulterError") {
        res.status(400).json({
            success: false,
            message: `File upload error: ${err.message}`,
        });
        return;
    }
    // ============================================
    // 6. Unknown / Unexpected Errors
    // ============================================
    logger_1.logger.error("Unexpected Error:", {
        message: err instanceof Error ? err.message : "Unknown error",
        stack: err instanceof Error ? err.stack : undefined,
    });
    const statusCode = err.statusCode || 500;
    const message = determineErrorMessage(err);
    res.status(statusCode).json({
        success: false,
        message,
    });
};
exports.errorHandler = errorHandler;
/**
 * Determine the appropriate error message based on environment and error type
 */
function determineErrorMessage(err) {
    // In production, never expose internal error details
    if (env_1.env.NODE_ENV === "production") {
        return "Internal server error. Please try again later.";
    }
    // In development, show actual error message
    if (err instanceof Error) {
        return err.message || "An unexpected error occurred.";
    }
    return "An unexpected error occurred.";
}
