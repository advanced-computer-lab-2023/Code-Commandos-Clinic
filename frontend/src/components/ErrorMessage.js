import React from "react";

const ErrorMessage = ({ message }) => {
    return (
        <div className="error">
            <br/>
            <br/>
            <h2>{message}</h2>
        </div>
    );
};

export default ErrorMessage;
