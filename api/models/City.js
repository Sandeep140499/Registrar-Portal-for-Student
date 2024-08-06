const mongoose = require("mongoose");

const citySchema = new mongoose.Schema(
  {
    name: { type: String },
    stateId: { type: mongoose.Schema.Types.ObjectId, ref: "State" },
    countryId: { type: mongoose.Schema.Types.ObjectId, ref: "Country" },
    stateCode: { type: String },
    pinCode: { type: String },
    isActive: { type: Boolean, default: true },
    status: { type: String, required: false, default: "Active" },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const CityModal = mongoose.model("city", citySchema);
module.exports = CityModal;
