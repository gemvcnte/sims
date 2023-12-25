const express = require("express");
const router = express.Router();
const teacherController = require("../controller/teacherController");
const dotenv = require("dotenv");
const verifyToken = require("../middleware/verifyToken");
const { verify } = require("jsonwebtoken");
dotenv.config;

// router.post('/login', expressjwt({secret: process.env.JWT_SECRET}), teacherController.teacherLogin)
router.post("/login", teacherController.teacherLogin);
router.get("/profile", verifyToken, teacherController.getTeacherProfile);
router.post(
  "/announcement/create-class-announcement",
  verifyToken,
  teacherController.postClassAnnouncement
);
router.patch(
  "/announcement/update-class-announcement",
  verifyToken,
  teacherController.updateClassAnnouncement
);

router.delete(
  "/announcement/delete-class-announcement",
  verifyToken,
  teacherController.deleteClassAnnouncement
);
router.patch(
  "/profile/update",
  verifyToken,
  teacherController.updateTeacherProfile
);

// router.patch(
//   "/class/assign-student",
//   // verifyToken,
//   teacherController.assignStudentToClass
// ); // /class/assignStudent

// router.patch(
//   "/class/update-assigned-student",
//   verifyToken,
//   teacherController.updateAssignedStudentToClass
// );

// router.delete(
//   "/class/remove-student",
//   verifyToken,
//   teacherController.removeStudentToClass
// );

router.get(
  "/class/getAssignedClasses",
  verifyToken,
  teacherController.getAssignedClasses
);

router.get("/getStudents", verifyToken, teacherController.getEnrolledStudents);

router.get(
  "/class/get-specific-class/:id",
  verifyToken,
  teacherController.getSpecificClass
);

router.get("/get-all-teachers", verifyToken, teacherController.getAllTeachers);

router.patch(
  "/update-students-in-class",
  verifyToken,
  teacherController.updateStudentsInClass
);

router.get("/class/get-specific-student/:id", verifyToken, teacherController.getSpecificStudent);
module.exports = router;
