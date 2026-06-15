"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const AppError_1 = require("../errors/AppError");
const jwt_1 = require("../utils/jwt");
const httpStatus_1 = require("../constants/httpStatus");
const messages_1 = require("../constants/messages");
const authMiddleware = (req, _res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith("Bearer ")) {
        return next(new AppError_1.AppError({
            statusCode: httpStatus_1.HTTP_STATUS.UNAUTHORIZED,
            message: messages_1.MESSAGES.AUTHENTICATION_REQUIRED,
        }));
    }
    const token = authHeader.substring(7);
    try {
        const payload = (0, jwt_1.verifyToken)(token);
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
