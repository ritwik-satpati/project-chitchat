import express from "express";
import { userAuth } from "../middlewares/userAuth.middleware.js";
import {
  registerUser,
  loginUser,
  getUser,
  logoutUser,
} from "../controllers/auth.controller.js";

const router = express.Router();

// *** User Registration ***
router.post("/register", registerUser);

// *** User Login ***
router.post("/login", loginUser);

// *** User Get ***
router.get("/", userAuth, getUser);

// *** User Logout ***
router.post("/logout", userAuth, logoutUser);

export default router;
