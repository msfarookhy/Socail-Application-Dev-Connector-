const express = require("express");
const mongoose = require("mongoose");

const app = express();

// DB Config
const db = require("./config/keys").mongoURI;

// connnect to MongoDB
mongoose
  .connect(db)
  .then(() => console.log("Mongoose Connected"))
  .catch(err => console.log(err));
app.get("/", (req, res) => res.send("helo!"));

const port = process.env.PORT || 7000;

app.listen(port, () => console.log(`Server runnign on port ${port}`));
