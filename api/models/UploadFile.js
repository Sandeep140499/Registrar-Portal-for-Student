// models/UploadFile.js

const mongoose = require('mongoose');

const UploadFileSchema = new mongoose.Schema({
  file_name: { type: String },
  original_name: { type: String },
  file_type: { type: String },
  file_extension: { type: String },
  file_path: { type: String },
  status: { type: String, required: false },
  created_on: { type: Date, default: Date.now },
  created_by: { type: String, default: null },
  updated_on: { type: Date, default: null },
  updated_by: { type: String, default: null },
});

const UploadFile = mongoose.model('UploadFile', UploadFileSchema);

module.exports = UploadFile;
