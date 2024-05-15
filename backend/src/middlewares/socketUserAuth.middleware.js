import { USER_ACCESS_TOKEN } from "../constants/tokenNames.js";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";

export const socketUserAuth = async (err, socket, next) => {
  try {
    if (err) {
      // console.log(err);
      throw new ApiError(400, err?.message || "Something went wrong!");
    }

    const token = socket.request.cookies?.[USER_ACCESS_TOKEN];

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

    socket.user = user;

    return next();
  } catch (error) {
    // console.log(error);
    throw new ApiError(500, error?.message || "Something went wrong!");
  }
};
