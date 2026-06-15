"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateToken = generateToken;
exports.verifyToken = verifyToken;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const env_1 = require("../../config/env");
const JWT_SECRET = env_1.env.JWT_SECRET;
const JWT_OPTIONS = {
    expiresIn: env_1.env.JWT_EXPIRES_IN,
};
function generateToken(payload) {
    return jsonwebtoken_1.default.sign(payload, JWT_SECRET, JWT_OPTIONS);
}
function verifyToken(token) {
    return jsonwebtoken_1.default.verify(token, JWT_SECRET);
}
