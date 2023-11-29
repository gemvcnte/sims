const express = require('express')
const router = express.Router()
const teacherController = require('../controller/teacherController')
const dotenv = require('dotenv')
dotenv.config


// router.post('/login', expressjwt({secret: process.env.JWT_SECRET}), teacherController.teacherLogin)
router.post('/login', teacherController.teacherLogin)
router.post('/announcement/classPost',teacherController.postClassAnnouncement)

module.exports = router