import { FaSignInAlt, FaSignOutAlt, FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../features/auth/authSlice";

function Header() {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);

    const handleLogout = () => {
        dispatch(logout());
    };
    return (
        <div className="header">
            <div className="logo">
                <Link to={"/"}>Goal SEtter</Link>
            </div>
            <ul>
                {user ? (
                    <li>
                        <button
                            className="btn btn-block"
                            onClick={handleLogout}
                        >
                            <FaSignOutAlt /> Logout
                        </button>
                    </li>
                ) : (
                    <>
                        <li>
                            <Link to={"/login"}>
                                <FaSignInAlt /> Login
                            </Link>
                        </li>
                        <li>
                            <Link to={"/register"}>
                                <FaUser /> Register
                            </Link>
                        </li>
                    </>
                )}
            </ul>
        </div>
    );
}

export default Header;
