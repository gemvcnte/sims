const express = require("express");
const router = express.Router();
const resetPasswordController = require("../controller/resetPasswordController");

router.post("/", resetPasswordController.resetPassword);

module.exports = router;
