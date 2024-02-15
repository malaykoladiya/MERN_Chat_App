import jwt from 'jsonwebtoken';

const generateTokenAndSetCookie = (userId, res) => {
    const token = jwt.sign({ userId}, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });
    
    const options = {
        expires: new Date(
        Date.now() + 30 * 24 * 60 * 60 * 1000
        ),
        httpOnly: true,
        sameSite: "strict",
        secure: process.env.NODE_ENV === "production" ? true : false,
    };
    
    res.cookie("jwt", token, options);
    
    return token;
}

export default generateTokenAndSetCookie;

