// models/Industry.js
const mongoose = require("mongoose");

const typeSchema = new mongoose.Schema(
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

const Type = mongoose.model("Type", typeSchema);

module.exports = Type;
