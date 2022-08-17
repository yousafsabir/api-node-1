import { FaSignInAlt, FaSignOutAlt, FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";

function Header() {
    return (
        <div className="header">
            <div className="logo">
                <Link to={"/"}>Goal SEtter</Link>
            </div>
            <ul>
                <li>
                    <Link to={"/login"}>
                        <FaSignInAlt />
                    </Link>
                </li>
                <li>
                    <Link to={"/register"}>
                        <FaUser />
                    </Link>
                </li>
            </ul>
        </div>
    );
}

export default Header;
