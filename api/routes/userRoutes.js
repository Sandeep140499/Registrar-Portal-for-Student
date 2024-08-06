// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');


// Create a new user entry
router.post('/create', userController.createUser);

// Get a list of user entries with search, pagination, and sorting
router.get('/', userController.listUser);

// Get a single user by ID entries with search, pagination, and sorting
router.get('/:id', userController.getUserById);

// Update a user entry by ID
router.put('/:id', userController.updateUser);

// Delete a user entry by ID
router.delete('/:id', userController.deleteUser);

router.put('/change-password/:id', userController.changePassword);
router.post('/change-password', userController.changePassword);
router.post('/forget-password', userController.forgetPassword);




// Find a user entry by slug
// router.get('/:slug', userController.getUserBySlug);

module.exports = router;
