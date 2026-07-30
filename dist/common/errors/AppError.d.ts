export interface AppErrorOptions {
    statusCode: number;
    message: string;
    isOperational?: boolean;
    details?: unknown;
}
export declare class AppError extends Error {
    readonly statusCode: number;
    readonly isOperational: boolean;
    readonly details?: unknown;
    constructor({ statusCode, message, isOperational, details, }: AppErrorOptions);
}
//# sourceMappingURL=AppError.d.ts.map