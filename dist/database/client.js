"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDatabase = exports.prisma = void 0;
const client_1 = require("@prisma/client");
exports.prisma = global.prisma ??
    new client_1.PrismaClient({
        log: process.env.NODE_ENV === "development"
            ? ["query", "info", "warn", "error"]
            : ["error"],
    });
// Add this function to test and log database connection
const connectDatabase = async () => {
    try {
        await exports.prisma.$connect();
        console.log("✅ Database connected successfully");
        // Or use your logger:
        // logger.info("Database connected successfully");
        return true;
    }
    catch (error) {
        console.error("❌ Database connection failed:", error);
        // logger.error("Database connection failed", { error });
        return false;
    }
};
exports.connectDatabase = connectDatabase;
if (process.env.NODE_ENV !== "production") {
    global.prisma = exports.prisma;
}
