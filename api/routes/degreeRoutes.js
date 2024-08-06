// routes/index.js

const express = require('express');
const router = express.Router();
const degreeController = require('../controllers/degreeController');

// CRUD routes
router.post('/', degreeController.createDegree);
router.get('/', degreeController.getDegree);
router.get('/:id', degreeController.getDegreeById);
router.put('/:id', degreeController.updateDegree);
router.delete('/:id', degreeController.deleteDegree);

module.exports = router;
