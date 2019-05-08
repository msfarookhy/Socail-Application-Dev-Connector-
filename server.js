const express = require("express");

const app = express();

app.get("/", (req, res) => res.send("helo!"));

const port = process.env.PORT || 7000;

app.listen(port, () => console.log(`Server runnign on port ${port}`));
