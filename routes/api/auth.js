const express = require("express");
const { schemas } = require("../../models/user");
const { authentificate, validateBody } = require("../../middlewares");
const ctrl = require("../../controllers/auth");

const router = express.Router();

router.post("/register", validateBody(schemas.registerSchema), ctrl.register);

router.post("/login", validateBody(schemas.loginSchema), ctrl.login);

router.get("/current", authentificate, ctrl.getCurrent);

router.post("/logout", authentificate, ctrl.logout);

router.patch(
  "/users",
  authentificate,
  validateBody(schemas.subscriptionSchema),
  ctrl.updateSubscription
);

module.exports = router;
