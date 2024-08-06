// routes/industry.js

const express = require('express');
const router = express.Router();
const industryController = require('../controllers/industryController');

// CRUD routes
router.post('/create', industryController.createIndustry);
router.get('/', industryController.getIndustry);
router.get('/:id', industryController.getIndustryById);
router.put('/:id', industryController.updateIndustry);
router.delete('/:id', industryController.deleteIndustry);

module.exports = router;