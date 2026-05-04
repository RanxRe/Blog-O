import express from "express";
import { doLike, likeCount } from "../controllers/blogLike.controller.js";
export const likeRouter = express.Router();

likeRouter.post("/do-like", doLike);
likeRouter.get("/get-like/:blogId/:userId?", likeCount);
