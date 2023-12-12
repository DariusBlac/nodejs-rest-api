const { HttpError } = require("../helpers");

const validateBodyFavoriteCOntact = (schema) => {
  const func = (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      next(HttpError(400, `missing field ${error.details[0].path[0]}`));
    }
    next();
  };

  return func;
};

module.exports = validateBodyFavoriteCOntact;
