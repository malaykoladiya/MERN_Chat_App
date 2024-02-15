import mangoose from 'mongoose';

const conversationSchema = new mangoose.Schema({
    participants: [
        {
            type: mangoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ],
    messages:[
        {
            type: mangoose.Schema.Types.ObjectId,
            ref: "Message",
            default: []
        }
    ],


}, {timestamps:true});

const Conversation = mangoose.model("Conversation", conversationSchema);

export default Conversation;