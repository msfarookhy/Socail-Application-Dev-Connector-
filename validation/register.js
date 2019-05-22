const validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateRegisterInput(data) {
  let errors = {};

  if (!validator.isLength(data.name, { min: 2, max: 32 })) {
    errors.name = "Name Must Be  Between 2 and 30 Charachtera ";
  }

  return {
    errors,
    isvalid: isEmpty(errors)
  };
};
