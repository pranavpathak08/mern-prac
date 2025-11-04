const User = require("../models/users");
const jwt = require("jsonwebtoken");

const generateToken = (userId) => {
    return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
        expiresIn: '7d'
    });
};


const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        //Validation
        if (!name || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        //Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.json(400).json({ message: "User already exists" });
        }

        //Create user
        const user = await User.create({ name, email, password });

        res.status(201).json({
            success: true,
            message: "User registered successfully",
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
            },
            token: generateToken(user._id),
        });
    } catch (error) {
        console.error("Register error", error);
        res.status(500).json({ message: "Server error" });
    }
};


const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        //Validate input
        if (!email || !password) {
            return res.status(400).json({ message: "Please provide email and password" });
        }

        //Check user
        const user = await User.findOne({ email }).select("+password");
        if (!user) {
            return res.status(401).json({ message: "Invalid Credentials" });
        }

        //Check password
        const isMatch = await user.matchPassword(password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid Credentials" });
        }

        res.status(200).json({
            success: true,
            message: "Login Successful",
            user: {
                _id: user._id,
                name: user.name,
                email: user.email
            },
            token: generateToken(user._id),
        });
    } catch (error) {
        console.error("Login error: ", error);
        res.status(500).json({ message: "Server error" });
    }
}

module.exports = {
    registerUser,
    loginUser,
}