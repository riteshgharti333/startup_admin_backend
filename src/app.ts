import express from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import morgan from "morgan";
import { notFoundMiddleware } from "./common/middleware/notFound.middleware";
import { errorHandler } from "./common/errors/errorHandler";
import routes from "./routes";
import { requestLogger } from "./common/middleware/requestLogger.middleware";
import { requestIdMiddleware } from "./common/middleware/requestId.middleware";


const app = express();

// Security
app.use(helmet());
app.use(requestIdMiddleware);
app.use(requestLogger);

// CORS
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);
// Compression
app.use(compression());

// HTTP request logging
app.use(morgan("combined"));

// Body parsers
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));



// Health check
app.get("/health", (_req, res) => {
  res.status(200).json({
    success: true,
    message: "Server is running",
  });
});

// TODO: Register API routes here
// app.use("/api/v1", routes);
app.use("/api/v1", routes);


// TODO: Register global error handler here

app.use(notFoundMiddleware);
app.use(errorHandler);

export default app;

