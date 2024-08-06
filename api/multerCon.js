// multerCon.js
const multer = require('multer');

const storage = multer.diskStorage({
  destination:function (req, file, cb) {
    // Specify the destination folder for uploaded files
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    // Specify how the file should be named
    cb(null, file.fieldname + '-' + Date.now());
  },
});

const defaultMaxFiles = 10;

const upload = multer({
  storage: storage,
  limits: { files: defaultMaxFiles }, // Set default maximum number of files
});

// const upload = multer({ storage: storage });

module.exports = upload;



