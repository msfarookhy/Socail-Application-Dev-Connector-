const express = require("express");

const router = express.Router();

// @route  GET api/profile/test
// @desc   Test profile Route
// @acess  Public
router.get("/test", (req, res) => res.json({ msg: "Misbah Profile" }));

module.exports = router;
