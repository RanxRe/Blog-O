import { handleError } from "../helpers/handleError.js";
import { ENV } from "../lib/env.js";
import userModel from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return next(handleError(400, "please provide all fields"));
    }
    if (password.length < 8) {
      return next(handleError(400, "password length must be 8 or more characters"));
    }
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return next(handleError(409, "user already registered"));
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new userModel({
      name,
      email,
      password: hashedPassword,
    });
    await user.save();
    res.status(200).json({
      success: true,
      message: "user registered successfully",
    });
  } catch (error) {
    next(handleError(500, error.message));
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return next(handleError(400, "please provide all fields"));
    }
    const user = await userModel.findOne({ email }).select("+password");
    if (!user) {
      return next(handleError(404, "invalid login credentials"));
    }
    const hashedPassword = user.password;
    const comparePassword = await bcrypt.compare(password, hashedPassword);
    if (!comparePassword) {
      return next(handleError(404, "invalid login credentials"));
    }
    // 🔥 REMOVE PASSWORD BEFORE RESPONSE
    const { password: pass, ...userWithoutPassword } = user._doc;

    const token = jwt.sign(
      {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        avatar: user.avatar,
      },
      ENV.JWT_SECRET,
    );

    res.cookie("access-token", token, {
      httpOnly: true,
      secure: ENV.NODE_ENV === "production",
      sameSite: ENV.NODE_ENV === "production" ? "none" : "strict",
      path: "/", //access cookie on every URL
    });

    res.status(200).json({
      success: true,
      message: "sign in successfully ",
      user: userWithoutPassword,
    });
  } catch (error) {
    next(handleError(500, error.message));
  }
};

export const googleLogin = async (req, res, next) => {
  try {
    const { name, email, avatar } = req.body;
    let user;
    user = await userModel.findOne({ email }).select("+password");
    if (!user) {
      const password = Math.round(Math.random() * 1000000).toString();
      const hashedPassword = await bcrypt.hash(password, 10);

      //   create new user
      const newUser = new userModel({
        name,
        email,
        password: hashedPassword,
        avatar,
      });
      user = await newUser.save();
    }

    // 🔥 REMOVE PASSWORD BEFORE RESPONSE
    const { password: pass, ...userWithoutPassword } = user._doc;

    const token = jwt.sign(
      {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        avatar: user.avatar,
      },
      ENV.JWT_SECRET,
    );

    res.cookie("access-token", token, {
      httpOnly: true,
      secure: ENV.NODE_ENV === "production",
      sameSite: ENV.NODE_ENV === "production" ? "none" : "strict",
      path: "/", //access cookie on every URL
    });

    res.status(200).json({
      success: true,
      message: "sign in successfully ",
      user: userWithoutPassword,
    });
  } catch (error) {
    next(handleError(500, error.message));
  }
};
