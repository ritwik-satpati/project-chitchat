import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Conversation } from "../models/conversation.model.js";
import { Message } from "../models/message.model.js";

// *** Send A Message ***
export const sendMessage = asyncHandler(async (req, res) => {
  // Extract from the middleware
  const sender = req.user;

  // Extract from the request body
  const { message } = req.body;

  // Validate that are provided
  if (!message) {
    throw new ApiError(400, "All fields are required!");
  }

  // Extract from the params
  const { sendToUserId } = req.params;
  if (!sendToUserId) {
    throw new ApiError(404, "Receiver is required!");
  }

  //
  const receiver = await User.findOne({ _id: sendToUserId });

  //
  if (!receiver) {
    throw new ApiError(404, "Receiver is not valid!");
  }

  //
  const senderId = sender._id;
  const receiverId = receiver._id;

  //
  const conversation = await Conversation.findOne({
    participants: { $all: [senderId, receiverId] },
  });

  //
  let newConversation;
  if (!conversation) {
    newConversation = await Conversation.create({
      participants: [senderId, receiverId],
      messages: 1,
    });
  } else {
    newConversation = await Conversation.findOneAndUpdate(
      { _id: conversation._id },
      { $inc: { messages: 1 } },
      { new: true } // to return the updated document
    );
  }

  // Create a new message record
  const newMessage = await Message.create({
    sender: senderId,
    message,
    conversation: newConversation._id,
  });

  // // This will save one by one
  //   await newMessage.save();
  // await conversation.save();

  // This will save parallaly
  // await Promise.all([newConversation.save(), newMessage.save()]);

  // Respond with status 201 (created) and JSON data
  return res.status(201).json(
    new ApiResponse(
      201,
      {
        message: newMessage,
        conversation: newConversation,
      },
      "Message sent successfully"
    )
  );
});

// *** Get All Messages ***
export const getMessages = asyncHandler(async (req, res) => {
  // Extract from the middleware
  const sender = req.user;

  // Extract from the params
  const { sendToUserId } = req.params;

  //
  const receiver = await User.findById(sendToUserId);
  //
  if (!receiver) {
    throw new ApiError(404, "Receiver is not valid!");
  }

  //
  const senderId = sender._id;
  const receiverId = receiver._id;

  //
  let conversation = await Conversation.findOne({
    participants: { $all: [senderId, receiverId] },
  });

  //
  if (!conversation) {
    throw new ApiError(404, "Conversation is not valid!");
  }

  //
  const { page = 1 } = req.query;
  const messagesPerPage = 2;
  const skipMessages = (page - 1) * messagesPerPage;

  //
  const [messages, totalMessages] = await Promise.all([
    Message.find({ conversation: conversation._id })
      .sort({ createdAt: -1 })
      .skip(skipMessages)
      .limit(messagesPerPage)
      .populate("sender", "fullName mobileNumber avatar")
      .lean(),
    Message.countDocuments({ conversation: conversation._id }),
  ]);

  const totalPages = Math.ceil(totalMessages / messagesPerPage) || 0;

  // Respond with status 200 (OK) and JSON data
  return res.status(200).json(
    new ApiResponse(
      200,
      {
        messages: messages.reverse(),
        totalPages,
        currentPage: page,
      },
      "Messages are fetched successfully"
    )
  );
});
