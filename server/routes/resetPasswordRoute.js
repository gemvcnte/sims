const express = require("express");
const router = express.Router();
const resetPasswordController = require("../controller/resetPasswordController");

router.post("/student/generate", resetPasswordController.resetStudentPassword);

router.post(
  "/student/verify",
  resetPasswordController.resetStudentPasswordFinal
);

module.exports = router;
