const express = require("express");
const router = express.Router();
const resetPasswordController = require("../controller/resetPasswordController");

router.post("/", resetPasswordController.resetPassword);

router.post("/final", resetPasswordController.resetPasswordFinal);

module.exports = router;
