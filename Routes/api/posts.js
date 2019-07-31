const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

// post model
const Post = require("../../models/Post");

// Profile Model
const Profile = require("../../models/Profile");

//post validation
const validatePostInput = require("../../validation/post");

// @route  GET api/posts/test
// @desc   Test posts Route
// @acess  Public
router.get("/test", (req, res) => res.json({ msg: "Misbah Posts" }));

// @route  GET api/posts
// @desc   GET Post
// @acess  Public

router.get("/", (req, res) => {
  Post.find()
    .sort({ date: -1 })
    .then(posts => res.json(posts))
    .catch(err => res.status(404).json({ nopostfound: "No Post Found" }));
});

// @route  GET api/posts/:id
// @desc   GET Post by id
// @acess  Public

router.get("/:id", (req, res) => {
  Post.findById(req.params.id)
    .then(post => res.json(post))
    .catch(err =>
      res.status(404).json({ nopostfound: "No Post Found With That ID" })
    );
});

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

// @route  Delete api/posts/:id
// @desc   DELETE post by id
// @acess  Private

router.delete(
  "/:id",
  passport.authenticate("jwt", { seesion: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
      Post.findById(req.params.id)
        .then(post => {
          // cheking post of the owner
          if (post.user.toString() !== req.user.id) {
            return res
              .status(401)
              .json({ notauthorized: "User Not Authorized" });
          }
          //Delete POst
          post.remove().then(() => res.json({ sucees: true }));
        })
        .catch(err => res.status(404).json({ postnotfound: "No Post Found" }));
    });
  }
);

// @route  POst api/posts/like/:id
// @desc   like post
// @acess  Private

router.post(
  "/like/:id",
  passport.authenticate("jwt", { seesion: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
      Post.findById(req.params.id)
        .then(post => {
          if (
            post.likes.filter(like => like.user.toString() === req.user.id)
              .length > 0
          ) {
            return res
              .status(400)
              .json({ alredyliked: " User Alredy Liked The Post" });
          }
          // Add User id to likes array
          post.likes.unshift({ user: req.user.id });

          post.save().then(post => res.json(post));
        })
        .catch(err => res.status(404).json({ nopostfound: "No Post Found" }));
    });
  }
);

// @route  Post api/posts/unlike/:id
// @desc   unlike post
// @acess  Private

router.post(
  "/unlike/:id",
  passport.authenticate("jwt", { seesion: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
      Post.findById(req.params.id)
        .then(post => {
          if (
            post.likes.filter(like => like.user.toString() === req.user.id)
              .length === 0
          ) {
            return res
              .status(400)
              .json({ notliked: " You Have Not Liked The Post Yet" });
          }
          // Get Remove Index
          const removeIndex = post.likes
            .map(item => item.user.toString())
            .indexOf(req.user.id);

          //split out of array
          post.likes.splice(removeIndex, 1);

          // Save
          post.save().then(post => res.json(post));
        })
        .catch(err => res.status(404).json({ nopostfound: "No Post Found" }));
    });
  }
);

// @route  Post api/posts/comment/:id
// @desc   Comment On post
// @acess  Private

router.post(
  "/comment/:id",
  passport.authenticate("jwt", { seesion: false }),
  (req, res) => {
    //destructring
    const { errors, isValid } = validatePostInput(req.body);
    //check validation
    if (!isValid) {
      //send errors in 400 in object
      res.status(400).json(errors);
    }
    Post.findById(req.params.id)
      .then(post => {
        const newComment = {
          text: req.body.text,
          name: req.body.name,
          avatar: req.body.avatar,
          user: req.user.id
        };
        // add comment to post
        post.comments.unshift(newComment);

        // save comment
        post.save().then(post => res.json(post));
      })
      .catch(err => res.status(404).json({ postnotfound: "No Post Found" }));
  }
);

// @route  DELETE api/posts/comment/:id/:comment_id
// @desc   DELETE Comment From post
// @acess  Private

router.delete(
  "/comment/:id/:comment_id",
  passport.authenticate("jwt", { seesion: false }),
  (req, res) => {
    Post.findById(req.params.id)
      .then(post => {
        if (
          post.comments.filter(
            comment => comment.id.toString() === req.params.comment_id
          ).length === 0
        ) {
          return res
            .status(404)
            .json({ commentnotexists: "Comment Does Not Exists" });
        }
        // GET Remove Index
        const removeIndex = post.comments
          .map(item => item._id.toString())
          .indexOf(req.params.comment_id);

        //splice out comment
        post.comments.splice(removeIndex, 1);
        post.save().then(post => res.json(post));
      })
      .catch(err => res.status(404).json({ postnotfound: "No Post Found" }));
  }
);

module.exports = router;
