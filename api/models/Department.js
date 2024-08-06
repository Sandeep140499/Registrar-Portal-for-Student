// models/Designation.js

const mongoose = require("mongoose");
// const slugify = require("slugify"); 

const DepartmentSchema = new mongoose.Schema({
    ID: { type: String, required: true },  
    name: { type: String, required: true },
  status: { type: String, required: true },
  created_on: { type: Date, default: Date.now },
//   paramName: {type: Object},
//   slug: { type: String },
  created_by: { type: String, default: null },
  updated_on: { type: Date, default: null },
  updated_by: { type: String, default: null },
});
// RoleSchema.pre("save", function (next) {
//   // Generate the slug only if the name is present and the slug is not manually set
//   if (this.name && !this.slug) {
//     this.slug = slugify(this.name, { lower: true });
//   }
//   next();
// });
const Department = mongoose.model("Department", DepartmentSchema);

module.exports = Department;
