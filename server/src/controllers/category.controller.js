import { handleError } from "../helpers/handleError.js";
import categoryModel from "../models/category.model.js";

export const addCategory = async (req, res, next) => {
  try {
    const { name, slug } = req.body;
    const category = new categoryModel({
      name,
      slug,
    });
    await category.save();
    res.status(200).json({
      success: true,
      message: "Category added successfully",
    });
  } catch (error) {
    if (error.code === 11000) {
      return next(handleError(400, "Slug must be unique"));
    }
    next(handleError(500, error.message));
  }
};

export const getCategory = async (req, res, next) => {
  try {
    const { categoryId } = req.params;

    if (!categoryId) {
      return next(handleError(404, "No category id found"));
    }

    const category = await categoryModel.findById(categoryId);
    if (!category) {
      return next(handleError(404, "No categories found"));
    }
    res.status(200).json({
      success: true,
      category,
    });
  } catch (error) {
    next(handleError(500, error.message));
  }
};

export const updateCategory = async (req, res, next) => {
  try {
    const { name, slug } = req.body;
    const { categoryId } = req.params;
    const category = await categoryModel.findByIdAndUpdate(
      categoryId,
      { name, slug },
      { new: true },
    );
    res.status(200).json({
      success: true,
      message: "Category updated successfully",
      category,
    });
  } catch (error) {
    if (error.code === 11000) {
      return next(handleError(400, "Slug must be unique"));
    }
    next(handleError(500, error.message));
  }
};

export const deleteCategory = async (req, res, next) => {
  try {
    const { categoryId } = req.params;
    const category = await categoryModel.findByIdAndDelete(categoryId);
    res.status(200).json({
      success: true,
      message: "Category deleted successfully",
    });
  } catch (error) {
    next(handleError(500, error.message));
  }
};

export const getAllCategory = async (req, res, next) => {
  try {
    const category = await categoryModel.find().sort({ createdAt: -1 }).lean().exec();
    if (!category) {
      return next(handleError(404, "No categories found"));
    }
    res.status(200).json({
      success: true,
      totalCount: category.length,
      category,
    });
  } catch (error) {
    next(handleError(500, error.message));
  }
};
