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

// @route  POST api/profile
// @desc   Creat Or Update Profile
// @acess  Private

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    //GET FIelds
    const profileFields = {};
    profileFields.user = req.user.id;
    if (req.body.handle) profileFields.handle = req.body.handle;
    if (req.body.company) profileFields.company = req.body.company;
    if (req.body.website) profileFields.website = req.body.website;
    if (req.body.location) profileFields.location = req.body.location;
    if (req.body.bio) profileFields.bio = req.body.bio;
    if (req.body.status) profileFields.status = req.body.handle;
    if (req.body.githubusername)
      profileFields.githubusername = req.body.githubusername;

    //SKills Splits into array
    if (typeof req.body.skills != "undefined") {
      profileFields.skills = req.body.skills.split(",");
    }

    //Social schema fields

    profileFields.social = {};

    if (req.body.youtube) profileFields.social.youtube = req.body.youtube;
    if (req.body.twitter) profileFields.social.twitter = req.body.twitter;
    if (req.body.linkedin) profileFields.social.linkedin = req.body.linkedin;
    if (req.body.facebook) profileFields.social.facebook = req.body.facebook;
    if (req.body.instagaram)
      profileFields.social.instagaram = req.body.instagaram;

    Profile.findOne({ user: req.user.id }).then(profile => {
      if (profile) {
        // update

        Profile.findByIdAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        ).then(profile => res.json(profile));
      } else {
        //creat
        //Check IF handle Exits

        profile.findOne({ handle: profileFields.handle }).then(profile => {
          if (profile) {
            errors.handle = "that handle is alredy exists";
            res.status(400).json(errors);
          }
          //Save Profile

          new profile(profileFields).save().then(profile => res.json(profile));
        });
      }
    });
  }
);
module.exports = router;
