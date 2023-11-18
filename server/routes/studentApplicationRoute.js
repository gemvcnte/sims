const express = require('express');
const router = express.Router();
const studentApplicationController = require('../controller/studentApplicationController');
    
router.post('/apply', studentApplicationController.applyStudent)

module.exports = router;