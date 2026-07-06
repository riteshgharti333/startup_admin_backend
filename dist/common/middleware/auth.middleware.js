"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const AppError_1 = require("../errors/AppError");
const cookie_1 = require("../utils/cookie");
const httpStatus_1 = require("../constants/httpStatus");
const messages_1 = require("../constants/messages");
const authMiddleware = (req, _res, next) => {
    // 1. Check cookie first
    let token = req.cookies?.["twipra-token"];
    // 2. Fallback to Authorization header
    if (!token) {
        const authHeader = req.headers.authorization;
        if (authHeader?.startsWith("Bearer ")) {
            token = authHeader.substring(7);
        }
    }
    // 3. No token found
    if (!token) {
        return next(new AppError_1.AppError({
            statusCode: httpStatus_1.HTTP_STATUS.UNAUTHORIZED,
            message: messages_1.MESSAGES.AUTHENTICATION_REQUIRED,
        }));
    }
    // 4. Verify token
    try {
        const payload = (0, cookie_1.verifyToken)(token);
        req.user = {
            userId: payload.userId,
            email: payload.email,
            role: payload.role,
        };
        next();
    }
    catch {
        next(new AppError_1.AppError({
            statusCode: httpStatus_1.HTTP_STATUS.UNAUTHORIZED,
            message: messages_1.MESSAGES.INVALID_OR_EXPIRED_TOKEN,
        }));
    }
};
exports.authMiddleware = authMiddleware;
