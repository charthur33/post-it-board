import React from "react";
import Logout from '../auth/Logout.jsx';
import StickyNote2OutlinedIcon from '@mui/icons-material/StickyNote2Outlined';


function Header(props) {
  
    const currentDate = new Date();
    const dateString = currentDate.toDateString();
    var displaynameString = props.displayname + "'s";

    return (
      <header>
        <h1> <StickyNote2OutlinedIcon /> {displaynameString} Post-it Board</h1>
        <h2>{dateString}</h2>
        <Logout />
      </header>
    );
}

export default Header;