const express = require("express");
const router = require("express").Router();
const Note = require("../models/note.model");

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
router.get("/", async (req, res) => {
    try {
        const notes = await Note.find({ userID: req.userID });
        res.json(notes);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

//delete note
router.delete("/delete-note", async (req, res) => {
    try {
        const deletedNote = await Note.findByIdAndDelete(req.note);
        res.json(deletedNote);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
