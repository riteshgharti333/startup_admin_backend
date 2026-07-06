"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authService = void 0;
const AppError_1 = require("../../common/errors/AppError");
const password_1 = require("../../common/utils/password");
const cookie_1 = require("../../common/utils/cookie");
const user_repository_1 = require("../users/user.repository");
const httpStatus_1 = require("../../common/constants/httpStatus");
const messages_1 = require("../../common/constants/messages");
class AuthService {
    async login(data) {
        const user = await user_repository_1.userRepository.findByEmail(data.email);
        if (!user) {
            throw new AppError_1.AppError({
                statusCode: httpStatus_1.HTTP_STATUS.UNAUTHORIZED,
                message: messages_1.MESSAGES.INVALID_CREDENTIALS,
            });
        }
        const isPasswordValid = await (0, password_1.comparePassword)(data.password, user.password);
        if (!isPasswordValid) {
            throw new AppError_1.AppError({
                statusCode: httpStatus_1.HTTP_STATUS.UNAUTHORIZED,
                message: messages_1.MESSAGES.INVALID_CREDENTIALS,
            });
        }
        // Generate JWT token
        const token = (0, cookie_1.generateToken)({
            userId: user.id,
            email: user.email,
            role: user.role,
        });
        return {
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
            token,
        };
    }
    async me(userId) {
        const user = await user_repository_1.userRepository.findById(userId);
        if (!user) {
            throw new AppError_1.AppError({
                statusCode: httpStatus_1.HTTP_STATUS.NOT_FOUND,
                message: messages_1.MESSAGES.USER_NOT_FOUND,
            });
        }
        return {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
        };
    }
    async logout(userId) {
        const user = await user_repository_1.userRepository.findById(userId);
        if (!user) {
            throw new AppError_1.AppError({
                statusCode: httpStatus_1.HTTP_STATUS.NOT_FOUND,
                message: messages_1.MESSAGES.USER_NOT_FOUND,
            });
        }
        return {
            message: "Logged out successfully",
        };
    }
}
exports.authService = new AuthService();
