// asyncHandler provides try-catch features
const asyncHandler = require("express-async-handler");
const Goal = require("./goalModel");

// Common Route for goals     api/goals/
// access                     private
const getGoals = asyncHandler(async (req, res) => {
    res.json({
        data: {
            purpose: "getting goal",
            type: "get request",
        },
        message: "successfully sent",
        status: 200,
    });
});
const createGoal = asyncHandler(async (req, res) => {
    if (!req.body.text) {
        res.status(400);
        throw new Error("Please add some data");
    }
    res.json({
        data: {
            purpose: "to create a goal",
            type: "post request",
        },
        message: "successfully sent",
        status: 200,
    });
});
const updateGoal = asyncHandler(async (req, res) => {
    res.json({
        data: {
            purpose: `to update a goal id:${req.params.id}`,
            type: "put request",
        },
        message: "successfully sent",
        status: 200,
    });
});
const deleteGoal = asyncHandler(async (req, res) => {
    res.json({
        data: {
            purpose: `to delete a goal id:${req.params.id}`,
            type: "delete request",
        },
        message: "successfully sent",
        status: 200,
    });
});

module.exports = {
    getGoals,
    createGoal,
    updateGoal,
    deleteGoal,
};
