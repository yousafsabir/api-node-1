const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "please add your name"],
        },
        email: {
            type: String,
            required: [true, "please add your email"],
            unique: true,
        },
        password: {
            type: String,
            required: [true, "please add your password"],
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("User", userSchema);
