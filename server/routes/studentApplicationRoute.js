const express = require('express');
const router = express.Router();
const studentApplicationController = require('../controller/studentApplicationController');

router.route('/')
    .post(studentApplicationController.applyStudent)

module.exports = router;