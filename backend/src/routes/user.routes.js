import express from "express";
import { userAuth } from "../middlewares/userAuth.middleware.js";
import {
  getUserByMobileNumber,
  getUserByConversationId,
  getUsers,
  searchUsers,
} from "../controllers/user.controller.js";

const router = express.Router();

// *** Get A User By Mobile Number ***
router.get(`/mobile-number/:mobileNumber`, userAuth, getUserByMobileNumber);

// *** Get A User By Conversation Id ***
router.get(`/conversation/:conversationId`, userAuth, getUserByConversationId);

// // *** Get All Users ***
// router.get("/", userAuth, getUsers);

// *** Search Users ***
router.get("/", userAuth, searchUsers);

export default router;
