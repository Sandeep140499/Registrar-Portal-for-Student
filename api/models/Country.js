// models/VidhanSabhaModal.js

const mongoose = require("mongoose");

const countrySchema = new mongoose.Schema(
  {
    name: String,
    country_code: String,
    code: String,
    iso_code: String,
    status: { type: String, required: false, default: "Active" },
    created_on: { type: Date, default: Date.now },
    // created_by: { type: mongoose.Types.ObjectId, ref: "User" },
    updated_on: { type: Date, default: null },
    // updated_by: { type: mongoose.Types.ObjectId, ref: "User" },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const CountryModal = mongoose.model("Country", countrySchema);
module.exports = CountryModal;
