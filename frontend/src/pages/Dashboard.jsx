// src/pages/Dashboard.jsx
import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const { user } = useContext(AuthContext);

  return (
    <div style={{ padding: "24px" }}>
      <h2>Welcome, {user?.name || "User"} 👋</h2>
      <p>This is your personal dashboard.</p>

      <div style={{ marginTop: "20px" }}>
        <Link to="/tasks" style={{ color: "blue", textDecoration: "underline" }}>
          Go to your Tasks →
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
