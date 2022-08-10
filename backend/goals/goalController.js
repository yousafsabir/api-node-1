// asyncHandler provides try-catch features
const asyncHandler = require("express-async-handler");
const Goal = require("./goalModel");

// Common Route for goals     api/goals/
// access                     private
const getGoals = asyncHandler(async (req, res) => {
    const goals = await Goal.find({ user: req.user.id });

    res.status(300).json({
        status: 300,
        message: `successfully fetched goals for ${req.user.name}`,
        goals,
    });
});
const createGoal = asyncHandler(async (req, res) => {
    if (!req.body) {
        res.status(400);
        throw new Error("Please add some data");
    }
    const goal = await Goal.create({
        user: req.user.id,
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
    const id = req.params.id;
    if (!id) {
        res.status(400).json({
            message: "id not found",
        });
    }

    // checking for authorized user
    const goal = await Goal.findById(id);
    if (goal.user.toString() !== req.user.id) {
        res.status(401).json({
            message: "user not authorized",
        });
    }
    const updatedOne = await Goal.findByIdAndUpdate(id, req.body, {
        new: true,
    });
    res.json({
        status: 200,
        message: "successfully updated",
        updatedOne,
    });
});
const deleteGoal = asyncHandler(async (req, res) => {
    const id = req.params.id;
    if (!id) {
        res.status(400).json({
            message: "id not found",
        });
    }
    // checking for authorized user
    const goal = await Goal.findById(id);
    if (goal.user.toString() !== req.user.id) {
        res.status(401).json({
            message: "user not authorized",
        });
    }

    const deletedOne = await Goal.findByIdAndDelete(id);
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
