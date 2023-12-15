const express = require("express");
const router = express.Router();
const adminController = require("../controller/adminController");
const dotenv = require("dotenv");
const verifyToken = require("../middleware/verifyToken");
dotenv.config();

// Admin routes for admin...
router.post("/login", adminController.adminLogin);
router.post("/create", verifyToken, adminController.createAdmin);
router.patch("/updateAdmin", verifyToken, adminController.updateAdmin);
router.delete("/deleteAdmin", verifyToken, adminController.deleteAdmin);

// Teacher routes for admin...
router.post("/createTeacher", verifyToken, adminController.createTeacher);
router.patch("/updateTeacher", verifyToken, adminController.updateTeacher);
router.get("/getAllTeachers", verifyToken, adminController.getAllTeachers);
router.delete("/deleteTeacher", verifyToken, adminController.deleteTeacher);

// reference only ⬇
// router.get('/dashboard', adminController.getAdminDashboard);

// Student routes for admin
router.get("/getAllStudents", verifyToken, adminController.getAllStudents);
router.get("/getPending", verifyToken, adminController.getAllPending); // /pending
router.get("/getApproved", verifyToken, adminController.getAllApproved); // /approved
router.get("/getRejected", verifyToken, adminController.getAllRejected); // /rejected
router.get(
  "/getSpecificStudent",
  verifyToken,
  adminController.getSpecificStudent
); // /getID/:id

// StudentApplication routes for admin
router.post(
  "/enrollStudent",
  verifyToken,
  adminController.acceptStudentApplication
);
router.patch(
  "/updateApplication",
  verifyToken,
  adminController.updateStudentApplication
);
router.patch(
  "/rejectApplication",
  verifyToken,
  adminController.rejectStudentApplication
);

router.post(
  "/announcement/create-school-announcement",
  verifyToken,
  adminController.createSchoolAnnouncement
);// or /announcement/createSchoolAnnouncement
router.patch("/announcement/update-school-announcement", adminController.updateSchoolAnnouncement);

// or /announcement/updateSchoolAnnouncement
router.delete(
  "/announcement/delete-school-announcement",
  verifyToken,
  adminController.deleteSchoolAnnouncement
); // or /announcement/deleteSchoolAnnouncement

// Admin Profile
router.get("/profile", verifyToken, adminController.getAdminProfile);
router.patch(
  "/profile/update",
  verifyToken,
  adminController.updateAdminProfile
);

// Class functions
router.post("/class/create", verifyToken, adminController.createClassroom); // /alt. /class/create-classroom
router.get("/class/getAll", verifyToken, adminController.getAllClasses);
router.get("/class/:id", verifyToken, adminController.getSpecificClass);
router.patch("/class/update", verifyToken, adminController.getSpecificClass);
router.delete("/class/delete", verifyToken, adminController.deleteClassroom);


router.post("/announcement/create-faculty-announcement")
router.patch("/announcement/update-faculty-announcement")
router.delete("/announcement/delete-faculty-announcement")

module.exports = router;
