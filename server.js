const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const app = express();
const path = require("path");
app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, "client", "build"))); 

const port = process.env.PORT || 5000;

app.use("/users", require("./routes/users"));
app.use("/notes", require("./routes/notes"));


app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

app.listen(port, () => console.log(`The server has started on port: ${port}`));
mongoose.connect(
  process.env.ATLAS_CONNECTION_STRING,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  },
  (err) => {
    if (err) throw err;
    console.log("MongoDB connection established");
  }
);



