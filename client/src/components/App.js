import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import axios from 'axios';

import Login from "./auth/Login.jsx";
import Register from "./auth/Register.jsx";
import UserContext from "../context/userContext";
import Home from "./Home.jsx";

function App() {

    const [userData, setUserData] = useState({
        token: undefined,
        user: undefined
    });

    useEffect(() => {
        const checkLoggedIn = async () => {
            let token = localStorage.getItem("auth-token");
            if (token === null) {
                localStorage.setItem("auth-token", "");
                token = "";
            }
            const tokenResponse = await axios.post('http://localhost:5000/users/tokenIsValid', null, { headers: { "x-auth-token": token } });
            if (tokenResponse.data) {
                const userRes = await axios.get("http://localhost:5000/users/", {
                    headers: { "x-auth-token": token },
                });
                setUserData({
                    token,
                    user: userRes.data,
                });
            }
        }
        checkLoggedIn();
    }, []);

    return (
        <BrowserRouter>
            <UserContext.Provider value={{ userData, setUserData }}>
                <Routes>
                    <Route exact path="/" element={<Home />} />
                    <Route path="/register" element={<Register/>} />
                    <Route path="/login" element={<Login />} />
                </Routes>
            </UserContext.Provider>
        </BrowserRouter>
    );

}

export default App; 