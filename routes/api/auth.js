const express = require("express");
const { schemas } = require("../../models/user");
const ctrl = require("../../controllers/contacts");

const router = express.Router();

router.post("/register");

module.exports = router;
