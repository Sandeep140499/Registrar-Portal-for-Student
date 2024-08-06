// models/UploadFile.js

const mongoose = require("mongoose");

const UserLoginInfoSchema = new mongoose.Schema(
  {
    user_ip: { type: String },
    browser_data: {
      type: Object,
    },
    user_id: { type: mongoose.Types.ObjectId, ref: "User" },

    status: { type: String, required: false },
    created_on: { type: Date, default: Date.now },
    created_by: { type: mongoose.Types.ObjectId, ref: "User" },
    updated_on: { type: Date, default: null },
    updated_by: { type: mongoose.Types.ObjectId, ref: "User" },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const UserLoginInfoModal = mongoose.model(
  "User_Login_Info",
  UserLoginInfoSchema
);

module.exports = UserLoginInfoModal;
