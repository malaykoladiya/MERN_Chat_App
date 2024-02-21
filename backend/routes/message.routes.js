// Import the express module
import express from "express";

// Import the sendMessage and getMessages functions from the message.controller.js file
import { sendMessage, getMessages } from "../controllers/message.controller.js";

// Import the protectRoute middleware from the protectRoute.js file
import protectRoute from "../middleware/protectRoute.js";

// Create a new instance of the express Router
const router = express.Router();

// Define a route for getting messages by user ID
router.get("/:id", protectRoute, getMessages);

// Define a route for sending a message by user ID
router.post("/send/:id", protectRoute, sendMessage);

// Export the router module as the default export
export default router;