// routes/emailRoutes.js
const express = require('express');
const emailController = require('../controllers/emailController');

const router = express.Router();

router.post('/send', emailController.sendEmail);
router.get('/:emailId', emailController.checkStatus);

module.exports = router;
