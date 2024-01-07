const express = require("express");

const router = express.Router();

const control = require("../../controllers/users");

const { validateBody, authenticate, upload } = require("../../middlewares");

const { authSchema, verifyEmailSchema } = require("../../models/user");

router.post("/register", validateBody(authSchema), control.register);

router.post(
  "/verify",
  validateBody(verifyEmailSchema),
  control.resendVerifyEmail
);

router.get("/verify/:verificationToken", control.verifyEmail);

router.post("/login", validateBody(authSchema), control.login);

router.post("/logout", authenticate, control.logout);

router.post("/current", authenticate, control.current);

router.patch(
  "/avatars",
  authenticate,
  upload.single("avatar"),
  control.updateAvatar
);

module.exports = router;
