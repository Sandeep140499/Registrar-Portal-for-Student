const mongoose = require("mongoose");
const { default: slugify } = require("slugify");

const registrationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      // required: true,
    },
    gender: {
      type: String,
      // required: true,
    },
    dateOfBirth: {
      type: String,
      // required: true,
    },
    email: {
      type: String,
      // required: true,
    },
    user_id: { type: mongoose.Types.ObjectId, ref: "User" },
    mobile: {
      type: String,
    },
    whatsapp: {
      type: String,
    },
    aadharNumber: {
      type: String,
      // required: true,
    },
    address1: {
      type: String,
    },
    address2: {
      type: String,
    },
    city: {
      type: String,
      // required: true,
    },
    state: {
      type: String,
      // required: true,
    },
    country: {
      type: String,
      // required: true,
    },
    pinCode: {
      type: String,
    },
    photo: {
      data: Buffer,
      contentType: String,
      type: Object,
    },
    governmentId: {
      type: String,
      //   required: true,
    },
    governmentIdProof: {
      data: Buffer,
      contentType: String,
      type: Object,
      //   required: true,
    },
    age: {
      type: String,
    },
    instituteName: {
      type: String,
    },
    slug: String,
    is_cancel: {
      type: Boolean,
      default: false,
    },
    status: String,
    remark: {
      type: String,
    },
    cancel_reason: {
      type: String,
    },

    district: {
      type: String,
    },
    booth_number: {
      type: String,
    },

    house_number: {
      type: String,
      // required: true,
    },
    street: {
      type: String,
      // required: true,
    },
    locality: {
      type: String,
      // required: true,
    },
    landmark: {
      type: String,
    },

    vehicle_id: {
      type: mongoose.Types.ObjectId,
      ref: "Vehicle",
    },
    booking_date: {
      type: Date,
      default: Date.now,
    },

    created_by: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    bookingStatus: {
      type: String,
      enum: ["Active", "Cancelled", "Waiting", "Confirmed", "Blocked"],
      default: "Active",
    },
    bookingId: {
      type: String,
      unique: true,
    },
    created_on: {
      type: Date,
      default: Date.now,
    },
    updated_by: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    updated_on: {
      type: String,
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },
    timestamps: true,
  }
);

const RegistrationModel = mongoose.model("Registration", registrationSchema);

module.exports = RegistrationModel;
