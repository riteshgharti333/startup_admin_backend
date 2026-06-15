"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserSchema = exports.createUserSchema = void 0;
const zod_1 = require("zod");
exports.createUserSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z
            .string()
            .trim()
            .min(2, "Name must be at least 2 characters")
            .max(100, "Name is too long"),
        email: zod_1.z
            .string()
            .trim()
            .email("Invalid email address")
            .toLowerCase(),
        password: zod_1.z
            .string()
            .min(8, "Password must be at least 8 characters")
            .max(100, "Password is too long"),
    }),
});
exports.updateUserSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().trim().min(2).max(100).optional(),
        email: zod_1.z
            .string()
            .trim()
            .email("Invalid email address")
            .toLowerCase()
            .optional(),
    }),
});
