"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppError = void 0;
class AppError extends Error {
    statusCode;
    isOperational;
    details;
    constructor({ statusCode, message, isOperational = true, details, }) {
        super(message);
        this.name = "AppError";
        this.statusCode = statusCode;
        this.isOperational = isOperational;
        this.details = details;
        // Maintain proper prototype chain
        Object.setPrototypeOf(this, new.target.prototype);
        // Capture stack trace (V8 engines like Node.js)
        Error.captureStackTrace?.(this, this.constructor);
    }
}
exports.AppError = AppError;
