const express = require("express");
const router = express.Router();
// const expressjwt = require('express-jwt');
const adminController = require("../controller/adminController");
const dotenv = require('dotenv');
dotenv.config();

// Admin routes for admin...
router.post("/create", adminController.createAdmin);
// router.post("/login", expressjwt({ secret: process.env.JWT_SECRET }), adminController.adminLogin);
router.post("/login", adminController.adminLogin);
router.patch("/updateAdmin", adminController.updateAdmin);
router.delete("/deleteAdmin", adminController.deleteAdmin);

// Teacher routes for admin...
router.post("/createTeacher", adminController.createTeacher);
router.patch("/updateTeacher", adminController.updateTeacher);
router.get("/getAllTeachers", adminController.getAllTeachers);
router.delete("/deleteTeacher", adminController.deleteTeacher);

// router.get('/dashboard', expressjwt({ secret: process.env.JWT_SECRET }), adminController.getAdminDashboard);
router.get('/dashboard', adminController.getAdminDashboard);
router.get("/getAllStudents", adminController.getAllStudents);
router.get("/getPending", adminController.getAllPending);

router.post("/enrollStudent", adminController.acceptStudentApplication);
router.patch("/updateApplication", adminController.updateStudentApplication);
router.patch("/rejectApplication", adminController.rejectStudentApplication);

router.post("/createAnnouncement", adminController.createAnnouncement);

module.exports = router;
