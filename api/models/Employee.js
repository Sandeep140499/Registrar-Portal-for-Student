// models/Designation.js

const mongoose = require("mongoose");
const slugify = require("slugify");

const EmployeeSchema = new mongoose.Schema({
  employee_id: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  mobile: { type: String, required: true },
  official_email: { type: String, required: true },
  address: { type: String, required: true },
  permanent_address: { type: String, required: true },
  marital_status: { type: String, required: true },
  // nationality: { type: String, required: true },
  gender: { type: String, required: true },
  dob: { type: String, required: true },
  ctc: { type: String, required: true },
  work_experience: { type: String, required: true },
  // dob: { type: String, required: true },
  certification: { type: String, required: true },
  status: { type: String, required: true },
  created_on: { type: Date, default: Date.now },
  //   paramName: {type: Object},
    slug: { type: String },
  created_by: { type: String, default: null },
  updated_on: { type: Date, default: null },
  updated_by: { type: String, default: null },
});
EmployeeSchema.pre("save", function (next) {
  // Generate the slug only if the name is present and the slug is not manually set
  if (this.name && !this.slug) {
    this.slug = slugify(this.name, { lower: true });
  }
  next();
});
const Employee = mongoose.model("Employee", EmployeeSchema);

module.exports = Employee;
