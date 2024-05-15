import mongoose from "mongoose";
import Test2_MongoDb_Connection from "../db/test2.mongodb.js";
import { User } from "./user.model.js";

const messageSchema = new mongoose.Schema(
  {
    conversation: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Conversation",
      required: true,
    },
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: User,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Message = Test2_MongoDb_Connection.model("Message", messageSchema);
