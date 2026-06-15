import { AppError } from "../../common/errors/AppError";
import { userRepository } from "./user.repository";
import { hashPassword } from "../../common/utils/password";
import { HTTP_STATUS } from "../../common/constants/httpStatus";
import { MESSAGES } from "../../common/constants/messages";
export class UserService {
    async getAllUsers() {
        return userRepository.findMany();
    }
    async getUserById(id) {
        const user = await userRepository.findById(id);
        if (!user) {
            throw new AppError({
                statusCode: HTTP_STATUS.NOT_FOUND,
                message: MESSAGES.USER_NOT_FOUND,
            });
        }
        return user;
    }
    async createUser(data) {
        const existingUser = await userRepository.findByEmail(data.email);
        if (existingUser) {
            throw new AppError({
                statusCode: HTTP_STATUS.CONFLICT,
                message: MESSAGES.EMAIL_ALREADY_EXISTS,
            });
        }
        const hashedPassword = await hashPassword(data.password);
        return userRepository.create({
            name: data.name,
            email: data.email,
            password: hashedPassword,
        });
    }
    async updateUser(id, data) {
        await this.getUserById(id);
        return userRepository.update(id, data);
    }
    async deleteUser(id) {
        await this.getUserById(id);
        await userRepository.delete(id);
    }
}
export const userService = new UserService();
