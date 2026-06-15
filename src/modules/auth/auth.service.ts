import { AppError } from "../../common/errors/AppError";
import { comparePassword, hashPassword } from "../../common/utils/password";
import { generateToken } from "../../common/utils/jwt";
import { userRepository } from "../users/user.repository";
import { HTTP_STATUS } from "../../common/constants/httpStatus";
import { MESSAGES } from "../../common/constants/messages";

interface RegisterDto {
  name: string;
  email: string;
  password: string;
}

interface LoginDto {
  email: string;
  password: string;
}

class AuthService {
  async register(data: RegisterDto) {
    const existingUser = await userRepository.findByEmail(data.email);

    if (existingUser) {
      throw new AppError({
        statusCode: HTTP_STATUS.CONFLICT,
        message: MESSAGES.EMAIL_ALREADY_EXISTS,
      });
    }

    const hashedPassword = await hashPassword(data.password);

    const user = await userRepository.create({
      name: data.name,
      email: data.email,
      password: hashedPassword,
    });

    const token = generateToken({
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

  async login(data: LoginDto) {
    const user = await userRepository.findByEmail(data.email);

    if (!user) {
      throw new AppError({
        statusCode: HTTP_STATUS.UNAUTHORIZED,
        message: MESSAGES.INVALID_CREDENTIALS,
      });
    }

    const isPasswordValid = await comparePassword(data.password, user.password);

    if (!isPasswordValid) {
      throw new AppError({
        statusCode: HTTP_STATUS.CONFLICT,
        message: "Invalid Email & Password",
      });
    }

    const token = generateToken({
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

  async me(userId: string) {
    const user = await userRepository.findById(userId);

    if (!user) {
      throw new AppError({
        statusCode: HTTP_STATUS.NOT_FOUND,
        message: MESSAGES.USER_NOT_FOUND,
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

export const authService = new AuthService();
