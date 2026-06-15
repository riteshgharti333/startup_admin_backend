"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const app_1 = __importDefault(require("./app"));
const env_1 = require("./config/env");
const logger_1 = require("./config/logger");
const client_1 = require("./database/client"); // Import the connect function
const server = http_1.default.createServer(app_1.default);
// Connect to database before starting server
const startServer = async () => {
    try {
        // Test database connection
        const isConnected = await (0, client_1.connectDatabase)();
        if (!isConnected) {
            logger_1.logger.error("Failed to connect to database. Exiting...");
            process.exit(1);
        }
        // Optional: Run a simple query to verify connection
        await client_1.prisma.$queryRaw `SELECT 1`;
        logger_1.logger.info("Database connection verified with test query");
        // Start server
        server.listen(env_1.env.PORT, () => {
            logger_1.logger.info(`Server listening on port ${env_1.env.PORT}`);
        });
    }
    catch (error) {
        logger_1.logger.error("Failed to start server", { error });
        process.exit(1);
    }
};
// Graceful shutdown with database disconnection
const gracefulShutdown = async (signal) => {
    logger_1.logger.info(`${signal} received. Starting graceful shutdown...`);
    server.close(async () => {
        logger_1.logger.info("HTTP server closed.");
        // Close database connection
        await client_1.prisma.$disconnect();
        logger_1.logger.info("Database connection closed.");
        process.exit(0);
    });
};
process.on("SIGINT", gracefulShutdown);
process.on("SIGTERM", gracefulShutdown);
process.on("uncaughtException", async (error) => {
    logger_1.logger.error("Uncaught Exception", { error });
    await client_1.prisma.$disconnect();
    process.exit(1);
});
process.on("unhandledRejection", async (reason) => {
    logger_1.logger.error("Unhandled Rejection", { reason });
    await client_1.prisma.$disconnect();
    process.exit(1);
});
// Start the application
startServer();
