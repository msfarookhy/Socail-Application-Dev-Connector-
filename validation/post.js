const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validatePostInput(data) {
  let errors = {};

  data.text = !isEmpty(data.text) ? data.text : "";

  if (!Validator.isLength(data.text, { min: 10, max: 100 })) {
    errors.text = "Post Must Be In 10 To 300 Characters";
  }
  if (Validator.isEmpty(data.text)) {
    errors.text = "Text Field Is Required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
