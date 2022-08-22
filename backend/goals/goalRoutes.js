const express = require("express");
const router = express.Router();
const {
    getGoals,
    createGoal,
    updateGoal,
    deleteGoal,
} = require("./goalController");
const { protect } = require("../middlewares/auth");
// base url http://localhost:8000/api/goals/
router.route("/").get(protect, getGoals).post(protect, createGoal);
router.route("/:id").put(protect, updateGoal).delete(protect, deleteGoal);

// router.get("/", getGoals);
// router.post("/", createGoal);
// router.put("/:id", updateGoal);
// router.delete("/:id", deleteGoal);

module.exports = router;
