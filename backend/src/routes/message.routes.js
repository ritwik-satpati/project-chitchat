import express from "express";
import { userAuth } from "../middlewares/userAuth.middleware.js";
import { sendMessage, getMessages } from "../controllers/message.controller.js";

const router = express.Router();

// *** Send A Message ***
router.post("/send/:sendToUserId", userAuth, sendMessage);

// *** Get All Messages ***
router.get("/send/:sendToUserId", userAuth, getMessages);

export default router;
