import React, { useContext } from 'react';
import UserContext from "../../context/userContext";

function Logout() {
    const { userData, setUserData } = useContext(UserContext);
    
    const logout = () => {
        setUserData({
            token: undefined,
            user: undefined
        })
        localStorage.setItem("auth-token", "");
    };
    return (
        <nav className="logout">
            <button onClick={logout}>Logout</button>
        </nav>
    )
}
export default Logout;