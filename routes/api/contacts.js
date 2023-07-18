const express = require("express");
const router = express.Router();
const ctrl = require("../../controllers/contacts");
const {
  isValidId,
  validateBody,
  authentificate,
} = require("../../middlewares");
const { schemas } = require("../../models/contact");

router.get("/", authentificate, ctrl.getContacts);

router.get("/:contactId", authentificate, isValidId, ctrl.getContactById);

router.post(
  "/",
  authentificate,
  validateBody(schemas.addSchema),
  ctrl.addContact
);

router.delete("/:contactId", authentificate, isValidId, ctrl.removeContact);

router.put(
  "/:contactId",
  authentificate,
  validateBody(schemas.addSchema),
  isValidId,
  ctrl.updateContact
);

router.patch(
  "/:contactId/favorite",
  authentificate,
  validateBody(schemas.updateFavoriteSchema),
  isValidId,
  ctrl.updateFavorite
);

module.exports = router;
