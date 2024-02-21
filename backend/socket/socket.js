// Importing necessary modules
import { Server } from "socket.io"; // Importing Server class from socket.io module
import http from "http"; // Importing http module
import express from "express"; // Importing express module

const app = express(); // Creating an instance of express application

const server = http.createServer(app); // Creating an HTTP server using the express app
const io = new Server(server, {
    cors: {
        origin:["http://localhost:3000"], // Allowing requests from http://localhost:3000
        methods:["GET", "POST"] // Allowing GET and POST methods
    }
});

// Function to get the socket ID of the receiver based on their ID
export const getReceiverSocketId = (receiverId) => {
    return userSocketMap[receiverId];
}

const userSocketMap = {}; // Creating an empty object to store user IDs and their corresponding socket IDs

// Event listener for new socket connections
io.on("connection", (socket) => {
   
    const userId = socket.handshake.query.userId; // Extracting the user ID from the socket handshake

    if(userId != "undefined") {
        userSocketMap[userId] = socket.id; // Storing the socket ID in the userSocketMap object
    }

    // Emitting the "getOnlineUsers" event to all connected clients, sending the list of online user IDs
    io.emit("getOnlineUsers", Object.keys(userSocketMap));

    // Event listener for socket disconnection
    socket.on("disconnect", () => {
        delete userSocketMap[userId]; // Removing the user ID and socket ID from the userSocketMap object
        io.emit("getOnlineUsers", Object.keys(userSocketMap)); // Emitting the "getOnlineUsers" event to all connected clients after a user disconnects
    })
})

// Exporting the necessary variables and functions
export {app, io, server}