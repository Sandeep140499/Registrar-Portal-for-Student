// routes/index.js

const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/employeeController');

// CRUD routes
router.post('/', employeeController.createEmployee);
router.get('/', employeeController.getEmployee);
router.get('/:id', employeeController.getEmployeeById);
router.put('/:id', employeeController.updateEmployee);
router.delete('/:id', employeeController.deleteEmployee);

module.exports = router;