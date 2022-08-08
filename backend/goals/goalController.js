// asyncHandler provides try-catch features
const asyncHandler = require("express-async-handler");
const Goal = require("./goalModel");

// Common Route for goals     api/goals/
// access                     private
const getGoals = asyncHandler(async (req, res) => {
    const goals = await Goal.find();

    res.json({
        data: {
            ok: "OK",
            goals,
        },
        message: "successfully sent",
        status: 300,
    });
});
const createGoal = asyncHandler(async (req, res) => {
    if (!req.body) {
        res.status(400);
        throw new Error("Please add some data");
    }
    const goal = await Goal.create({
        title: req.body.title,
        desc: req.body.desc,
    });
    res.json({
        status: 200,
        message: "goal added successfully",
        goal,
    });
});
const updateGoal = asyncHandler(async (req, res) => {
    const updatedOne = await Goal.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    });
    res.json({
        status: 200,
        message: "successfully updated",
        updatedOne,
    });
});
const deleteGoal = asyncHandler(async (req, res) => {
    const deletedOne = await Goal.findByIdAndDelete(req.params.id);
    res.json({
        message: "successfully deleted",
        status: 200,
        deletedOne,
    });
});

module.exports = {
    getGoals,
    createGoal,
    updateGoal,
    deleteGoal,
};
