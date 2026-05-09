import express from "express";
import { googleLogin, login, logout, register } from "../controllers/auth.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";
import { authLimiter } from "../middlewares/rateLimit.middleware.js";

export const authRouter = express.Router();

authRouter.post("/signup", authLimiter, register);
authRouter.post("/signin", authLimiter, login);
authRouter.post("/google-auth", googleLogin);
authRouter.post("/logout", authenticate, logout);
