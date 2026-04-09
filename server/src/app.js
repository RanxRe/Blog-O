import express from "express";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import cors from "cors";
import { ENV } from "./lib/env.js";
import { errorHandler } from "./middlewares/errorMiddleware.js";
import { authRouter } from "./routes/auth.routes.js";

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

// ERROR MIDDLEWARE :- error mdlwrs must be at last
app.use(errorHandler);
export default app;
