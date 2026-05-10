import express from "express";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import { ENV } from "./lib/env.js";
import { errorHandler } from "./middlewares/errorMiddleware.js";
import { authRouter } from "./routes/auth.routes.js";
import { userRouter } from "./routes/user.routes.js";
import { categoryRouter } from "./routes/category.routes.js";
import { blogRouter } from "./routes/blog.routes.js";
import { commentRouter } from "./routes/comment.routes.js";
import { likeRouter } from "./routes/like.routes.js";
import { apiLimiter } from "./middlewares/rateLimit.middleware.js";
import helmet from "helmet";
import compression from "compression";

const app = express();
app.set("trust proxy", 1);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//MIDDLEWARES
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],

        scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'"],

        styleSrc: ["'self'", "'unsafe-inline'"],

        imgSrc: ["'self'", "data:", "https://res.cloudinary.com"],

        connectSrc: ["'self'"],

        fontSrc: ["'self'", "data:"],
      },
    },
  }),
);
app.use(compression());
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());

const allowedOrigins = ["http://localhost:5173", ENV.CLIENT_URL];
app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  }),
);

app.use(apiLimiter);

// ROUTES
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/category", categoryRouter);
app.use("/api/blog", blogRouter);
app.use("/api/comment", commentRouter);
app.use("/api/like", likeRouter);

//  PRODUCTION FRONTEND
if (ENV.NODE_ENV === "production") {
  const clientPath = path.join(__dirname, "../../dist/client");

  app.use(express.static(clientPath));

  app.get("*", (req, res) => {
    res.sendFile(path.join(clientPath, "index.html"));
  });
}

// ERROR MIDDLEWARE :- error mdlwrs must be at last
app.use(errorHandler);
export default app;
