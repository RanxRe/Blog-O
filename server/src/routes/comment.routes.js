import express from "express";
import { addComment } from "../controllers/comment.controller.js";

export const commentRouter = express.Router();

commentRouter.post("/add", addComment);
