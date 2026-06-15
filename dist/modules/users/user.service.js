"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userService = exports.UserService = void 0;
const AppError_1 = require("../../common/errors/AppError");
const user_repository_1 = require("./user.repository");
const password_1 = require("../../common/utils/password");
const httpStatus_1 = require("../../common/constants/httpStatus");
const messages_1 = require("../../common/constants/messages");
class UserService {
    async getAllUsers() {
        return user_repository_1.userRepository.findMany();
    }
    async getUserById(id) {
        const user = await user_repository_1.userRepository.findById(id);
        if (!user) {
            throw new AppError_1.AppError({
                statusCode: httpStatus_1.HTTP_STATUS.NOT_FOUND,
                message: messages_1.MESSAGES.USER_NOT_FOUND,
            });
        }
        return user;
    }
    async createUser(data) {
        const existingUser = await user_repository_1.userRepository.findByEmail(data.email);
        if (existingUser) {
            throw new AppError_1.AppError({
                statusCode: httpStatus_1.HTTP_STATUS.CONFLICT,
                message: messages_1.MESSAGES.EMAIL_ALREADY_EXISTS,
            });
        }
        const hashedPassword = await (0, password_1.hashPassword)(data.password);
        return user_repository_1.userRepository.create({
            name: data.name,
            email: data.email,
            password: hashedPassword,
        });
    }
    async updateUser(id, data) {
        await this.getUserById(id);
        return user_repository_1.userRepository.update(id, data);
    }
    async deleteUser(id) {
        await this.getUserById(id);
        await user_repository_1.userRepository.delete(id);
    }
}
exports.UserService = UserService;
exports.userService = new UserService();
