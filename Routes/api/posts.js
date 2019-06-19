const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

// post model
const Post = require("../../models/Post");

//post validation
const validatePostInput = require("../../validation/post");
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
    //destructring input post

    const { errors, isValid } = validatePostInput(req.body);

    //check validation

    if (!isValid) {
      //send errors in 400 in object
      res.status(400).json(errors);
    }

    const newPost = new Post({
      text: req.body.text,
      name: req.body.name,
      avatar: req.body.avatar,
      user: req.user.id
    });

    newPost.save().then(post => res.json(post));
  }
);

module.exports = router;
