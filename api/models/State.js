const mongoose = require("mongoose");

const stateSchema = new mongoose.Schema(
  {
    code: { type: String },
    name: { type: String },
    iso_code: { type: String },
    countryId: { type: mongoose.Schema.Types.ObjectId, ref: "Country" },
    isActive: { type: Boolean, default: true },
    status: { type: String, required: false, default: "Active" },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const StateModal = mongoose.model("State", stateSchema);
module.exports = StateModal;
