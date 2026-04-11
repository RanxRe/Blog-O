import express from "express";
import { getUserDetail, updateUserDetail } from "../controllers/user.controller.js";
import upload from "../lib/multer.js";

export const userRouter = express.Router();

userRouter.get("/get-user-detail/:userId", getUserDetail);
//                     File name coming from formData
userRouter.put("/update-user/:userId", upload.single("file"), updateUserDetail);
