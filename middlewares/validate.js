const { validationResult } = require('express-validator');

const validate = (req, res, next) => {
  const err = validationResult(req);

  if (!err.isEmpty()) {
    return res.status(400).json({
      errors: err.array()
    });
  }

  return next();
};

module.exports = validate;
