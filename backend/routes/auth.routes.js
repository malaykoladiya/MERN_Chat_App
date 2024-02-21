// Importing the express module
import express from "express";

// Importing the login, logout, and signup functions from the auth.controller.js file
import { login, logout, signup } from "../controllers/auth.controller.js";

// Creating a new instance of the express Router
const router = express.Router();

// Defining a route for the "/signup" endpoint and associating it with the signup function
router.post("/signup", signup);

// Defining a route for the "/login" endpoint and associating it with the login function
router.post("/login", login);

// Defining a route for the "/logout" endpoint and associating it with the logout function
router.post("/logout", logout);

// Exporting the router object as the default export of this module
export default router;