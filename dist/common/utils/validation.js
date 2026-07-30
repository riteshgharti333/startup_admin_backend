"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.subscribeEmailSchema = exports.updateLeadSchema = exports.createLeadSchema = exports.updateApplicationSchema = exports.createApplicationSchema = void 0;
const zod_1 = require("zod");
exports.createApplicationSchema = zod_1.z.object({
    body: zod_1.z.object({
        fullName: zod_1.z
            .string()
            .min(2, "Full name must be at least 2 characters")
            .max(100),
        email: zod_1.z.string().email("Invalid email address").toLowerCase(),
        phoneNumber: zod_1.z.string().min(10, "Invalid phone number").max(15),
        position: zod_1.z.string().min(1, "Position is required"),
        yearsOfExperience: zod_1.z.string().min(1, "Years of experience is required"),
        portfolioUrl: zod_1.z.string().optional().nullable(),
        linkedInProfile: zod_1.z.string().optional().nullable(),
        githubProfile: zod_1.z.string().optional().nullable(),
        coverLetter: zod_1.z.string().optional().nullable(),
        resumeUrl: zod_1.z.string().min(1, "Resume URL is required"),
    }),
});
exports.updateApplicationSchema = zod_1.z.object({
    body: exports.createApplicationSchema.shape.body.partial(),
});
//////////////
exports.createLeadSchema = zod_1.z.object({
    body: zod_1.z.object({
        fullName: zod_1.z
            .string()
            .min(1, "Full name is required")
            .min(2, "Name must be at least 2 characters")
            .max(100, "Name must be less than 100 characters"),
        email: zod_1.z
            .string()
            .min(1, "Email address is required")
            .email("Please enter a valid email address"),
        phone: zod_1.z
            .string()
            .regex(/^[0-9+\-\s()]{0,15}$/, "Please enter a valid phone number")
            .optional()
            .or(zod_1.z.literal("")),
        company: zod_1.z
            .string()
            .max(100, "Company name must be less than 100 characters")
            .optional()
            .or(zod_1.z.literal("")),
        service: zod_1.z.string().min(1, "Please select a service"),
        budget: zod_1.z.string().optional().or(zod_1.z.literal("")),
        details: zod_1.z
            .string()
            .max(2000, "Project details must be less than 2000 characters")
            .optional()
            .or(zod_1.z.literal("")),
    }),
});
exports.updateLeadSchema = zod_1.z.object({
    body: exports.createLeadSchema.shape.body.partial(),
});
exports.subscribeEmailSchema = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z
            .string()
            .min(1, "Email is required")
            .email("Please enter a valid email address")
            .toLowerCase()
            .trim(),
    }),
});
