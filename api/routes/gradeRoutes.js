// routes/industry.js

const express = require('express');
const router = express.Router();
const gradeController = require('../controllers/gradeController');

// CRUD routes
router.post('/create', gradeController.createGrade);
router.get('/', gradeController.getGrade);
router.get('/:id', gradeController.getGradeById);
router.put('/:id', gradeController.updateGrade);
router.delete('/:id', gradeController.deleteGrade);

module.exports = router;