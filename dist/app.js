"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const compression_1 = __importDefault(require("compression"));
const morgan_1 = __importDefault(require("morgan"));
const notFound_middleware_1 = require("./common/middleware/notFound.middleware");
const errorHandler_1 = require("./common/errors/errorHandler");
const routes_1 = __importDefault(require("./routes"));
const requestLogger_middleware_1 = require("./common/middleware/requestLogger.middleware");
const requestId_middleware_1 = require("./common/middleware/requestId.middleware");
const app = (0, express_1.default)();
// Security
app.use((0, helmet_1.default)());
app.use(requestId_middleware_1.requestIdMiddleware);
app.use(requestLogger_middleware_1.requestLogger);
// CORS
app.use((0, cors_1.default)({
    origin: true,
    credentials: true,
}));
// Compression
app.use((0, compression_1.default)());
// HTTP request logging
app.use((0, morgan_1.default)("combined"));
// Body parsers
app.use(express_1.default.json({ limit: "10mb" }));
app.use(express_1.default.urlencoded({ extended: true }));
// Health check
app.get("/health", (_req, res) => {
    res.status(200).json({
        success: true,
        message: "Server is running",
    });
});
// TODO: Register API routes here
// app.use("/api/v1", routes);
app.use("/api/v1", routes_1.default);
// TODO: Register global error handler here
app.use(notFound_middleware_1.notFoundMiddleware);
app.use(errorHandler_1.errorHandler);
exports.default = app;
