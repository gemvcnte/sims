const express = require('express')
const router = express.Router()
const studentController = require('../controller/studentController')

router.post('/login',studentController.studentLogin)
// router.get('/student/dashboard', studentController.getDashboard)
// router.get('/student/scheduling', studentController.getSchedule)
// router.get('/student/school-announcements', studentController.getAnnouncements)
// router.get('/student/profile', studentController.updateProfile)


module.exports = router