"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createApplicationSchema = void 0;
const zod_1 = require("zod");
exports.createApplicationSchema = zod_1.z.object({
    body: zod_1.z.object({
        data: zod_1.z
            .string()
            .transform((str) => JSON.parse(str))
            .pipe(zod_1.z.object({
            fullName: zod_1.z
                .string()
                .min(2, "Full name must be at least 2 characters")
                .max(100),
            email: zod_1.z.string().email("Invalid email address").toLowerCase(),
            phoneNumber: zod_1.z.string().min(10, "Invalid phone number").max(15),
            position: zod_1.z.string().min(1, "Position is required"),
            yearsOfExperience: zod_1.z
                .string()
                .min(1, "Years of experience is required"),
            portfolioUrl: zod_1.z
                .string()
                .url("Invalid portfolio URL")
                .nullable()
                .optional(),
            linkedInProfile: zod_1.z
                .string()
                .url("Invalid LinkedIn URL")
                .nullable()
                .optional(),
            githubProfile: zod_1.z
                .string()
                .url("Invalid GitHub URL")
                .nullable()
                .optional(),
            coverLetter: zod_1.z.string().optional(),
        })),
    }),
});
