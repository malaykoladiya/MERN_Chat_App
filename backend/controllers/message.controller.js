// Importing necessary models and functions
import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";
import { getReceiverSocketId, io } from "../socket/socket.js";

// Controller function to send a message
export const sendMessage = async (req, res) => {
    try {
        const {message} = req.body;
        const {id: receiverId} = req.params;
        const senderId = req.user._id;

        // Find the conversation between the sender and receiver
        let conversation = await Conversation.findOne({
            participants: { $all: [senderId, receiverId] },
        })

        // If conversation doesn't exist, create a new one
        if(!conversation) {
            conversation = await Conversation.create({
                participants: [senderId, receiverId]
            });
        }

        // Create a new message
        const newMessage = new Message({
            senderId,
            receiverId,
            message,
        });

        // Add the new message to the conversation
        if(newMessage) {
            conversation.messages.push(newMessage._id);
        }

        // Save the new message and conversation
        await Promise.all([newMessage.save(), conversation.save()]);
        
        // Get the socket ID of the receiver
        const receiverSocketId = getReceiverSocketId(receiverId);
        // If receiver is online, emit a "newMessage" event to their socket
        if(receiverSocketId) {
            io.to(receiverSocketId).emit("newMessage", newMessage)
        }
        
        // Send the new message as a response
        res.status(201).json(newMessage);

    } catch (error) {
        console.log("Error in sendMessage controller ", error.message);
        res.status(500).json({error: "Internal Server Error"});
    }
}

// Controller function to get all messages between the sender and receiver
export const getMessages = async (req, res) => {
    try {
        const {id: receiverId} = req.params;
        const senderId = req.user._id;

        // Find the conversation between the sender and receiver and populate the "messages" field
        const conversation = await Conversation.findOne({
            participants: { $all: [senderId, receiverId] },
        }).populate("messages");

        // If conversation doesn't exist, return an empty array
        if(!conversation) {
            return res.status(200).json([]);
        }

        // Get the messages from the conversation
        const messages = conversation.messages;
        // Send the messages as a response
        res.status(200).json(messages);

    } catch (error) {
        console.log("Error in getMessages controller ", error.message);
        res.status(500).json({error: "Internal Server Error"});
    }
}