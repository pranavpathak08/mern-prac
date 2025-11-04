const User = require("../models/users");

const getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password");
        res.status(200).json({ user });
    } catch (error) {
        console.error("Get user error", error);
        res.status(500).json({ message: "Server error" });
    }
};

module.exports = { getUserProfile };