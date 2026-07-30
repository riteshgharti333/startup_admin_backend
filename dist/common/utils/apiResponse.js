"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PAGINATED_RESPONSE_SYMBOL = void 0;
exports.apiResponse = apiResponse;
// Create a unique Symbol as a secret marker for paginated responses
exports.PAGINATED_RESPONSE_SYMBOL = Symbol('paginated');
function apiResponse({ res, statusCode = 200, message = "Success", data, }) {
    let responseData = data;
    let pagination;
    // Check if data has our special Symbol marker (meaning it's from Pagination class)
    if (data && typeof data === 'object' && !Array.isArray(data) && exports.PAGINATED_RESPONSE_SYMBOL in data) {
        const paginatedData = data;
        // Extract the actual items array
        responseData = paginatedData.data;
        // Extract pagination metadata
        pagination = {
            nextCursor: paginatedData.nextCursor ?? null,
            hasMore: paginatedData.hasMore ?? false,
        };
    }
    const responsePayload = {
        success: true,
        message,
        data: responseData,
    };
    // Add pagination info only if it exists
    if (pagination) {
        responsePayload.pagination = pagination;
    }
    return res.status(statusCode).json(responsePayload);
}
