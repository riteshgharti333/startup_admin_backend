"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authService = void 0;
const AppError_1 = require("../../common/errors/AppError");
const password_1 = require("../../common/utils/password");
const jwt_1 = require("../../common/utils/jwt");
const user_repository_1 = require("../users/user.repository");
const httpStatus_1 = require("../../common/constants/httpStatus");
const messages_1 = require("../../common/constants/messages");
class AuthService {
    async register(data) {
        const existingUser = await user_repository_1.userRepository.findByEmail(data.email);
        if (existingUser) {
            throw new AppError_1.AppError({
                statusCode: httpStatus_1.HTTP_STATUS.CONFLICT,
                message: messages_1.MESSAGES.EMAIL_ALREADY_EXISTS,
            });
        }
        const hashedPassword = await (0, password_1.hashPassword)(data.password);
        const user = await user_repository_1.userRepository.create({
            name: data.name,
            email: data.email,
            password: hashedPassword,
        });
        const token = (0, jwt_1.generateToken)({
            userId: user.id,
            email: user.email,
            role: user.role,
        });
        return {
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
            },
            token,
        };
    }
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
                statusCode: httpStatus_1.HTTP_STATUS.CONFLICT,
                message: "Invalid Email & Password",
            });
        }
        const token = (0, jwt_1.generateToken)({
            userId: user.id,
            email: user.email,
            role: user.role,
        });
        return {
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
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
}
exports.authService = new AuthService();
