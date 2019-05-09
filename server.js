const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const users = require("./Routes/api/users");
const profile = require("./Routes/api/profile");
const posts = require("./Routes/api/posts");

const app = express();

// bodyParser Middelware used for find the data from req.body.etc
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// DB Config
const db = require("./config/keys").mongoURI;

// connnect to MongoDB
mongoose
  .connect(db)
  .then(() => console.log("Mongoose Connected"))
  .catch(err => console.log(err));
app.get("/", (req, res) => res.send("helo!"));

// Routes

app.use("/api/users", users);
app.use("/api/profile", profile);
app.use("/api/posts", posts);

const port = process.env.PORT || 7000;

app.listen(port, () => console.log(`Server runnign on port ${port}`));
