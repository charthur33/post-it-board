import React from "react";
import StickyNote2OutlinedIcon from '@mui/icons-material/StickyNote2Outlined';


function LoginHeader(props) {
  
    const currentDate = new Date();
    const dateString = currentDate.toDateString();

    return (
      <header>
        <h1> <StickyNote2OutlinedIcon /> </h1>
        <h1> My Post-it Board</h1>
        <h2>{dateString}</h2>
      </header>
    );
}

export default LoginHeader;