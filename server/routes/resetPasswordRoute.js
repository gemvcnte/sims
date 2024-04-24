const express = require("express");
const router = express.Router();
const resetPasswordController = require("../controller/resetPasswordController");

router.post("/generate", resetPasswordController.resetUserPassword);

router.post("/verify", resetPasswordController.resetStudentPasswordFinal);

module.exports = router;
