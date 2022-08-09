const asyncHandler = require("express-async-handler");

const registerUser = asyncHandler((req, res) => {
    res.json({
        status: 200,
        message: "user registered successfully",
    });
});
const loginUser = asyncHandler((req, res) => {
    res.json({
        status: 200,
        message: "user logged in successfully",
    });
});
const getMe = asyncHandler((req, res) => {
    res.json({
        status: 200,
        message: "user data sent successfully",
    });
});

module.exports = {
    registerUser,
    loginUser,
    getMe,
};
