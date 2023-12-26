const express = require("express");

const control = require("../../controllers/contacts");

const {
  validateContactBody,
  isValidId,
  validateBodyFavoriteCOntact,
  authenticate,
} = require("../../middlewares");

const { schemas } = require("../../models/contact");

const router = express.Router();

router.get("/", authenticate, control.getAll);

router.get("/:contactId", authenticate, isValidId, control.getById);

router.post(
  "/",
  authenticate,
  validateContactBody(schemas.schemaContact),
  control.add
);

router.delete("/:contactId", authenticate, isValidId, control.deleteContact);

router.put(
  "/:contactId",
  authenticate,
  isValidId,
  validateContactBody(schemas.schemaContact),
  control.update
);

router.patch(
  "/:contactId/favorite",
  authenticate,
  isValidId,
  validateBodyFavoriteCOntact(schemas.schemaContactFavorite),
  control.updateStatusContact
);

module.exports = router;
