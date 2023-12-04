const express = require("express");
const router = express.Router();
const studentController = require("../controller/studentController");
const verifyToken = require("../middleware/verifyToken");
const dotenv = require("dotenv");
dotenv.config();

// router.post('/login', expressjwt({secret: process.env.JWT_SECRET}), studentController.studentLogin)
router.post("/login", studentController.studentLogin);
router.get("/profile", verifyToken, studentController.getStudentProfile);
router.patch(
  "/profile/update",
  verifyToken,
  studentController.updateStudentProfile
);
// router.get('/scheduling', studentController.getSchedule)
// router.get('/school-announcements', studentController.getAnnouncements)
// router.get('/profile', studentController.updateProfile)

module.exports = router;
