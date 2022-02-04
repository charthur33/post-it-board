const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    displayname: {
        type: String,
        required: true,
        unique: false
    },
    password: {
        type: String,
        required: true,
        minlength: 5
    }
});

module.exports = User = mongoose.model("user", userSchema);