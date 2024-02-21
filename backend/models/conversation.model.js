// Importing the 'mongoose' module
import mangoose from 'mongoose';

// Defining the conversation schema using the 'mongoose.Schema' class
const conversationSchema = new mangoose.Schema({
    // An array of participant IDs referencing the 'User' model
    participants: [
        {
            type: mangoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ],
    // An array of message IDs referencing the 'Message' model, with a default value of an empty array
    messages:[
        {
            type: mangoose.Schema.Types.ObjectId,
            ref: "Message",
            default: []
        }
    ],
}, {timestamps:true});

// Creating a 'Conversation' model using the conversation schema
const Conversation = mangoose.model("Conversation", conversationSchema);

// Exporting the 'Conversation' model
export default Conversation;