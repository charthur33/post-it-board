import React, { useContext } from "react";
import Header from "./layout/Header.jsx";
import UserContext from '../context/userContext';
import Footer from "./layout/Footer.jsx";
import NoteArea from "./NoteArea.jsx";
import AccessPage from "./AccessPage.jsx";
import LoginHeader from "./layout/LoginHeader.jsx";

function Home() {

    const { userData } = useContext(UserContext);

    return (
        <div className="container">
            {userData.user ? (
                <>
                    <Header displayname={userData.user.displayname} />
                    <NoteArea />
                </>
            ) : (
                <>
                    <LoginHeader />
                    <img src={"../../images/post-it1.png"} alt="fun note 1" className="postit-img1" />
                    <img src={"../../images/post-it2.png"} alt="fun note 2" className="postit-img2" />
                    <img src={"../../images/post-it3.png"} alt="fun note 3" className="postit-img3" />
                    <img src={"../../images/post-it4.png"} alt="fun note 4" className="postit-img4" />
                    <AccessPage />
                </>

            )}
            <Footer />
        </div>
    );

}

export default Home;