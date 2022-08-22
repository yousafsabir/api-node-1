import { useDispatch } from "react-redux";
import { deleteGoal, setEditDoc } from "../features/goal/goalSlice";
import { FaPencilAlt } from "react-icons/fa";

function GoalItem({ goal }) {
    const dispatch = useDispatch();

    return (
        <div className="goal">
            <div>{new Date(goal.createdAt).toLocaleString("en-US")}</div>
            <h2>{goal.title}</h2>
            <p>{goal.desc}</p>
            <div
                style={{
                    position: "absolute",
                    top: "10px",
                    right: "10px",
                    display: "flex",
                    gap: "5px",
                    fontSize: "1.5rem",
                }}
            >
                <button
                    style={{ backgroundColor: "#ccc", border: "none" }}
                    onClick={() => dispatch(setEditDoc(goal))}
                >
                    <FaPencilAlt style={{ fontSize: "1.2rem" }} />
                </button>
                <button
                    style={{
                        fontSize: "1.2rem",
                        backgroundColor: "#ccc",
                        border: "none",
                    }}
                    onClick={() => dispatch(deleteGoal(goal._id))}
                >
                    X
                </button>
            </div>
        </div>
    );
}

export default GoalItem;
