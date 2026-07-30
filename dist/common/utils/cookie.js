"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateToken = generateToken;
exports.setTokenCookie = setTokenCookie;
exports.clearTokenCookie = clearTokenCookie;
exports.verifyToken = verifyToken;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const env_1 = require("../../config/env");
const JWT_SECRET = env_1.env.JWT_SECRET;
const JWT_OPTIONS = {
    expiresIn: env_1.env.JWT_EXPIRES_IN || "7d",
};
function generateToken(payload) {
    return jsonwebtoken_1.default.sign(payload, JWT_SECRET, JWT_OPTIONS);
}
function setTokenCookie(res, token) {
    res.cookie("twipra-token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: 120 * 24 * 60 * 60 * 1000,
        path: "/",
    });
}
function clearTokenCookie(res) {
    res.cookie("twipra-token", "", {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: 0,
        path: "/",
    });
}
function verifyToken(token) {
    return jsonwebtoken_1.default.verify(token, JWT_SECRET);
}
