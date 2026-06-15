import { AppError } from "../errors/AppError";
import { HTTP_STATUS } from "../constants/httpStatus";
export const authorize = (...allowedRoles) => (req, _res, next) => {
    const user = req.user;
    if (!user) {
        return next(new AppError({
            statusCode: HTTP_STATUS.UNAUTHORIZED,
            message: "Authentication required",
        }));
    }
    // This assumes you'll later add `role` to req.user.
    const role = user.role;
    if (!role || !allowedRoles.includes(role)) {
        return next(new AppError({
            statusCode: HTTP_STATUS.FORBIDDEN,
            message: "You do not have permission to perform this action",
        }));
    }
    next();
};
