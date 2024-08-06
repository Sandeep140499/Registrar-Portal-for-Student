// routes/index.js

const express = require('express');
const router = express.Router();
const collegeController = require('../controllers/collegeController');

// CRUD routes
router.post('/', collegeController.createCollege);
router.get('/', collegeController.getCollege);
router.get('/:id', collegeController.getCollegeById);
router.put('/:id', collegeController.updateCollege);
router.delete('/:id', collegeController.deleteCollege);

module.exports = router;
