// routes/index.js

const express = require('express');
const router = express.Router();
const UploadFileController = require('../controllers/uploadFileController');

// CRUD routes
router.post('/', UploadFileController.createUploadFile);
router.get('/', UploadFileController.getUploadFiles);
router.get('/:id', UploadFileController.getUploadFileById);
router.put('/:id', UploadFileController.updateUploadFile);
router.delete('/:id', UploadFileController.deleteUploadFile);

module.exports = router;
