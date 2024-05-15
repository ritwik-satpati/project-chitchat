import express from "express";
import { userAuth } from "../middlewares/userAuth.middleware.js";
import {
  getConversation,
  getConversations,
} from "../controllers/conversation.controller.js";

const router = express.Router();

// *** Get All Conversations ***
router.get("/", userAuth, getConversations);

// *** Get A Conversation ***
router.get("/:conversationId", userAuth, getConversation);

export default router;
