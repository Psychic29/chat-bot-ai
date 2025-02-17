import { Router } from "express";
import { verifyToken } from "../utils/token-manager";
import { chatCompletionValidator, validate } from "../utils/validators";
import {
  generateChatCompletion,
  sendChatsToUser
} from "../controllers/chat-controllers";

const chatRoutes = Router();

chatRoutes.post(
  "/new",
  validate(chatCompletionValidator),
  verifyToken,
  generateChatCompletion
);
chatRoutes.get("/all-chats", verifyToken, sendChatsToUser);

chatRoutes.delete("/delete", verifyToken, sendChatsToUser);

export default chatRoutes;
