"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userController = void 0;
const asyncHandler_1 = require("../../common/utils/asyncHandler");
const apiResponse_1 = require("../../common/utils/apiResponse");
const user_service_1 = require("./user.service");
class UserController {
    getAllUsers = (0, asyncHandler_1.asyncHandler)(async (_req, res) => {
        const users = await user_service_1.userService.getAllUsers();
        return (0, apiResponse_1.apiResponse)({
            res,
            message: "Users fetched successfully",
            data: users,
        });
    });
    getUserById = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
        const userId = req.params.id;
        const user = await user_service_1.userService.getUserById(userId);
        return (0, apiResponse_1.apiResponse)({
            res,
            message: "User fetched successfully",
            data: user,
        });
    });
    createUser = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
        const user = await user_service_1.userService.createUser(req.body);
        return (0, apiResponse_1.apiResponse)({
            res,
            statusCode: 201,
            message: "User created successfully",
            data: user,
        });
    });
    updateUser = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
        const userId = req.params.id;
        const user = await user_service_1.userService.updateUser(userId, req.body);
        return (0, apiResponse_1.apiResponse)({
            res,
            message: "User updated successfully",
            data: user,
        });
    });
    deleteUser = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
        const userId = req.params.id;
        await user_service_1.userService.deleteUser(userId);
        return (0, apiResponse_1.apiResponse)({
            res,
            message: "User deleted successfully",
            data: null,
        });
    });
}
exports.userController = new UserController();
