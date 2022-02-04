import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';

function AccessPage() {

    const [loginPushed, setLoginPushed] = useState(false);
    const [registerPushed, setRegisterPushed] = useState(false);
    const navigate = useNavigate();

    function handleLogin() {
        setLoginPushed(true);
    }

    function handleRegister() {
        setRegisterPushed(true);
    }

    useEffect(() => {
        if (loginPushed) {
            navigate("/login");
        }
        if (registerPushed) {
            navigate("/register");
        }
    }, [loginPushed, registerPushed, navigate]);


    return (
        <div className="access-page">
            <h1>Hello!</h1>
            <h2>Welcome to the unlimited digital post-it note experience.</h2>
            <h3><b>Existing Users: </b> Login to see your board.</h3>
            <h3><b>New Users: </b> Click Register to sign up.</h3>
            <button onClick={handleLogin}>
                Login
            </button>
            <div></div>
            <button onClick={handleRegister}>
                Register
            </button>
        </div>
    );
}

export default AccessPage;