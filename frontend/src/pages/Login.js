import React, { useState } from "react";
import Navbar from "../components/Navbar";
import "../css/style.css"
function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loginSuccess, setLoginSuccess] = useState(false); // State variable to track login success

    const handleLogin = async() => {
        const response = await fetch('/api/user/login', {
            method: 'POST',
            body: JSON.stringify({username,password}),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        if(response.ok){
            setLoginSuccess(true)
        }
        if (!response.ok) {
            alert(await response.text())
        }
    };

    return (
        <div className="container">
            {loginSuccess ? (
                <Navbar />
            ) : (
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <div className="card mt-5 border-danger box">
                            <h1 className="text-center">Login</h1>
                            <div className="card-body">
                                <form>
                                    <div className="form-group">
                                        <label htmlFor="username">Username</label>
                                        <input
                                            type="text"
                                            className="form-control input-danger fontMed"
                                            id="username"
                                            value={username}
                                            onChange={(e) => setUsername(e.target.value)}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="password">Password</label>
                                        <input
                                            type="password"
                                            className="form-control input-danger"
                                            id="password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                        />
                                    </div>
                                    <br/>
                                    <button
                                        type="button"
                                        className="btn btn-danger btn-block buttons" // Make the button span the width
                                        onClick={handleLogin}
                                    >
                                        Login
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Login;
