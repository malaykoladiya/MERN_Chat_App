// Import the express module
import express from "express";

// Import the protectRoute middleware
import protectRoute from "../middleware/protectRoute.js";

// Import the getUsersForSidebar controller
import getUsersForSidebar from "../controllers/user.controller.js";

// Create a new router instance
const router = express.Router();

// Define a GET route for the root path
// This route is protected by the protectRoute middleware
// It calls the getUsersForSidebar controller function
router.get("/", protectRoute, getUsersForSidebar);

// Export the router instance as the default export
export default router;