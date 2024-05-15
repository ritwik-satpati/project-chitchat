import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Conversation } from "../models/conversation.model.js";
import { Message } from "../models/message.model.js";

// *** Get All Conversations ***
export const getConversations = asyncHandler(async (req, res) => {
  // Extract from the middleware
  const userId = req.user._id;

  // throw new ApiError(400, "Sample error!");

  //
  let conversations = await Conversation.find({
    participants: userId,
  })
    .sort({ updatedAt: -1 })
    .populate("participants", "fullName mobileNumber avatar");

  // Mapping over conversations to add otherParticipant
  const structuredConversations = conversations.map((conversation) => {
    // Filtering the other participant
    const otherParticipant = conversation.participants.find(
      (participant) => participant._id.toString() !== userId.toString()
    );

    // Creating the modified conversation object
    return {
      ...conversation.toObject(),
      otherParticipant,
    };
  });

  // Respond with status 200 (OK) and JSON data
  return res.status(200).json(
    new ApiResponse(
      200,
      {
        conversations: structuredConversations,
      },
      "Conversations are fetched successfully"
    )
  );
});

// *** Get A Conversation ***
export const getConversation = asyncHandler(async (req, res) => {
  // Extract from the middleware
  const userId = req.user._id;

  // Extract from the params
  const { conversationId } = req.params;

  //
  let conversation = await Conversation.findOne({
    _id: conversationId,
    participants: userId,
  }).populate("participants", "fullName mobileNumber avatar");

  //
  const otherParticipant = conversation.participants.find(
    (participant) => participant._id.toString() !== userId.toString()
  );

  //
  const structuredConversation = {
    ...conversation.toObject(),
    otherParticipant,
  };

  // Respond with status 200 (OK) and JSON data
  return res.status(200).json(
    new ApiResponse(
      200,
      {
        conversation: structuredConversation,
      },
      "A Conversation is fetched successfully"
    )
  );
});
