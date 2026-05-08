import JWT from "jsonwebtoken";
import { ENV } from "../lib/env.js";
import { handleError } from "../helpers/handleError.js";

export const authenticate = async (req, res, next) => {
  try {
    const token = req.cookies["access-token"];
    if (!token) {
      return next(handleError(403, "Unauthorized"));
    }
    const decodeToken = JWT.verify(token, ENV.JWT_SECRET);
    req.user = decodeToken;
    next();
  } catch (error) {
    next(500, error.message);
  }
};
