import React from "react";

const Button = ({ text, onClick, type = "button", disabled }) => {
    return (
        <button
            onClick={onClick}
            type={type}
            disabled={disabled}
            style={{
            width: "100%",
            padding: "10px",
            backgroundColor: disabled ? "#aaa" : "#007bff",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: disabled ? "not-allowed" : "pointer",
            fontWeight: "600",
        }}
        >
            { text }   
        </button>
    )
}

export default Button;