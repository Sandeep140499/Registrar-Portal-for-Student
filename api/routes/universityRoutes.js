// routes/index.js

const express = require('express');
const router = express.Router();
const universityController = require('../controllers/universityController');

// CRUD routes
router.post('/', universityController.createUniversity);
router.get('/', universityController.getUniversity);
router.get('/:id', universityController.getUniversityById);
router.put('/:id', universityController.updateUniversity);
router.delete('/:id', universityController.deleteUniversity);

module.exports = router;
