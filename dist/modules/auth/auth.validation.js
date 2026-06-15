"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginSchema = exports.registerSchema = void 0;
const zod_1 = require("zod");
exports.registerSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z
            .string()
            .trim()
            .min(2, "Name must be at least 2 characters")
            .max(100, "Name must be at most 100 characters"),
        email: zod_1.z
            .string()
            .trim()
            .email("Invalid email address")
            .toLowerCase(),
        password: zod_1.z
            .string()
            .min(8, "Password must be at least 8 characters")
            .max(100, "Password must be at most 100 characters"),
    }),
});
exports.loginSchema = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z
            .string()
            .trim()
            .email("Invalid email address")
            .toLowerCase(),
        password: zod_1.z
            .string()
            .min(1, "Password is required"),
    }),
});
