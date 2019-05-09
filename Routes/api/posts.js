const express = require("express");

const router = express.Router();

// @route  GET api/posts/test
// @desc   Test posts Route
// @acess  Public
router.get("/test", (req, res) => res.json({ msg: "Misbah Posts" }));

module.exports = router;
