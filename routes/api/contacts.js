const express = require("express");

const control = require("../../controllers/contacts");

const {
  validateContactBody,
  isValidId,
  validateBodyFavoriteCOntact,
} = require("../../middlewares");

const schemas = require("../../schemas/contacts");

const router = express.Router();

router.get("/", control.getAll);

router.get("/:contactId", isValidId, control.getById);

router.post("/", validateContactBody(schemas.schemaContact), control.add);

router.delete("/:contactId", isValidId, control.deleteContact);

router.put(
  "/:contactId",
  isValidId,
  validateContactBody(schemas.schemaContact),
  control.update
);

router.patch(
  "/:contactId/favorite",
  isValidId,
  validateBodyFavoriteCOntact(schemas.schemaContactFavorite),
  control.updateStatusContact
);

module.exports = router;
