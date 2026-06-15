"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notFoundMiddleware = void 0;
const AppError_1 = require("../errors/AppError");
const notFoundMiddleware = (req, _res, next) => {
    next(new AppError_1.AppError({
        statusCode: 404,
        message: `Route not found: ${req.method} ${req.originalUrl}`,
    }));
};
exports.notFoundMiddleware = notFoundMiddleware;
