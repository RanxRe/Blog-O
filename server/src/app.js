import express from "express";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import cors from "cors";
import { ENV } from "./lib/env.js";

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
app.use("/", (req, res) => {
  res.send("Hello from server");
});

export default app;
