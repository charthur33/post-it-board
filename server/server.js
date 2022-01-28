const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const app = express();
app.use(express.json());
app.use(cors());
// get driver connection
//const dbo = require("./db/conn");
 

const port = process.env.PORT || 5000;

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

app.use("/users", require("./routes/users"));
//app.use("/notes", require("./routes/notes"));


// app.listen(port, () => {
//   // perform a database connection when server starts
//   dbo.connectToServer(function (err) {
//     if (err) console.error(err);
 
//   });
//   console.log(`Server is running on port: ${port}`);
// });