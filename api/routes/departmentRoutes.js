// routes/index.js

const express = require('express');
const router = express.Router();
const departmentController = require('../controllers/departmentController');

// CRUD routes
router.post('/', departmentController.createDepartment);
router.get('/', departmentController.getDepartment);
router.get('/:id', departmentController.getDepartmentById);
router.put('/:id', departmentController.updateDepartment);
router.delete('/:id', departmentController.deleteDepartment);

module.exports = router;

  