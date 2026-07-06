"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authController = void 0;
const asyncHandler_1 = require("../../common/utils/asyncHandler");
const apiResponse_1 = require("../../common/utils/apiResponse");
const auth_service_1 = require("./auth.service");
const cookie_1 = require("../../common/utils/cookie");
class AuthController {
    constructor() {
        this.login = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
            const result = await auth_service_1.authService.login(req.body);
            //  Set token in cookie 
            (0, cookie_1.setTokenCookie)(res, result.token);
            return (0, apiResponse_1.apiResponse)({
                res,
                message: "Login successful",
                data: {
                    user: result.user,
                },
            });
        });
        this.me = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
            const profile = await auth_service_1.authService.me(req.user.userId);
            return (0, apiResponse_1.apiResponse)({
                res,
                message: "Profile fetched successfully",
                data: profile,
            });
        });
        this.logout = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
            const result = await auth_service_1.authService.logout(req.user.userId);
            //  Clear cookie
            (0, cookie_1.clearTokenCookie)(res);
            return (0, apiResponse_1.apiResponse)({
                res,
                message: result.message,
            });
        });
    }
}
exports.authController = new AuthController();
