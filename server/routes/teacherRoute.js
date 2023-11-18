const express = require('express')
const router = express.Router()
const teacherController = require('../controller/teacherController')


router.post('/login', teacherController.teacherLogin)


module.exports = router