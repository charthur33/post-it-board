import React from "react";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

function Note(props) {

    var rotateString = "rotate(" + props.customRotation + ")";
    var noteStyle = {
        backgroundColor: props.customColor,
        transform: rotateString
    };

    return (
        <div className="note" style={noteStyle}>
            <h1>{props.title}</h1>
            <p>{props.content}</p>
            <button onClick={() => props.onDelete(props.id)}>
                <DeleteForeverIcon style={{ fontSize: "1.6rem" }} />
            </button>
        </div>
    );
}

export default Note;
