const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs"); //bcrypt using for hashig the password
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");

//Load User Model
const User = require("../../models/User");

// @route  GET api/users/test
// @desc   Test users Route
// @acess  Public
router.get("/test", (req, res) => res.json({ msg: "Hello Misbah" }));

// @route  GET api/users/register
// @desc   regestering user
// @acess  Public

router.post("/register", (req, res) => {
  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      return res.status(400).json({ email: "Email is alredy Exists" });
    } else {
      const avatar = gravatar.url(req.body.email, {
        s: "200", //Size
        r: "pg", //Rating
        d: "mm" // Default
      });

      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        avatar,
        password: req.body.password
      });
      //fucntion for hasing the password/bbcrypting the password
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
        });
      });
    }
  });
});

// @route  GET api/users/login
// @desc   User Login / Returning Json web token
// @acess  Public
router.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  // Find User By Email
  User.findOne({ email }).then(user => {
    // chek for user
    if (!user) {
      return res.status(404).json({ email: "User Not Found" });
    }
    //chek password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        //User match
        const payload = { id: user.id, name: user.name, avatar: user.avatar }; // creat Jwt payload
        //Sign Token
        jwt.sign(
          payload,
          keys.secretOrkey,
          { expiresIn: 3600 },
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer" + token
            });
          }
        );
      } else {
        return res.status(400).json({ password: "Password Incorrect" });
      }
    });
  });
});
module.exports = router;
