// routes/industry.js

const express = require('express');
const router = express.Router();
const typeController = require('../controllers/typeController');

// CRUD routes
router.post('/create', typeController.createType);
router.get('/', typeController.getType);
router.get('/:id', typeController.getTypeById);
router.put('/:id', typeController.updateType);
router.delete('/:id', typeController.deleteType);

module.exports = router;