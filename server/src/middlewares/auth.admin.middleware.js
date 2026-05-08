import JWT from "jsonwebtoken";
import { ENV } from "../lib/env.js";
import { handleError } from "../helpers/handleError.js";

export const authenticateAdmin = async (req, res, next) => {
  try {
    const token = req.cookies["access-token"];
    if (!token) {
      return next(handleError(403, "Unauthorized"));
    }
    const decodeToken = JWT.verify(token, ENV.JWT_SECRET);
    if (decodeToken.role === "admin") {
      req.user = decodeToken;
      next();
    } else {
      return next(handleError(403, "Unauthorized"));
    }
  } catch (error) {
    next(500, error.message);
  }
};
