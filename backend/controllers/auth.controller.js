import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { getUniqueProfilePic } from "../utils/getUniqueProfilePic.js";
import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookie.js";

export const signup = async (req, res) => {
  const { username, fullname, password, confirmPassword, gender } = req.body;

  // Check if any field is empty
  if (password !== confirmPassword) {
    return res
      .status(400)
      .json({ success: false, message: "Passwords do not match" });
  }
  try {

    // Check if user already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    // Create new user
    const user = await User.create({
      username,
      fullname,
      password: passwordHash,
      gender,
      profilePic: getUniqueProfilePic(gender, fullname),
    });

    // Generate token and set cookie
    generateTokenAndSetCookie(res,user);

    res
      .status(201)
      .json({ success: true, user: { ...user._doc, password: undefined } });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const login = async (req, res) => {
  const {username,password} = req.body;
  try{

    const user = await User.findOne({username});

    // Check if user exists
    if(!user){
        return res.status(404).json({success:false,message:"User not found"});
    }
    const isMatch = await bcrypt.compare(password,user.password);

    // Check if password is correct
    if(!isMatch){
        return res.status(400).json({success:false,message:"Invalid credentials"});
    }
    // Generate token and set cookie
    generateTokenAndSetCookie(res,user);
    
    // Send response
    res.status(200).json({success:true,user:{...user._doc,password:undefined}});

  }catch(error){
    res.status(500).json({success:false,message:error.message});
  }
};

export const logout = async (req, res) => {
    try {
        res.clearCookie("token");
        res.status(200).json({ success: true, message: "Logged out" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
