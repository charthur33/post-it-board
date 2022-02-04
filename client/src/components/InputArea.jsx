import React, { useState } from "react";
import AddIcon from '@mui/icons-material/Add';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Fab from '@mui/material/Fab';
import Zoom from '@mui/material/Zoom';


function InputArea(props) {
    const [note, setNote] = useState({ noteTitle: "", noteContent: "" });
    const [noteColor, setNoteColor] = useState("#FFFF99");
    const [noteRotation, setNoteRotation] = useState("none");
    const [isExpanded, setExpand] = useState(false);

    const addBtnStyle = {
        position: "absolute",
        right: "21px",
        bottom: "-21px",
        background: "#24a0ed",
        color: "#fff",
        border: "none",
        borderRadius: "50%",
        width: "42px",
        height: "42px",
        boxShadow: "0 1px 3px rgba(0, 0, 0, 0.3)",
        cursor: "pointer",
        outline: "none"
    }

    function handleChange(event) {
        const { name, value } = event.target;
        setNote((prevValue) => {
            return {
                ...prevValue,
                [name]: value
            };
        });
    }

    function handleColor(event) {
        const color = event.target.value;
        setNoteColor(color);
    }

    function randomRotationVal() {
        const rand1 = Math.floor(Math.random() * 2);
        var rotationAmount = Math.floor(Math.random() * 16);
        if (rand1 === 1) {
            rotationAmount *= -1;
            return rotationAmount;
        } else {
            return rotationAmount;
        }
    }

    function handleRotation(event) {
        if (event.target.value === "funky") {
            var rotationAmount = randomRotationVal();
            setNoteRotation(rotationAmount + "deg");
        } else {
            setNoteRotation("none");
        }
    }

    function handleExpand() {
        setExpand(true);
    }

    function handleHide() {
        setExpand(false);
        setNoteColor("#FFFF99");
        setNoteRotation("none");
    }

    return (
        <div className="create-note">
            <form
                onSubmit={(event) => {
                    props.onAdd(note.noteTitle, note.noteContent, noteColor, noteRotation);
                    setNote({ noteTitle: "", noteContent: "" }); 
                    if (noteRotation !== "none") {
                        setNoteRotation(randomRotationVal() + "deg"); 
                    }
                    event.preventDefault(); 
                }}
            >
                {isExpanded && (
                    <input
                        onChange={handleChange}
                        name="noteTitle"
                        value={note.noteTitle}
                        placeholder="Title"
                        maxLength={40}
                    />
                )}
                <textarea
                    onChange={handleChange}
                    onClick={handleExpand}
                    name="noteContent"
                    value={note.noteContent}
                    placeholder="Take a note..."
                    rows={isExpanded ? "4" : "1"}
                    maxLength={120}
                />
                {isExpanded && (
                    <div className="note-options">
                        <div className="color-select">
                            <p>Color:</p>
                            <input onChange={handleColor} type="radio" id="yellow" name="color" value="#FFFF99" defaultChecked />
                            <label htmlFor="yellow">Yellow</label>
                            <input onChange={handleColor} type="radio" id="pink" name="color" value="#FF7EB9" />
                            <label htmlFor="green">Pink</label>
                            <input onChange={handleColor} type="radio" id="blue" name="color" value="#7afcff" />
                            <label htmlFor="blue">Blue</label>
                        </div>
                        <div className="display-select">
                            <p>Display Style:</p>
                            <input onChange={handleRotation} type="radio" id="straight" name="display" value="straight" defaultChecked />
                            <label htmlFor="straight">Straight</label>
                            <input onChange={handleRotation} type="radio" id="funky" name="display" value="funky" />
                            <label htmlFor="funky">Funky</label>
                        </div>
                    </div>
                )}
                {isExpanded && (
                    <button onClick={handleHide} className="hide-menu-btn" type="button">
                        <KeyboardArrowUpIcon style={{ paddingRight: "4px", paddingBottom: "4px" }} />
                    </button>
                )}
                <Zoom in={isExpanded ? true : false}>
                    <Fab type="submit" style={addBtnStyle}>
                        <AddIcon />
                    </Fab>
                </Zoom>

            </form>

        </div>
    );
}

export default InputArea;