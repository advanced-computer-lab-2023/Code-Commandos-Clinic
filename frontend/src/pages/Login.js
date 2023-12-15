import React, { useState} from "react";
import "../css/style.css"
import {Link, useNavigate} from "react-router-dom";
import Swal from "sweetalert2";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const isLogged = window.localStorage.getItem("logged");
    const handleLogin = async() => {
        const response = await fetch('/api/user/login', {
            method: 'POST',
            body: JSON.stringify({username,password}),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        if(response.ok){
            const result = await response.json()
            window.localStorage.setItem("logged",true)
            window.localStorage.setItem("role",result.role)
            window.localStorage.setItem("username",result.username)
            window.localStorage.setItem("id",result.id)
            navigate('/Home')
            window.location.reload()
        }
        if (!response.ok) {
            Swal.fire({
                icon: 'error',
                title: 'Login Failed',
                text: "Invalid credentials",
            });
        }
    };

        return (
            <div className="container">
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
                                    <br />
                                    <button
                                        type="button"
                                        className="btn btn-danger btn-block buttons"
                                        onClick={handleLogin}
                                    >
                                        Login
                                    </button>
                                    <br/>

                                    <p className="text-center">
                                        <Link to="/EnterEmailReset">Forgot Password?</Link>
                                    </p>
                                    <p className="text-center">
                                        <Link to="/Register">Sign Up</Link>
                                    </p>

                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
};

export default Login;
