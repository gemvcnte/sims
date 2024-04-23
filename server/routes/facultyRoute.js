const express = require("express");
const router = express.Router();
const facultyController = require("../controller/facultyController");

router.post("/login", facultyController.facultyLogin);

module.exports = router;
