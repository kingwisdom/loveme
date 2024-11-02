import express from "express";
import { protectedRoute } from "../middleware/auth.js";
import { get } from "mongoose";
import { getConversations, sendMessage } from "../controllers/messageController.js";


const router = express.Router();
router.use(protectedRoute);

router.post("/send", sendMessage)
router.get("/conversation/:conversationId", getConversations)

export default router