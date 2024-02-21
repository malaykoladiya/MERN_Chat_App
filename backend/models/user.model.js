// Importing the mongoose library
import mongoose from "mongoose";

// Defining the user schema
const userSchema = new mongoose.Schema({
    // First name of the user
    firstName: {
        type : String,
        required: true,
    },
    // Last name of the user
    lastName: {
        type : String,
        required: true,
    },
    // Unique username of the user
    username: {
        type : String,
        required: true,
        unique: true,
    },
    // Password of the user
    password:{
        type: String,
        required: true,
        minlength: 6,
    },
    // Gender of the user (Male or Female)
    gender:{
        type: String,
        required: true,
        enum: ["Male", "Female"],
    },
    // Profile picture of the user (default is empty string)
    profilePicture: {
        type: String,
        default: "",
    }

}, {timestamps: true});

// Creating the User model using the user schema
const User = mongoose.model("User", userSchema);

// Exporting the User model
export default User;