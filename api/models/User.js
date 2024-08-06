const mongoose = require("mongoose");
const { boolean } = require("webidl-conversions");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    agree: {
      type: Boolean,
      required: false,
    },
    email: {
      type: String,
      // match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      // unique: true,
    },

    mobile: {
      type: String,
      required: true,
      unique: true,
    },
    profile_pic: String,
    user_role: { type: mongoose.Types.ObjectId, ref: "Role" },
    status: {
      type: String,
      enum: ["active", "inactive", "Active", "Inactive"],
    },
    created_on: {
      type: Date,
      default: Date.now,
    },

    created_by: String,
    updated_by: String,
    updated_on: String,
    password: String,
    token: String,
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
    toObject: {
      virtual: true,
    },
  }
);

module.exports = mongoose.model("User", userSchema);
