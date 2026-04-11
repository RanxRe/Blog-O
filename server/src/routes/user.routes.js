import express from "express";
import { getUserDetail } from "../controllers/user.controller.js";

export const userRouter = express.Router();

userRouter.get("/get-user-detail/:userId", getUserDetail);
