const mongoose = require("mongoose");

const goalSchema = mongoose.Schema(
    {
        title: String,
        desc: String,
    },
    {
        // auto creates createdAt and updatedAt fields
        timestamps: true,
    }
);
const Goal = mongoose.model("Goal", goalSchema);
module.exports = Goal;
