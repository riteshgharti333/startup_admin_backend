import type { Response } from "express";
export declare const PAGINATED_RESPONSE_SYMBOL: unique symbol;
interface ApiResponseOptions<T> {
    res: Response;
    statusCode?: number;
    message?: string;
    data?: T;
}
export declare function apiResponse<T>({ res, statusCode, message, data, }: ApiResponseOptions<T>): Response;
export {};
//# sourceMappingURL=apiResponse.d.ts.map