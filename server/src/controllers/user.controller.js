import { handleError } from "../helpers/handleError.js";
import userModel from "../models/user.model.js";

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
