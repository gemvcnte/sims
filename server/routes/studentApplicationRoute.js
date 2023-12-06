const express = require("express");
const router = express.Router();
const studentApplicationController = require("../controller/studentApplicationController");

// apply for admission
router.post("/", verifyToken, studentApplicationController.applyStudent);

module.exports = router;
