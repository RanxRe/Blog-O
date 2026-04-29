import express from "express";
import { addComment, getComment } from "../controllers/comment.controller.js";

export const commentRouter = express.Router();

commentRouter.post("/add", addComment);
commentRouter.get("/get/:blogId", getComment);
