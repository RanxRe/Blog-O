import express from "express";
import {
  addCategory,
  deleteCategory,
  getAllCategory,
  getCategory,
  updateCategory,
} from "../controllers/category.controller.js";

export const categoryRouter = express.Router();

categoryRouter.post("/add", addCategory);
categoryRouter.get("/get-all", getAllCategory);
categoryRouter.get("/get/:categoryId", getCategory);
categoryRouter.put("/update/:categoryId", updateCategory);
categoryRouter.delete("/delete/:categoryId", deleteCategory);
