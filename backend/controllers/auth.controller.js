// Importing the necessary modules and files
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import generateTokenAndSetCookie from "../utils/generateToken.js";

// Controller function for user signup
export const signup = async (req, res) => {
    try{
        // Destructuring the required fields from the request body
        const {password, username, confirmPassword, firstName, lastName, gender} = req.body;

        // Checking if the password and confirm password match
        if(password != confirmPassword) {
            return res.status(400).json({error: "Password and Confirm Password do not match"});
        }

        // Checking if the user already exists
        const user = await User.findOne({username});
        if(user){
            return res.status(400).json({error: "User already exists"});
        }

        // Password Hashing
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt); 

        // Generating profile picture URL based on gender
        const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
        const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

        // Creating a new user object
        const newUser = new User({
            username,
            password: hashedPassword,
            firstName,
            lastName,
            gender,
            profilePicture: gender === "Male" ? boyProfilePic : girlProfilePic,
        });

        // Saving the new user and generating a JWT token
        if(newUser) {
            generateTokenAndSetCookie(newUser._id, res);
            await newUser.save();

            // Returning the user details in the response
            res.status(201).json({
                _id: newUser._id,
                username: newUser.username,
                firstName: newUser.firstName,
                lastName: newUser.lastName,
                profilePicture: newUser.profilePicture
            });
        } else {
            res.status(400).json({error: "User not created"});
        }

    } catch (error){
        console.log("Error in signup: ", error.message);
        res.status(500).json({error: 'Internal Server Error'});
    }
};

// Controller function for user login
export const login = async (req, res) => {
    try {
        // Destructuring the username and password from the request body
        const {username, password} = req.body;

        // Finding the user by username
        const user = await User.findOne({username});

        // Checking if the user exists and if the password is valid
        const isPasswordValid = await bcrypt.compare(password, user?.password || "");
        if(!user || !isPasswordValid){
            return res.status(400).json({error: "Invalid username or password"});
        }

        // Generating a JWT token and returning the user details in the response
        generateTokenAndSetCookie(user._id, res);
        res.status(200).json({
            _id: user._id,
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            profilePicture: user.profilePicture
        });

    } catch(error){
        console.log("Error in login controller ", error.message);
        res.status(500).json({error: 'Internal Server Error'});
    }
};

// Controller function for user logout
export const logout = (req, res) => {
    try {
        // Clearing the JWT cookie and sending a success message in the response
        res.cookie("jwt", "", {expires: 0});
        res.status(200).json({message: "Logged out successfully"});

    } catch (error) {
        console.log("Error in logout controller ", error.message);
        res.status(500).json({error: 'Internal Server Error'});
    }
}