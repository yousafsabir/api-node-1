// Common Route for goals     api/goals/
// access                     private
const getGoals = (req, res) => {
    res.json({
        data: {
            purpose: "getting goal",
            type: "get request",
        },
        message: "successfully sent",
        status: 200,
    });
};
const createGoal = (req, res) => {
    res.json({
        data: {
            purpose: "to create a goal",
            type: "post request",
        },
        message: "successfully sent",
        status: 200,
    });
};
const updateGoal = (req, res) => {
    res.json({
        data: {
            purpose: `to update a goal id:${req.params.id}`,
            type: "put request",
        },
        message: "successfully sent",
        status: 200,
    });
};
const deleteGoal = (req, res) => {
    res.json({
        data: {
            purpose: `to delete a goal id:${req.params.id}`,
            type: "delete request",
        },
        message: "successfully sent",
        status: 200,
    });
};

module.exports = {
    getGoals,
    createGoal,
    updateGoal,
    deleteGoal,
};
