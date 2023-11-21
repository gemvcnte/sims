const express = require('express')
const router = express.Router()
const expressjwt = require('express-jwt')
const teacherController = require('../controller/teacherController')
const dotenv = require('dotenv')
dotenv.config


// router.post('/login', expressjwt({secret: process.env.JWT_SECRET}), teacherController.teacherLogin)
router.post('/login', teacherController.teacherLogin)
router.get('/dashboard', teacherController.getTeacherDashboard)


module.exports = router