import mongoose from "mongoose";
import Test2_MongoDb_Connection from "../db/test2.mongodb.js";
import { User } from "./user.model.js";

const conversationSchema = new mongoose.Schema(
  {
    participants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: User,
        required: true,
      },
    ],
    messages: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Conversation = Test2_MongoDb_Connection.model(
  "Conversation",
  conversationSchema
);
