"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authController = void 0;
const asyncHandler_1 = require("../../common/utils/asyncHandler");
const apiResponse_1 = require("../../common/utils/apiResponse");
const auth_service_1 = require("./auth.service");
class AuthController {
    register = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
        const result = await auth_service_1.authService.register(req.body);
        return (0, apiResponse_1.apiResponse)({
            res,
            statusCode: 201,
            message: "User registered successfully",
            data: result,
        });
    });
    login = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
        const result = await auth_service_1.authService.login(req.body);
        return (0, apiResponse_1.apiResponse)({
            res,
            message: "Login successful",
            data: result,
        });
    });
    me = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
        const profile = await auth_service_1.authService.me(req.user.userId);
        return (0, apiResponse_1.apiResponse)({
            res,
            message: "Profile fetched successfully",
            data: profile,
        });
    });
}
exports.authController = new AuthController();
