const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("./userModel");

const registerUser = asyncHandler(async (req, res) => {
    // destructuring
    const { name, email, password } = req.body;
    // Check if we have all the values
    if (!name || !email || !password) {
        res.status(400).json({
            message: "please include all fields",
        });
    }

    // check if user already exists
    const userExists = User.findOne({ email });
    if (userExists) {
        res.status(400).json({
            message: "user Already exists",
        });
    }

    // hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(password, salt);

    // create user
    const user = await User.create({
        name,
        email,
        password: hashedPass,
    });
    if (user) {
        res.status(201).json({
            message: "user registered successfully",
            user: {
                _id: user.id,
                name: user.name,
                email: user.email,
                token: generateToken(user.id),
            },
        });
    } else {
        res.status(400).json({
            message: "Invalid user data",
        });
    }
});
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400).json({
            message: "please include all fields",
        });
    }

    const user = await User.findOne({ email });
    if (!user) {
        res.status(400).json({
            message: "User doesn't exist",
        });
    }

    const passMatch = await bcrypt.compare(password, user.password);

    if (passMatch) {
        res.status(200).json({
            message: "user logged in",
            user: {
                _id: user.id,
                name: user.name,
                email: user.email,
                token: generateToken(user.id),
            },
        });
    } else {
        res.status(400).json({
            message: "wrong password",
        });
    }
});
const getMe = asyncHandler(async (req, res) => {
    res.json({
        status: 200,
        message: "user data sent successfully",
    });
});

// Generate JWT Token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: "5d",
    });
};

module.exports = {
    registerUser,
    loginUser,
    getMe,
};
