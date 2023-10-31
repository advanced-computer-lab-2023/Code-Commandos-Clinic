import React, { useState,useEffect} from "react";
import "../css/style.css"
import LoginForm from "../components/LoginForm";
import {useNavigate} from "react-router-dom";

const Login = () => {

    const navigate = useNavigate();

    const [showLogIn, setShowLogIn] = useState(false);

    useEffect(() => {
        checkLogIn();
    }, []);
    const checkLogIn = async ()=>{
        try {
            const response = await fetch('/api/user/checkLoggedIn',{
                method: 'GET',
                headers: {
                    'Content-Type':'application/json',
                },
            });
            if(response.ok){
                console.log("frontend says logged in")
                navigate("/Home", { replace: true });
            }
            else {
                console.log("not logged in from frontend")
                setShowLogIn(true);
            }
        }
        catch (error){
            setShowLogIn(true);
        }
    }



    return (
        <div>
            {showLogIn && <LoginForm />}
        </div>
    );
}

export default Login;
