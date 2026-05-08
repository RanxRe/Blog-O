import express from "express";
import {
  deleteUser,
  getAllUsers,
  getUserDetail,
  updateUserDetail,
} from "../controllers/user.controller.js";
import upload from "../lib/multer.js";
import { authenticate } from "../middlewares/auth.middleware.js";

export const userRouter = express.Router();
userRouter.use(authenticate);
userRouter.get("/get-user-detail/:userId", getUserDetail);
userRouter.get("/get-all-user", getAllUsers);
userRouter.delete("/delete/:userId", deleteUser);
//                     File name coming from formData
userRouter.put("/update-user/:userId", upload.single("file"), updateUserDetail);
