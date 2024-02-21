// Importing the mongoose library
import mongoose from "mongoose";

// Creating a new mongoose schema for the message model
const messageSchema = new mongoose.Schema({
    // The ID of the sender of the message
    senderId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        require: true
    },
    // The ID of the receiver of the message
    receiverId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        require: true
    },
    // The content of the message
    message:{
        type: String,
        require: true
    },

    // createdAt and updatedAt fields will be automatically added by mongoose
}, {timestamps: true});

// Creating a mongoose model for the Message schema
const Message = mongoose.model("Message", messageSchema);

// Exporting the Message model
export default Message;