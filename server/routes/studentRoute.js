const express = require('express');
const expressjwt = require('express-jwt')
const router = express.Router();
const studentController = require('../controller/studentController');
const dotenv = require('dotenv');
dotenv.config()

// router.post('/login', expressjwt({secret: process.env.JWT_SECRET}), studentController.studentLogin)
router.post('/login', studentController.studentLogin)
router.get('/dashboard', studentController.getStudentDashboard)
router.get('/profile', studentController.getStudentProfile)
router.patch('/profile/update', studentController.updateStudentProfile) // (eto lang MUNA)
// router.get('/scheduling', studentController.getSchedule)
// router.get('/school-announcements', studentController.getAnnouncements)
// router.get('/profile', studentController.updateProfile)


module.exports = router
