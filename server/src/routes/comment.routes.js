import express from "express";
import {
  addComment,
  commentCount,
  deleteComments,
  getAllComments,
  getComment,
} from "../controllers/comment.controller.js";

export const commentRouter = express.Router();

commentRouter.post("/add", addComment);
commentRouter.delete("/delete/:commentId", deleteComments);
commentRouter.get("/get/:blogId", getComment);
commentRouter.get("/get-all-comments", getAllComments);
commentRouter.get("/get-count/:blogId", commentCount);
