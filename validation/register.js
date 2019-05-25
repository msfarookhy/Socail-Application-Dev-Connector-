const validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateRegisterInput(data) {
  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.password2 = !isEmpty(data.password2) ? data.password2 : "";

  if (!validator.isLength(data.name, { min: 2, max: 32 })) {
    errors.name = "Name Must Be  Between 2 and 32 Characters";
  }

  if (validator.isEmpty(data.name)) {
    errors.name = "Name Field Is Required";
  }

  if (validator.isEmpty(data.email)) {
    errors.email = "Email Field Is Required";
  }

  if (!validator.isEmail(data.email)) {
    errors.email = "Email Is Invalid";
  }

  if (validator.isEmpty(data.password)) {
    errors.password = "Password Field Is Required";
  }

  if (!validator.isLength(data.password, { min: 6, max: 8 })) {
    errors.password = "Password Must Be At Least In 6 Character";
  }

  if (validator.isEmpty(data.password2)) {
    errors.password2 = " Confirm Password Field Is Required";
  }

  if (!validator.equals(data.password, data.password2)) {
    errors.password2 = "Passwords Shuld Be Match";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
