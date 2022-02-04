import React, { useState, useContext } from "react";
import Note from "./Note.jsx";
import axios from "axios";
import InputArea from "./InputArea.jsx";
import UserContext from '../context/userContext';

function NoteArea(props) {
    const [allNotes, setNewNote] = useState([]);
    const { userData } = useContext(UserContext);
    const userIDString = userData.user.id + "";
    const [firstLoad, setFirstLoad] = useState(false);

    //initial call to render a user's notes when they log in
    if (firstLoad === false) {
        getUserNotes();
        setFirstLoad(true);
    }

    async function addNote(newNoteTitle, newNoteContent, color, rotation) {
        try {
            const newNote = {
                noteTitle: newNoteTitle,
                noteContent: newNoteContent,
                noteColor: color,
                displayStyle: rotation,
                userID: userIDString
            };
            await axios.post("http://localhost:5000/notes/add-note", newNote);
            getUserNotes();
        } catch (err) {
            console.log(err);
        }
    }

    //Get notes specific to current user 
    async function getUserNotes() {
        let userNoteID = userIDString;
        try {
            const notes = await axios.get("http://localhost:5000/notes/get-notes?userID=" + userNoteID);
            var userNotes = notes.data;
            setNewNote(userNotes);
        } catch (err) {
            console.log(err);
        }
    }

    async function deleteNote(id) {
        let noteToDelete = allNotes[id];
        try {
            await axios.delete("http://localhost:5000/notes/delete-note?noteID=" + noteToDelete._id);
            setNewNote((prevNotes) => {
                return prevNotes.filter((note, index) => {
                    return index !== id;
                });
            });
        } catch (err) {
            console.log(err);
        }
    }


    return (
        <div className="container">
            <InputArea onAdd={addNote} />
            {allNotes.map((note, index) => (
                <Note
                    key={index}
                    id={index}
                    onDelete={deleteNote}
                    title={note.noteTitle}
                    content={note.noteContent}
                    customColor={note.noteColor}
                    customRotation={note.displayStyle}
                />
            ))}
        </div>
    );

}

export default NoteArea;
