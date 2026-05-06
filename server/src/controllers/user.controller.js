import { handleError } from "../helpers/handleError.js";
import cloudinary from "../lib/cloudinary.js";
import userModel from "../models/user.model.js";
import bcrypt from "bcryptjs";

export const getUserDetail = async (req, res, next) => {
  try {
    const { userId } = req.params;
    if (!userId) {
      return next(handleError(400, "Please provide userId"));
    }
    const user = await userModel.findOne({ _id: userId }).lean().exec();
    if (!user) {
      return next(handleError(404, "User not found"));
    }
    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    return next(handleError(500, error.message));
  }
};

export const getAllUsers = async (req, res, next) => {
  try {
    const user = await userModel.find().sort({ createdAt: -1 }).lean();
    if (!user) {
      return next(handleError(404, "User not found"));
    }
    res.status(200).json({
      success: true,
      user,
      totalCount: user.length,
    });
  } catch (error) {
    return next(handleError(500, error.message));
  }
};

export const updateUserDetail = async (req, res, next) => {
  try {
    const data = JSON.parse(req.body.data); // coz we sent data from frontend in stringified so it changes the string to json object
    const { userId } = req.params;
    const user = await userModel.findById(userId);

    user.name = data.name;
    user.email = data.email;
    user.bio = data.bio;
    if (data.password && data.password.length >= 8) {
      const hashedPassword = await bcrypt.hash(data.password, 10);
      user.password = hashedPassword;
    }

    // Upload the image
    if (req.file) {
      try {
        const uploadResult = await cloudinary.uploader.upload(req.file.path, {
          folder: "blog-o-app",
          resource_type: "auto",
        });
        // save image URL
        user.avatar = uploadResult.secure_url;
      } catch (error) {
        next(handleError(500, error.message));
      }
    }
    await user.save();

    res.status(200).json({
      success: true,
      message: "Profile updated",
      user,
    });
  } catch (error) {
    return next(handleError(500, error.message));
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const users = await userModel.findByIdAndDelete(userId);
    if (!users) {
      return next(handleError(404, "User not found"));
    }
    res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    return next(handleError(500, error.message));
  }
};
