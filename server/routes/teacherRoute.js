const express = require("express");
const router = express.Router();
const teacherController = require("../controller/teacherController");
const dotenv = require("dotenv");
const verifyToken = require("../middleware/verifyToken");
dotenv.config;

// router.post('/login', expressjwt({secret: process.env.JWT_SECRET}), teacherController.teacherLogin)
router.post("/login", teacherController.teacherLogin);
router.get("/profile", verifyToken, teacherController.getTeacherProfile);
router.post(
  "/announcement/classPost",
  verifyToken,
  teacherController.postClassAnnouncement
);
router.patch(
  "/profile/update",
  verifyToken,
  teacherController.updateTeacherProfile
);
router.patch(
  "/class/assignStudent",
  verifyToken,
  teacherController.assignStudentToClass
);
router.delete(
  "/class/remove-student",
  verifyToken,
  teacherController.removeStudentToClass
);

module.exports = router;