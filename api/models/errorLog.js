// models/Email.js
const mongoose = require("mongoose");

const errorSchema = new mongoose.Schema({
  statusCode: { type: String, required: false },
  message: { type: String, required: false },
  error: { type: String, required: false },
  
  created_by: { type: String },
  updated_by: { type: String },
  status: { type: String, required:false },
  timestamp: { type: Date, default: Date.now },
});

const ErrorModel = mongoose.model("ErrorLog", errorSchema);

module.exports = ErrorModel;
