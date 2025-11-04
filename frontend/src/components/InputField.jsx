import React from "react";

const InputField = ({ label, type, name, value, onChange, placeholder }) => {
    return (
        <div className="input-group" style={{marginBottom: "1rem"}}>
            <label>
                { label }
            </label>
            <input
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                style={{
                    width: "100%",
                    padding: "10px",
                    borderRadius: "8px",
                    border: "1px solid #ccc",
                  }}
            />
        </div>
    )
}

export default InputField;