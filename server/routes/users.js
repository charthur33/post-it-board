const router = require("express").Router();
const express = require("express");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");
const User = require("../models/user.model");

// Register
router.post("/register", async (req, res) => {
    try {
        let { username, password, passwordCheck } = req.body;
        // validate
        if (!username || !password || !passwordCheck)
            return res.status(400).json({ msg: "Not all fields have been entered." });
        if (password.length < 5)
            return res
                .status(400)
                .json({ msg: "The password needs to be at least 5 characters long." });
        if (password !== passwordCheck)
            return res
                .status(400)
                .json({ msg: "Enter the same password twice for verification." });
        const existingUser = await User.findOne({ username: username });
        if (existingUser)
            return res
                .status(400)
                .json({ msg: "An account with this username already exists." });
        
        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);

        const newUser = new User({
            username,
            password: passwordHash
        });
        const savedUser = await newUser.save();
        res.json(savedUser);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Login
router.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body;
        // validate
        if (!username || !password)
            return res.status(400).json({ msg: "Not all fields have been entered." });
        const user = await User.findOne({ username: username });
        if (!user)
            return res
                .status(400)
                .json({ msg: "No account with this username has been registered." });
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ msg: "Username and/or password is invalid." });
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        res.json({
            token,
            user: {
                id: user._id
            },
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Delete
router.delete("/delete", auth, async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.user);
        res.json(deletedUser);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Check if token is valid
router.post("/tokenIsValid", async (req, res) => {
    try {
        const token = req.header("x-auth-token");
        if (!token) return res.json(false);
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        if (!verified) return res.json(false);
        const user = await User.findById(verified.id);
        if (!user) return res.json(false);
        return res.json(true);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get("/", auth, async (req, res) => {
    const user = await User.findById(req.user);
    res.json({
        username: user.username,
        id: user._id,
    });
});


module.exports = router;