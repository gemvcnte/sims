const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/verifyToken")
const studentApplicationController = require("../controller/studentApplicationController");

// apply for admission
router.post("/", studentApplicationController.applyStudent);

module.exports = router;
