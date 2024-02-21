// Importing required modules
import express from "express"; // Express is a web application framework for Node.js
import dotenv from"dotenv"; // dotenv is a zero-dependency module that loads environment variables from a .env file into process.env
import cookieParser from "cookie-parser"; // cookie-parser is a middleware that parses cookies attached to the client request object

import path from "path"; // path is a built-in module that provides utilities for working with file and directory paths

import authRoutes from "./routes/auth.routes.js"; // Importing routes for authentication
import messageRoutes from "./routes/message.routes.js"; // Importing routes for messages
import userRoutes from "./routes/user.routes.js"; // Importing routes for users

import connectToMongoDB from "./db/connectToMongoDB.js"; // Importing function to connect to MongoDB
import { app, server } from "./socket/socket.js"; // Importing the Express app and server instance from the socket.js file

const __dirname = path.resolve(); // Resolving the current directory path

const PORT = process.env.PORT || 5000; // Setting the port number to either the value of the PORT environment variable or 5000 if it's not defined

dotenv.config(); // Loading environment variables from the .env file

app.use(express.json()); // Using the built-in middleware function in Express to parse incoming requests with JSON payloads
app.use(cookieParser()); // Using the cookie-parser middleware to parse cookies attached to the client request object

app.use("/api/auth", authRoutes); // Mounting the authentication routes at the /api/auth endpoint
app.use("/api/messages", messageRoutes); // Mounting the message routes at the /api/messages endpoint
app.use("/api/users", userRoutes); // Mounting the user routes at the /api/users endpoint

app.use(express.static(path.join(__dirname, "/frontend/dist"))); // Serving static files from the frontend/dist directory
app.get("*", (req,res) => {
    res.sendFile(path.join(__dirname, "frontend", "dist", "index.html")); // Sending the index.html file for any other routes
});

server.listen(PORT, () => {
    connectToMongoDB(); // Connecting to MongoDB
    console.log(`Server Running on Port ${PORT}`); // Logging the server running message with the port number
});