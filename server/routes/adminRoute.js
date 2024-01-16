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
router.get("/get-admins", verifyToken, adminController.getAllAdmins);

// Teacher routes for admin...
router.post("/create-teacher", verifyToken, adminController.createTeacher); // /createTeacher
router.patch("/update-teacher", verifyToken, adminController.updateTeacher); // /updateTeacher
router.get("/get-all-teachers", verifyToken, adminController.getAllTeachers); // /getAllTeachers
router.get("/get-teachers", verifyToken, adminController.getAllTeachersAccount); 
router.delete("/delete-teacher", verifyToken, adminController.deleteTeacher); // /deleteTeacher

// reference only ⬇
// router.get('/dashboard', adminController.getAdminDashboard);

// Student routes for admin
router.get("/get-all-students", verifyToken, adminController.getAllStudents); // /getAllStudents
router.get("/get-pending", verifyToken, adminController.getAllPending); // /pending
router.get("/get-approved", verifyToken, adminController.getAllApproved); // /approved
router.get("/get-rejected", verifyToken, adminController.getAllRejected); // /rejected
router.get(
  "/get-specific-student",
  verifyToken,
  adminController.getSpecificStudent
); // /getID/:id

// StudentApplication routes for admin
router.post(
  "/enroll-student",
  verifyToken,
  adminController.acceptStudentApplication
);
router.patch(
  "/update-application",
  verifyToken,
  adminController.updateStudentApplication
);
router.patch(
  "/reject-application",
  verifyToken,
  adminController.rejectStudentApplication
);

router.get(
  "/get-announcements",
  verifyToken,
  adminController.getAnnouncements);

router.post(
  "/announcement/create-class-announcement",
  verifyToken,
  adminController.createClassAnnouncement);

router.post(
  "/announcement/create-school-announcement",
  // verifyToken,
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

// faculty announcement
// router.post("/announcement/create-faculty-announcement")
// router.patch("/announcement/update-faculty-announcement")
// router.delete("/announcement/delete-faculty-announcement")

module.exports = router;
