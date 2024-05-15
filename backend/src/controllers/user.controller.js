import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Conversation } from "../models/conversation.model.js";

// *** Get A User By Mobile Number ***
export const getUserByMobileNumber = asyncHandler(async (req, res) => {
  // Extract from the body
  const { mobileNumber } = req.params;
  //
  if (!mobileNumber) {
    throw new ApiError(400, "Mobile Number is required!");
  }

  const fullMobileNumber = "+" + mobileNumber;

  //
  const user = await User.findOne({ mobileNumber: fullMobileNumber });
  //
  if (!user) {
    throw new ApiError(404, "Mobile Number is invalid!");
  }

  // Respond with status 200 (OK) and JSON data
  return res.status(200).json(
    new ApiResponse(
      200,
      {
        user: user,
      },
      "User is fetched successfully"
    )
  );
});

// *** Get A User By Conversation Id ***
export const getUserByConversationId = asyncHandler(async (req, res) => {
  // Extract from the body
  const { conversationId } = req.params;
  // Extract from the middleware
  const user = req.user;
  const userId = user._id;
  //
  if (!conversationId) {
    throw new ApiError(400, "Conversation Id is required!");
  }

  //
  const conversation = await Conversation.findById(conversationId).populate(
    "participants"
  );

  //
  if (!conversation) {
    throw new ApiError(404, "Conversation Id is invalid!");
  }

  //
  const otherUser = conversation.participants.find(
    (participant) => participant._id.toString() !== userId.toString()
  );

  // Respond with status 200 (OK) and JSON data
  return res.status(200).json(
    new ApiResponse(
      200,
      {
        user: otherUser,
      },
      "Another User is fetched successfully"
    )
  );
});

// *** Get All Users ***
export const getUsers = asyncHandler(async (req, res) => {
  // Extract from the middleware
  const user = req.user;
  const userId = user._id;

  //
  let allUsers = await User.find({ _id: { $ne: userId } }).select(
    "-password -gender -createdAt -updatedAt"
  );

  // Respond with status 200 (OK) and JSON data
  return res.status(200).json(
    new ApiResponse(
      200,
      {
        users: allUsers,
      },
      "Users are fetched successfully"
    )
  );
});

// *** Search Users ***
export const searchUsers = asyncHandler(async (req, res) => {
  // Extract from the middleware
  const user = req.user;
  const userId = user._id;

  //
  const { search = "" } = req.query;

  //
  if (search.length < 3) {
    throw new ApiError(409, "Type atleast 3 digits !");
  }

  // Finding all my conversations
  const conversations = await Conversation.find({ participants: userId });

  //  Extracting all Users Id from my conversations means users I have chatted with
  const usersFromMyConversations = conversations.flatMap(
    (conversation) => conversation.participants
  );

  // // Remove userId from
  // const usersExceptMeFromMyConversations = usersFromMyConversations.filter(id => id.toString() !== userId.toString());

  // // Finding all users except me & old conversations users with whom I did not started a conversations
  // const usersExceptMeButAlreadyConversations = await User.find({
  //   _id: { $in: usersExceptMeFromMyConversations },
  //   $or: [
  //     { fullName: { $regex: search, $options: "i" } }, // Searching by fullName
  //     { mobileNumber: { $regex: search, $options: "i" } }, // Searching by mobileNumber
  //   ],
  // });

  // Finding all users except me & old conversations users with whom I did not started a conversations
  const usersExceptMeAndAlreadyConversations = await User.find({
    _id: { $nin: usersFromMyConversations },
    $or: [
      { fullName: { $regex: search, $options: "i" } }, // Searching by fullName
      { mobileNumber: { $regex: search, $options: "i" } }, // Searching by mobileNumber
    ],
  });

  // Modifying the users before response
  const users = usersExceptMeAndAlreadyConversations.map(
    ({ _id, fullName, mobileNumber, avatar }) => ({
      _id,
      fullName,
      mobileNumber,
      avatar,
    })
  );

  // Respond with status 200 (OK) and JSON data
  return res.status(200).json(
    new ApiResponse(
      200,
      {
        users,
      },
      "Searched Users are fetched successfully"
    )
  );
});
