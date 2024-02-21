// Import the 'jsonwebtoken' library
import jwt from 'jsonwebtoken';

// Define a function 'generateTokenAndSetCookie' that takes 'userId' and 'res' as parameters
const generateTokenAndSetCookie = (userId, res) => {
    // Generate a token using 'jsonwebtoken.sign' method, passing 'userId', 'process.env.JWT_SECRET', and an options object
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });

    // Define an options object for the cookie
    const options = {
        expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // Set the expiration date for 30 days from now
        httpOnly: true, // Set the cookie to be accessible only through HTTP requests
        sameSite: "strict", // Set the cookie to be sent only for same-site requests
        secure: process.env.NODE_ENV === "production" ? true : false, // Set the cookie to be sent only over secure connections in production environment
    };

    // Set the cookie with name "jwt" and value as the generated token, using the 'res.cookie' method
    res.cookie("jwt", token, options);

    // Return the generated token
    return token;
}

// Export the 'generateTokenAndSetCookie' function as the default export of the module
export default generateTokenAndSetCookie;
