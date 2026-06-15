"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorize = void 0;
const AppError_1 = require("../errors/AppError");
const httpStatus_1 = require("../constants/httpStatus");
const authorize = (...allowedRoles) => (req, _res, next) => {
    const user = req.user;
    if (!user) {
        return next(new AppError_1.AppError({
            statusCode: httpStatus_1.HTTP_STATUS.UNAUTHORIZED,
            message: "Authentication required",
        }));
    }
    // This assumes you'll later add `role` to req.user.
    const role = user.role;
    if (!role || !allowedRoles.includes(role)) {
        return next(new AppError_1.AppError({
            statusCode: httpStatus_1.HTTP_STATUS.FORBIDDEN,
            message: "You do not have permission to perform this action",
        }));
    }
    next();
};
exports.authorize = authorize;
