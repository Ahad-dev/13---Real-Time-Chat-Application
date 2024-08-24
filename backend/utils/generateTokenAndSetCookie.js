import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const generateTokenAndSetCookie = (res, user) => {
    const token = jwt.sign({userId:user._id},process.env.JWT_SECRET,{expiresIn:"7d"});
    res.cookie("token",token,{
        httpOnly:true, // cannot be accessed by frontend
        maxAge:7*24*60*60*1000, // 7 days
        sameSite:"strict", // cannot be accessed by frontend
        secure:process.env.NODE_ENV === "production" ? true : false // only works in https in production
    })
}