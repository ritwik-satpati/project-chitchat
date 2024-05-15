import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import cookieOptions from "../constants/cookieOptions.js";
import { USER_ACCESS_TOKEN } from "../constants/tokenNames.js";

// *** User Registration ***
export const registerUser = asyncHandler(async (req, res) => {
  // Extract from the request body
  const { fullName, password, mobileNumber, gender } = req.body;

  // Validate that are provided
  if (
    [fullName, password, mobileNumber].some(
      (field) => !field || field?.trim() === ""
    )
  ) {
    throw new ApiError(400, "All fields are required!");
  }

  // Check for existing user with mobile number
  const existedUser = await User.findOne({
    mobileNumber: mobileNumber,
  });

  // If user exists, throw an error
  if (existedUser) {
    throw new ApiError(409, "User with Mobile Number is exist, login now!");
  }

  let avatar;
  if (gender === "Male") {
    avatar = `https://avatar.iran.liara.run/public/boy?username=${fullName}`;
  } else if (gender === "Female") {
    avatar = `https://avatar.iran.liara.run/public/girl?username=${fullName}`;
  } else {
    avatar = `https://avatar.iran.liara.run/username?username=${fullName}`;
  }

  // Create a new user record
  const createdUser = await User.create({
    fullName,
    mobileNumber,
    password,
    gender: gender || undefined,
    avatar,
  });

  if (!createdUser) {
    throw new ApiError(400, "Something went wrong, try again after some time!");
  }

  // Generate an access token for the user (implementation from USER model method)
  const userAccessToken = await createdUser.generateAccessToken();

  createdUser.password = undefined;

  // Respond with status 201 (created) and JSON data including updated created user
  return res
    .status(201)
    .cookie(USER_ACCESS_TOKEN, userAccessToken, cookieOptions)
    .json(
      new ApiResponse(
        201,
        {
          user: createdUser,
        },
        "User is registed successfully"
      )
    );
});

// *** User Login ***
export const loginUser = asyncHandler(async (req, res) => {
  // Extract from the request body
  const { mobileNumber, password } = req.body;

  // Validate that are provided
  if (
    [mobileNumber, password].some((field) => !field || field?.trim() === "")
  ) {
    throw new ApiError(400, "All fields are required!");
  }

  // Check for existing user with mobile number
  const existedUser = await User.findOne({
    mobileNumber: mobileNumber,
  }).select("+password"); // Include the password field for comparison

  // If user does not exists, throw an error
  if (!existedUser) {
    throw new ApiError(404, "User does not exist, register now!");
  }

  // Verify password matches the user's password (implementation from User model method)
  const isPasswordValid = await existedUser.isPasswordCorrect(password);
  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid account credentials");
  }

  // Generate an access token for the user (implementation from USER model method)
  const userAccessToken = await existedUser.generateAccessToken();

  existedUser.password = undefined;

  // Respond with status 200 (OK) and JSON data including existed user
  return res
    .status(200)
    .cookie(USER_ACCESS_TOKEN, userAccessToken, cookieOptions)
    .json(
      new ApiResponse(
        200,
        {
          user: existedUser,
        },
        "User is logged in successfully"
      )
    );
});

// *** User Get ***
export const getUser = asyncHandler(async (req, res) => {
  // Extract from the middleware
  const user = req.user;

  // Respond with status 200 (OK) and JSON data
  return res.status(200).json(
    new ApiResponse(
      200,
      {
        user,
      },
      "User is fetched successfully"
    )
  );
});

// *** User Logout ***
export const logoutUser = asyncHandler(async (req, res) => {
  // Clear the account access token cookie
  res.clearCookie(USER_ACCESS_TOKEN, cookieOptions);

  // Return a successful response indicating logout
  return res
    .status(200)
    .json(new ApiResponse(200, {}, "User logged out successfully"));
});
