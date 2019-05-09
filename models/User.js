const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Creating User Schema
const UserSchema = new Schema({
  name: {
    type: String,
    require: true
  },

  email: {
    type: String,
    require: true
  },

  password: {
    type: String,
    require: true
  },

  avtar: {
    type: String,
    require: true
  },
  date: {
    type: Date,
    require: Date.now
  }
});
