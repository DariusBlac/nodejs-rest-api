const express = require("express");

const router = express.Router();

const control = require("../../controllers/users");

const { validateBody, authenticate } = require("../../middlewares");

const { authSchema } = require("../../models/user");

router.post("/register", validateBody(authSchema), control.register);

router.post("/login", validateBody(authSchema), control.login);

router.post("/logout", authenticate, control.logout);

router.post("/current", authenticate, control.current);

module.exports = router;
