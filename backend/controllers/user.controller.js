import User from "../models/user.model.js";

export const getUserForSideBar = async (req, res) => {

    const loggedInuserId = req.user._id;

    try {
        const users = await User.find({ _id: { $ne: loggedInuserId } }).select('-password');

        res.status(200).json({ success: true, users });

    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}