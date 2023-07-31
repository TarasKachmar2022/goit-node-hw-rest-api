const express = require("express");
const { schemas } = require("../../models/user");
const { authentificate, validateBody, upload } = require("../../middlewares");
const ctrl = require("../../controllers/auth");

const router = express.Router();

router.post("/register", validateBody(schemas.registerSchema), ctrl.register);

router.get("/verify/:verificationToken", ctrl.verifyEmail);

router.post(
  "/verify",
  validateBody(schemas.emailSchema),
  ctrl.resendVerifyEmail
);

router.post("/login", validateBody(schemas.loginSchema), ctrl.login);

router.get("/current", authentificate, ctrl.getCurrent);

router.post("/logout", authentificate, ctrl.logout);

router.patch(
  "/users",
  authentificate,
  validateBody(schemas.subscriptionSchema),
  ctrl.updateSubscription
);

router.patch(
  "/avatars",
  authentificate,
  upload.single("avatar"),
  ctrl.updateAvatar
);

module.exports = router;
