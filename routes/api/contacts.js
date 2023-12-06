const express = require("express");

const control = require("../../controllers/contacts");

const { validateContactBody } = require("../../middlewares");

const schemas = require("../../schemas/contacts");

const router = express.Router();

router.get("/", control.getAll);

router.get("/:contactId", control.getById);

router.post("/", validateContactBody(schemas.schemaContact), control.add);

router.delete("/:contactId", control.deleteContact);

router.put(
  "/:contactId",
  validateContactBody(schemas.schemaContact),
  control.update
);

module.exports = router;
