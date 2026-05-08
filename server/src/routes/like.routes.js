import express from "express";
import { doLike, likeCount } from "../controllers/blogLike.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";
export const likeRouter = express.Router();

likeRouter.post("/do-like", authenticate, doLike);
likeRouter.get("/get-like/:blogId/:userId?", likeCount);
