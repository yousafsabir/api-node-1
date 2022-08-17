import { useState, useEffect } from "react";
import { register } from "../features/auth/authSlice";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import Statuses from "../constants/Statuses";
import Actions from "../constants/Actions";

function Register() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { status, action } = useSelector((state) => state.auth);
    useEffect(() => {
        if (status === Statuses.idle && action === Actions.register) {
            navigate("/");
        }
    }, [status, action]);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        password2: "",
    });
    console.log(formData);

    const { name, email, password, password2 } = formData;

    const OnChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const OnSubmit = (e) => {
        e.preventDefault();
        dispatch(register({ name, email, password }));
    };

    return (
        <>
            <section className="heading">
                <h1>
                    <FaUser /> Register
                </h1>
            </section>
            <section className="form">
                <form onSubmit={OnSubmit}>
                    <div className="form-group">
                        <input
                            type="text"
                            className="form-control"
                            id="name"
                            name="name"
                            value={name}
                            onChange={OnChange}
                            placeholder="Enter Your Name"
                        />
                    </div>
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
                        <input
                            type="password"
                            className="form-control"
                            id="password2"
                            name="password2"
                            value={password2}
                            onChange={OnChange}
                            placeholder="Confirm Password"
                        />
                    </div>
                    <div className="form-group">
                        <button type="submit" className="btn btn-block">
                            Submit
                        </button>
                    </div>
                </form>
            </section>
        </>
    );
}

export default Register;
