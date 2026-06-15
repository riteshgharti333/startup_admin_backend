"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload = void 0;
const multer_1 = __importDefault(require("multer"));
const cloudinary_1 = require("cloudinary");
const multer_storage_cloudinary_1 = require("multer-storage-cloudinary");
const env_1 = require("../../config/env");
cloudinary_1.v2.config({
    cloud_name: env_1.env.CLOUDINARY_CLOUD_NAME,
    api_key: env_1.env.CLOUDINARY_API_KEY,
    api_secret: env_1.env.CLOUDINARY_API_SECRET,
});
const storage = new multer_storage_cloudinary_1.CloudinaryStorage({
    cloudinary: cloudinary_1.v2,
    params: async (_req, file) => {
        const allowedFormats = ["pdf", "doc", "docx"];
        const ext = file.originalname.split(".").pop()?.toLowerCase();
        if (!allowedFormats.includes(ext || "")) {
            throw new Error("Only PDF, DOC, or DOCX files are allowed");
        }
        return {
            folder: "resumes",
            format: ext === "pdf" ? "pdf" : "auto",
            resource_type: "auto",
            public_id: `${Date.now()}-${file.originalname.split(".")[0]}`,
        };
    },
});
const fileFilter = (_req, file, cb) => {
    const allowedTypes = ["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"];
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    }
    else {
        cb(new Error("Only PDF, DOC, or DOCX files are allowed"), false);
    }
};
exports.upload = (0, multer_1.default)({
    storage,
    fileFilter,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
});
