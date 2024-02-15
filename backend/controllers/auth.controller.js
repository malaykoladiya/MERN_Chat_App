import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import generateTokenAndSetCookie from "../utils/generateToken.js";

export const signup = async (req, res) => {
    try{
        const {password, username, confirmPassword, firstName, lastName, gender} = req.body;

        if(password != confirmPassword) {
            return res.status(400).json({error: "Password and Confirm Password do not match"});
        }

        const user = await User.findOne({username});

        if(user){
            return res.status(400).json({error: "User already exists"});
        }

        // Password Hashing
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt); 



        const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
        const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

        const newUser = new User({
            username,
            password: hashedPassword,
            firstName,
            lastName,
            gender,
            profilePicture: gender === "Male" ? boyProfilePic : girlProfilePic,
        });

        if(newUser) {
            // Generate a JWT token
            generateTokenAndSetCookie(newUser._id, res);
            await newUser.save();

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



export const login = async (req, res) => {
    try {
        const {username, password} = req.body;
        const user = await User.findOne({username});
        const isPasswordValid = await bcrypt.compare(password, user?.password || "");

        if(!user || !isPasswordValid){
            return res.status(400).json({error: "Invalid username or password"});
        }

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


export const logout = (req, res) => {
    try {
        res.cookie("jwt", "", {expires: 0});
        res.status(200).json({message: "Logged out successfully"});

    } catch (error) {
        console.log("Error in logout controller ", error.message);
        res.status(500).json({error: 'Internal Server Error'});
    }
}