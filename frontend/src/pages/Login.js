import { useState, useEffect } from "react";
import { login } from "../features/auth/authSlice";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FaSignInAlt } from "react-icons/fa";
import ReactLoading from "react-loading";
import Statuses from "../constants/Statuses";
import Actions from "../constants/Actions";

function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { status, action } = useSelector((state) => state.auth);
    const loading = Boolean(
        status === Statuses.loading && action === Actions.login
    );
    const success = Boolean(
        status === Statuses.idle && action === Actions.login
    );
    const error = Boolean(
        status === Statuses.error && action === Actions.login
    );
    useEffect(() => {
        if (success) {
            navigate("/");
        }
    }, [success]);

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const { email, password } = formData;

    const OnChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const OnSubmit = (e) => {
        e.preventDefault();
        dispatch(login({ email, password }));
    };

    return (
        <>
            <section className="heading">
                <h1>
                    <FaSignInAlt /> Login
                </h1>
            </section>
            <section className="form">
                <form onSubmit={OnSubmit}>
                    <div className="form-group">
                        <input
                            type="email"
                            className="form-control"
                            id="email"
                            name="email"
                            value={email}
                            onChange={OnChange}
                            placeholder="Enter Email"
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="password"
                            className="form-control"
                            id="password"
                            name="password"
                            value={password}
                            onChange={OnChange}
                            placeholder="Enter Password"
                        />
                    </div>
                    <div className="form-group">
                        <button type="submit" className="btn btn-block">
                            {loading ? (
                                <ReactLoading
                                    type="spin"
                                    color="#ccc"
                                    width={34}
                                    height={34}
                                />
                            ) : (
                                "submit"
                            )}
                        </button>
                    </div>
                </form>
            </section>
        </>
    );
}

export default Login;
