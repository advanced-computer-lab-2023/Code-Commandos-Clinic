import React, { useState,useEffect} from "react";
import "../css/style.css"
import {useNavigate} from "react-router-dom";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async() => {
        const response = await fetch('/api/user/login', {
            method: 'POST',
            body: JSON.stringify({username,password}),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        if(response.ok){
            window.localStorage.setItem("logged",true)
            navigate('/Home')
        }
        if (!response.ok) {
            alert(await response.text())
        }
    };

    return(
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
                                <br/>
                                <button
                                    type="button"
                                    className="btn btn-danger btn-block buttons"
                                    onClick={handleLogin}
                                >
                                    Login
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;
