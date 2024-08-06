const mongoose = require('mongoose');


const fileUploadSchema = new mongoose.Schema({
  file_Name: {type: String,required: true},
  org_Name: {type: String,required: true},
  extension: {type: String,required: true},
  file_Type: {type: String,required: true},
  file_Path: { type: String, required: true},
  status: { type: String, required: true },
  created_on: { type: Date, default: Date.now },
  created_by: { type: String, default: null },
  updated_on: { type: Date, default: null },
  updated_by: { type: String, default: null },
 
});


const FileUpload = mongoose.model('FileUpload', fileUploadSchema);

module.exports = FileUpload;
