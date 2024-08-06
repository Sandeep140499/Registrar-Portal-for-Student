// models/Grade.js
const mongoose = require("mongoose");
const slugify = require("slugify");


const gradeSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    created_on: { type: Date, default: Date.now },
    created_by: { type: String },
    updated_by: { type: String },
    status: { type: String, default: "sent" },
    timestamp: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toOnject: { virtuals: true },
  }
);

gradeSchema.pre("save", function (next) {
    // Generate the slug only if the name is present and the slug is not manually set
    if (this.name && !this.slug) {
      this.slug = slugify(this.name, { lower: true });
    }
    next();
  });

const Grade = mongoose.model("Grade", gradeSchema);

module.exports = Grade;
