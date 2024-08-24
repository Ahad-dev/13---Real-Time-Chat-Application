import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import User from '../models/user.model.js';
dotenv.config();


export const protectRoute = async (req, res, next) => {
    try{
        const token = req.cookies.token;
        if(!token){
            return res.status(401).json({success:false,message: 'Not authorized to access this route'});
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if(!decoded){
            return res.status(401).json({success:false,message: 'Invalid Token - Unauthorized'});
        }

        const user = await User.findById(decoded.userId);
        req.user = user;
        next();

    }catch(error){
        return res.status(401).json({success:false,message: 'Not authorized to access this route'});
    }
}