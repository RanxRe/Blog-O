import express from "express";
import {
  addComment,
  commentCount,
  deleteComments,
  getAllComments,
  getComment,
} from "../controllers/comment.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";

export const commentRouter = express.Router();

commentRouter.post("/add", authenticate, addComment);
commentRouter.delete("/delete/:commentId", authenticate, deleteComments);
commentRouter.get("/get-all-comments", authenticate, getAllComments);

commentRouter.get("/get/:blogId", getComment);
commentRouter.get("/get-count/:blogId", commentCount);
