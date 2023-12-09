const express = require("express");
const router = express.Router();
const adminController = require("../controller/adminController");
const dotenv = require("dotenv");
const verifyToken = require("../middleware/verifyToken");
dotenv.config();

// Admin routes for admin...
router.post("/create", 
  verifyToken, 
  adminController.createAdmin);
router.post("/login", verifyToken, adminController.adminLogin);
router.patch("/updateAdmin",  verifyToken, adminController.updateAdmin);
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
router.get("/getSpecificStudent", verifyToken, adminController.getSpecificStudent); // /getID/:id

// StudentApplication routes for admin
router.post("/enrollStudent", verifyToken, adminController.acceptStudentApplication);
router.patch("/updateApplication", verifyToken, adminController.updateStudentApplication);
router.patch("/rejectApplication", verifyToken, adminController.rejectStudentApplication);

router.post("/createAnnouncement", verifyToken, adminController.createSchoolAnnouncement);
router.patch("/updateAnnouncement", adminController.updateSchoolAnnouncement);
router.delete("/deleteAnnouncement", verifyToken, adminController.deleteSchoolAnnouncement);

// Admin Profile
router.get("/profile", verifyToken, adminController.getAdminProfile);
router.patch(
  "/profile/update",
  verifyToken,
  adminController.updateAdminProfile
);

// Class functions
router.post("/class/create", verifyToken, adminController.createClassroom) // /alt. /class/create-classroom
router.get("/class/getAll", verifyToken, adminController.getAllClasses)
router.get("/class/:id", verifyToken,  adminController.getSpecificClass)
router.patch("/class/update", verifyToken, adminController.getSpecificClass)
router.delete("/class/delete", verifyToken, adminController.deleteClassroom)

module.exports = router;
