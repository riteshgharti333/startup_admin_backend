import { asyncHandler } from "../../common/utils/asyncHandler";
import { apiResponse } from "../../common/utils/apiResponse";
import { userService } from "./user.service";
class UserController {
    getAllUsers = asyncHandler(async (_req, res) => {
        const users = await userService.getAllUsers();
        return apiResponse({
            res,
            message: "Users fetched successfully",
            data: users,
        });
    });
    getUserById = asyncHandler(async (req, res) => {
        const userId = req.params.id;
        const user = await userService.getUserById(userId);
        return apiResponse({
            res,
            message: "User fetched successfully",
            data: user,
        });
    });
    createUser = asyncHandler(async (req, res) => {
        const user = await userService.createUser(req.body);
        return apiResponse({
            res,
            statusCode: 201,
            message: "User created successfully",
            data: user,
        });
    });
    updateUser = asyncHandler(async (req, res) => {
        const userId = req.params.id;
        const user = await userService.updateUser(userId, req.body);
        return apiResponse({
            res,
            message: "User updated successfully",
            data: user,
        });
    });
    deleteUser = asyncHandler(async (req, res) => {
        const userId = req.params.id;
        await userService.deleteUser(userId);
        return apiResponse({
            res,
            message: "User deleted successfully",
            data: null,
        });
    });
}
export const userController = new UserController();
