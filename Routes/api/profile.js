const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

//Loading Profile Model

const Profile = require("../../models/Profile");
// Loadinf User Profile
const User = require("../../models/User");

// @route  GET api/profile/test
// @desc   Test profile Route
// @acess  Public
router.get("/test", (req, res) => res.json({ msg: "Misbah Profile" }));

// @route  GET api/profile
// @desc   User profile Route
// @acess  Private

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};

    Profile.findOne({ user: req.user.id })
      .then(profile => {
        if (!profile) {
          errors.noprofile = "There Is No Profile For This User";
          return res.status(404).json(errors);
        }
        res.json(profile);
      })
      .catch(err => res.status(404).json(err));
  }
);

module.exports = router;
