const express = require("express");
const router = require("express").Router();
const Note = require("../models/note.model");
const auth = require("../middleware/auth");
//const bodyParser = require("body-parser");



//add note
router.post("/add-note", async (req, res) => {
    try {
        let { noteTitle, noteContent, noteColor, displayStyle, userID } = req.body;
        const newNote = new Note({
            noteTitle,
            noteContent,
            noteColor,
            displayStyle,
            userID
        });
        const savedNote = await newNote.save();
        res.json(savedNote);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

//Get all notes that match userID
router.get("/get-notes", async (req, res) => {
    try {
        const { userID } = req.query;
        const notes = await Note.find({userID: userID});
        res.json(notes);
    } catch (err) {
        console.log(err);
    }
});

//delete note
router.delete("/delete-note", async (req, res) => {
    try {
        const { noteID } = req.query;
        const deletedNote = await Note.findByIdAndDelete(noteID);
        res.json(deletedNote);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
