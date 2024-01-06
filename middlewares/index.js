const validateContactBody = require("./validateContactBody");
const isValidId = require("./validateMongooseId");
const validateBodyFavoriteCOntact = require("./validateBodyFavoriteContact");
const validateBody = require("./validateBody");
const authenticate = require("./authenticate");
const upload = require("./upload");

module.exports = {
  validateContactBody,
  isValidId,
  validateBodyFavoriteCOntact,
  validateBody,
  authenticate,
  upload,
};
