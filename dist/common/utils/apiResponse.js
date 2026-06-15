"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiResponse = apiResponse;
function apiResponse({ res, statusCode = 200, message = "Success", data, }) {
    return res.status(statusCode).json({
        success: true,
        message,
        data,
    });
}
