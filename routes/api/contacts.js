const express = require("express");
const router = express.Router();
const ctrl = require("../../controllers/contacts");
const { isValidId, validateBody } = require("../../middlewares");
const { schemas } = require("../../models/contact");

router.get("/", ctrl.getContacts);

router.get("/:contactId", isValidId, ctrl.getContactById);

router.post("/", validateBody(schemas.addSchema), ctrl.addContact);

router.delete("/:contactId", isValidId, ctrl.removeContact);

router.put(
  "/:contactId",
  validateBody(schemas.addSchema),
  isValidId,
  ctrl.updateContact
);

router.patch(
  "/:contactId/favorite",
  validateBody(schemas.updateFavoriteSchema),
  isValidId,
  ctrl.updateFavorite
);

module.exports = router;
