const express = require("express");
const router = express.Router();
const UniversalController = require("../controller/UniversalController");

router.post("/", UniversalController.login);

module.exports = router;
