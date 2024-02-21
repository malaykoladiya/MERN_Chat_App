// Importing the required modules
import jwt from 'jsonwebtoken';
import User from "../models/user.model.js";

// Middleware function to protect routes
const protectRoute = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;
        // Checking if token exists
        if(!token) {
            return res.status(401).json({error: "Not authorized"});
        }
        
        // Verifying the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // Checking if token is valid
        if(!decoded) {
            return res.status(401).json({error: "Not authorized, Invalid token"});
        }
        
        // Finding the user based on the decoded user ID
        const user = await User.findById(decoded.userId).select("-password");
        // Checking if user exists
        if(!user) {
            return res.status(404).json({error: "User not found"});
        }

        // Adding the user object to the request object
        req.user = user;

        // Proceeding to the next middleware or route handler
        next();
        
    } catch (error) {
        console.log("Error in protectRoute middleware ", error.message);
        // Handling errors related to token verification
        res.status(401).json({error: "Not authorized, token failed"});
    }
}

// Exporting the middleware function
export default protectRoute;