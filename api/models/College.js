// models/Designation.js

const mongoose = require("mongoose");
// const slugify = require("slugify"); 

const CollegeSchema = new mongoose.Schema({
    // ID: { type: String, required: true },  
    university: { type: String, required: true }, 
    name: { type: String, required: true },
    // short_name: { type: String, required: true },
    country: { type: String, required: true },
    state: { type: String, required: true },
    city: { type: String, required: true },
    locality: { type: String, required: true },
    landmark: { type: String, required: true },
    street: { type: String, required: true },
    pincode: { type: String, required: true },
    type: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    fax_no: { type: String, required: true },
    website: { type: String, required: true },
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
const College = mongoose.model("College", CollegeSchema); 

module.exports = College;
