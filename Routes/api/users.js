const express = require("express");

const router = express.Router();

// @route  GET api/users/test
// @desc   Test users Route
// @acess  Public
router.get("/test", (req, res) => res.json({ msg: "Hello Misbah" }));

module.exports = router;
