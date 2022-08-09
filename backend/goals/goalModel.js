const mongoose = require("mongoose");

const goalSchema = mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "User",
        },
        title: {
            type: String,
            required: [true, "please add the title"],
        },
        desc: {
            type: String,
            required: [true, "please add the description"],
        },
    },
    {
        // auto creates createdAt and updatedAt fields
        timestamps: true,
    }
);

module.exports = mongoose.model("Goal", goalSchema, "goals");
