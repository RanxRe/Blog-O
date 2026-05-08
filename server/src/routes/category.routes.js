import express from "express";
import {
  addCategory,
  deleteCategory,
  getAllCategory,
  getCategory,
  updateCategory,
} from "../controllers/category.controller.js";
import { authenticateAdmin } from "../middlewares/auth.admin.middleware.js";

export const categoryRouter = express.Router();

categoryRouter.post("/add", authenticateAdmin, addCategory);
categoryRouter.get("/get/:categoryId", authenticateAdmin, getCategory);
categoryRouter.put("/update/:categoryId", authenticateAdmin, updateCategory);
categoryRouter.delete("/delete/:categoryId", authenticateAdmin, deleteCategory);

categoryRouter.get("/get-all", getAllCategory);
