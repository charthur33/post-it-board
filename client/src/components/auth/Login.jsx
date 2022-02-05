import React, { useState, useContext } from 'react';
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import UserContext from "../../context/userContext.js";
import ErrorNotice from "../../components/misc/ErrorNotice.jsx";
import LoginHeader from '../layout/LoginHeader.jsx';

function Login() {
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [error, setError] = useState();
    const { setUserData } = useContext(UserContext);
    const navigate = useNavigate();
    const submit = async (e) => {
        e.preventDefault();
        try {
            const loginUser = { username, password };
            const loginResponse = await axios.post("users/login", loginUser);
            setUserData({
                token: loginResponse.data.token,
                user: loginResponse.data.user,
                displayname: loginResponse.data.user.displayname
            });
            localStorage.setItem("auth-token", loginResponse.data.token);
            navigate("/");
        } catch (err) {
            err.response.data.msg && setError(err.response.data.msg)
        }
    };
    return (
        <div>
            <LoginHeader />
            <div className="access-page">
                <h1>Login</h1>
                {error && <ErrorNotice message={error} clearError={() => setError(undefined)} />}
                <form onSubmit={submit}>
                    <div className="login-register-input">
                        <label>Username: </label>
                        <input type="text" id="username" placeHolder="Type your username" onChange={e => setUsername(e.target.value)} />
                        <label>Password: </label>
                        <input type="password" id="password" placeHolder="Type your password" onChange={e => setPassword(e.target.value)} />
                        <button className="login-register-btn" type="submit">Login</button>
                    </div>
                </form>
                <div className="link">
                    <Link to="/">Go Back</Link>
                </div>
            </div>
        </div>
    );
}
export default Login;