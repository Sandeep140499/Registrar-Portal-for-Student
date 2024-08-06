// routes/index.js

const express = require('express');
const router = express.Router();
const designationController = require('../controllers/designationController');

// CRUD routes
router.post('/', designationController.createDesignation);
router.get('/', designationController.getDesignation);
router.get('/:id', designationController.getDesignationById);
router.put('/:id', designationController.updateDesignation);
router.delete('/:id', designationController.deleteDesignation);

module.exports = router;
