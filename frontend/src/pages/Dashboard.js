import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getGoals } from "../features/goal/goalSlice";
import { useNavigate } from "react-router-dom";
import ReactLoading from "react-loading";
import Statuses from "../constants/Statuses";
import Actions from "../constants/Actions";
import GoalForm from "../components/GoalForm";
import GoalItem from "../components/GoalItem";

function Dashboard() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.auth);
    const { goals, status, action } = useSelector((state) => state.goal);
    const success = status === Statuses.idle && action === Actions.readgoal;
    useEffect(() => {
        if (!user) {
            navigate("/login");
            return;
        }
        dispatch(getGoals());
    }, [user]);
    return (
        <div>
            <section className="heading">
                <h2>Welcome {user?.name}</h2>
                <p>Goals Dashboard</p>
            </section>
            <GoalForm />
            {status === Statuses.loading && action === Actions.readgoal ? (
                <section
                    style={{
                        height: "300px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <ReactLoading
                        type="spinningBubbles"
                        width={50}
                        color="#333"
                    />
                </section>
            ) : (
                <section className="content">
                    {goals.length > 0 ? (
                        <div className="goals">
                            {goals.map((goal) => (
                                <GoalItem key={goal._id} goal={goal} />
                            ))}
                        </div>
                    ) : (
                        <h3>You have not set any goals</h3>
                    )}
                </section>
            )}
        </div>
    );
}

export default Dashboard;
