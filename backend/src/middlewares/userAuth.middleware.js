import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
import { USER_ACCESS_TOKEN } from "../constants/tokenNames.js";

export const userAuth = asyncHandler(async (req, _, next) => {
  try {
    const token =
      req.cookies?.[USER_ACCESS_TOKEN] ||
      req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      throw new ApiError(401, "Unauthorized request!");
    }

    const decodedToken = jwt.verify(
      token,
      process.env.USER_ACCESS_TOKEN_SECRET
    );
    if (!decodedToken) {
      throw new ApiError(401, "Invalid request!");
    }

    const user = await User.findById(decodedToken?._id).select("-password");

    if (!user) {
      throw new ApiError(401, "Invalid Access Token!");
    }

    req.user = user;

    next();
  } catch (error) {
    throw new ApiError(500, error?.message || "Something went wrong!");
  }
});
