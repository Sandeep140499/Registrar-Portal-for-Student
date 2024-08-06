// router.js
const express = require('express');
// const multer = require('multer');
const fileUploadController = require('../controllers/fileUploadController');

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post('/upload', upload.single('file'), fileUploadController.uploadFile);
router.get('/files', fileUploadController.getAllFiles);
router.get('/getfile/:fileId', fileUploadController.getfile);

module.exports = router;




 

   
 
    

