import express from "express";
import { googleLogin, login, logout, register } from "../controllers/auth.controller.js";

export const authRouter = express.Router();

authRouter.post("/signup", register);
authRouter.post("/signin", login);
authRouter.post("/google-auth", googleLogin);
authRouter.post("/logout", logout);
