const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema({
    noteTitle: String,
    noteContent: String,
    noteColor: String,
    displayStyle: String,
    userID: String
});

module.exports = Note = mongoose.model("note", noteSchema);