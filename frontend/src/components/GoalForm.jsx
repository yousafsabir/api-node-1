import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createGoal, updateGoal } from "../features/goal/goalSlice";
import toast from "react-hot-toast";
import Statuses from "../constants/Statuses";
import Actions from "../constants/Actions";

function GoalForm() {
    const dispatch = useDispatch();
    const { editMode, toEdit, status, action } = useSelector(
        (state) => state.goal
    );
    const success = status === Statuses.idle && action === Actions.readgoal;
    console.log("success", success);
    const [goals, setGoals] = useState({
        title: "",
        desc: "",
    });
    const { title, desc } = goals;
    const OnChange = (e) => {
        setGoals((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };
    useEffect(() => {
        if (editMode) {
            setGoals({
                title: toEdit.title,
                desc: toEdit.desc,
            });
        }
    }, [editMode]);
    useEffect(() => {
        if (success) {
            setGoals({
                title: "",
                desc: "",
            });
        }
    }, [success]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!title && !desc) {
            toast("⚠ please include both values", {
                style: {
                    fontSize: "1.2rem",
                    color: "#DC2626",
                },
            });
            return;
        }
        if (editMode) {
            dispatch(updateGoal({ _id: toEdit._id, title, desc }));
            return;
        }
        dispatch(createGoal(goals));
    };
    return (
        <section className="form">
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <input
                        type="text"
                        id="title"
                        value={title}
                        name="title"
                        onChange={OnChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="desc">Description</label>
                    <input
                        type="text"
                        id="desc"
                        name="desc"
                        value={desc}
                        onChange={OnChange}
                    />
                </div>
                <div className="form-group">
                    <button className="btn btn-block" type="submit">
                        {editMode ? "Update Goal" : "Add Goal"}
                    </button>
                </div>
            </form>
        </section>
    );
}

export default GoalForm;
