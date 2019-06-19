const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

const Post = require("../../models/Post");
// @route  GET api/posts/test
// @desc   Test posts Route
// @acess  Public
router.get("/test", (req, res) => res.json({ msg: "Misbah Posts" }));

// @route  Post api/posts
// @desc   Creat Post
// @acess  Private

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const newPost = new Post({
      text: req.body.text,
      name: req.body.name,
      avatar: req.body.name,
      user: req.user.id
    });

    newPost.save().then(post => res.json(post));
  }
);

module.exports = router;
