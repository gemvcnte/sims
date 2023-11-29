const express = require("express");
const router = express.Router();
const adminController = require("../controller/adminController");
const dotenv = require('dotenv');
dotenv.config();

// Admin routes for admin...
router.post("/create", adminController.createAdmin);
router.post("/login", adminController.adminLogin);
router.patch("/updateAdmin", adminController.updateAdmin);
router.delete("/deleteAdmin", adminController.deleteAdmin);

// Teacher routes for admin...
router.post("/createTeacher", adminController.createTeacher);
router.patch("/updateTeacher", adminController.updateTeacher);
router.get("/getAllTeachers", adminController.getAllTeachers);
router.delete("/deleteTeacher", adminController.deleteTeacher);

// reference only ⬇
// router.get('/dashboard', adminController.getAdminDashboard);

// Student routes for admin
router.get("/getAllStudents", adminController.getAllStudents);
router.get("/getPending", adminController.getAllPending);
router.get("/getSpecificStudent", adminController.getSpecificStudent);


// StudentApplication routes for admin
router.post("/enrollStudent", adminController.acceptStudentApplication);
router.patch("/updateApplication", adminController.updateStudentApplication);
router.patch("/rejectApplication", adminController.rejectStudentApplication);

router.post("/createAnnouncement", adminController.createSchoolAnnouncement);
router.patch("/updateAnnouncement", adminController.updateSchoolAnnouncement);
router.delete("/deleteAnnouncement", adminController.deleteSchoolAnnouncement);

module.exports = router;
