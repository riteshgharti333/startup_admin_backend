import { AppError } from "../errors/AppError";
export const notFoundMiddleware = (req, _res, next) => {
    next(new AppError({
        statusCode: 404,
        message: `Route not found: ${req.method} ${req.originalUrl}`,
    }));
};
