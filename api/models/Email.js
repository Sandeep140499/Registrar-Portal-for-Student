// models/Email.js
const mongoose = require("mongoose");

const emailSchema = new mongoose.Schema(
  {
    message_id: { type: String },
    message_name: { type: String, required: true },
    message_type: { type: String, required: true },
    subject: { type: String, required: true },
    body: { type: String, required: true },
    send_to: { type: String, required: true },
    cc_to: { type: String },
    bcc_to: { type: String },
    attachments: { type: Array },
    created_on: { type: Date, default: Date.now },
    created_by: { type: String },
    updated_by: { type: String },
    sent_from: { type: String },
    sent_flag: { type: Number, default: 0 },
    sent_attempt: { type: Number, default: 0 },

    sent_by: { type: String },

    status: { type: String, default: "sent" },
    timestamp: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toOnject: { virtuals: true },
  }
);

const Email = mongoose.model("Email", emailSchema);

module.exports = Email;
