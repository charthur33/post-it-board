import React, { useState, useContext } from 'react';
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import UserContext from "../../context/userContext";
import ErrorNotice from "../../components/misc/ErrorNotice";
import LoginHeader from '../layout/LoginHeader.jsx';

function Register() {
    const [username, setUsername] = useState();
    const [displayname, setDisplayname] = useState();
    const [password, setPassword] = useState();
    const [passwordCheck, setPasswordCheck] = useState();
    const [error, setError] = useState();
    const { setUserData } = useContext(UserContext);
    const navigate = useNavigate();
    const submit = async (e) => {
        e.preventDefault();
        try {
            const newUser = { username, displayname, password, passwordCheck };
            await axios.post("users/register", newUser);
            const loginResponse = await axios.post("users/login", {
                username, password
            });
            setUserData({
                token: loginResponse.data.token,
                user: loginResponse.data.user
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
                <h1>Register</h1>
                {error && <ErrorNotice message={error} clearError={() => setError(undefined)} />}
                <form onSubmit={submit}>
                    <div className="login-register-input">
                        <label>Username: </label>
                        <input type="text" placeHolder="Type your username" id="username" onChange={e => setUsername(e.target.value)} />
                        <label>Display Name:  </label>
                        <input type="text" placeHolder="Type a display name" id="displayname" onChange={e => setDisplayname(e.target.value)} />
                        <label>Password: </label>
                        <input type="password" placeHolder="Type your password" id="password" onChange={e => setPassword(e.target.value)} />
                        <label>Confirm Password: </label>
                        <input type="password" placeHolder="Confirm your password" onChange={e => setPasswordCheck(e.target.value)} />
                        <button className="login-register-btn" type="submit">Register</button>
                    </div>
                </form>
                <div className="link">
                    <Link to="/">Go Back</Link>
                </div>
            </div>
        </div>
    );
}
export default Register;