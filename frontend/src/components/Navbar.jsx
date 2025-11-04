import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login")
    }

    return (
        <nav>
            <div>
                <Link to="/">Task Manager</Link>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
                {user ? (
                <>
                    <Link to="/dashboard" style={{ color: "white", textDecoration: "none" }}>
                    Dashboard
                    </Link>
                    <Link to="/tasks" style={{ color: "white", textDecoration: "none" }}>
                    My Tasks
                    </Link>
                    <span>Welcome, {user.name.split(" ")[0]}</span>
                    <button
                    onClick={handleLogout}
                    style={{
                        backgroundColor: "#f44336",
                        color: "#fff",
                        border: "none",
                        borderRadius: "4px",
                        padding: "6px 10px",
                        cursor: "pointer",
                    }}
                    >
                    Logout
                    </button>
                </>
                ) : (
                <>
                    <Link to="/login" style={{ color: "white", textDecoration: "none" }}>
                    Login
                    </Link>
                    <Link to="/register" style={{ color: "white", textDecoration: "none" }}>
                    Register
                    </Link>
                </>
                )}
            </div>
        </nav>
    )
}

export default Navbar;