import express from "express";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import cors from "cors";
import { ENV } from "./lib/env.js";
import { errorHandler } from "./middlewares/errorMiddleware.js";
import { authRouter } from "./routes/auth.routes.js";
import { userRouter } from "./routes/user.routes.js";
import { categoryRouter } from "./routes/category.routes.js";
import { blogRouter } from "./routes/blog.routes.js";
import { commentRouter } from "./routes/comment.routes.js";

const app = express();

//MIDDLEWARES
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: ENV.CLIENT_URL,
    credentials: true,
  }),
);

// ROUTES
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/category", categoryRouter);
app.use("/api/blog", blogRouter);
app.use("/api/comment", commentRouter);

// ERROR MIDDLEWARE :- error mdlwrs must be at last
app.use(errorHandler);
export default app;
