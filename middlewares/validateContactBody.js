const { HttpError } = require("../helpers");

const validateContactBody = (schema) => {
  const func = (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      next(
        HttpError(400, `missing required ${error.details[0].path[0]} field`)
      );
    }
    next();
  };

  return func;
};

module.exports = validateContactBody;
