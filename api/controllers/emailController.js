// controllers/emailController.js
const express = require("express");
const router = express.Router();
const Email = require("../models/Email");
const nodemailer = require("nodemailer");
const fs = require("fs");
const path = require("path");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  host: process.env.HOST,
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASS,
  },
});

class EmailController {
  static async sendEmail(req, res) {
    try {
      const {
        message_name,
        message_type,
        subject,
        body,
        send_to,
        cc_to,
        bcc_to,
        attachments,
        created_by,
      } = req.body;
      const newEmail = new Email({
        message_name,
        message_type,
        subject,
        body,
        send_to,
        cc_to,
        bcc_to,
        attachments: attachments,
        created_by: created_by,
        status: "Pending",
      });
      const savedEmail = await newEmail.save();
      console.log(savedEmail, "savedEmail");
      const attachmentPaths = attachments.map((attachment) =>
        path.join(__dirname, attachment)
      );

      const mailOptions = {
        from: process.env.EMAIL,
        to: send_to,
        cc: cc_to,
        bcc: bcc_to,
        subject: subject,
        text: body,
        attachments:
          attachmentPaths?.length > 0
            ? attachmentPaths.map((path) => ({ path }))
            : [],
      };

      const info = await transporter.sendMail(mailOptions);
      console.log(info, "infoinfo info");
      if (info?.messageId) {
        const response = await Email.findByIdAndUpdate(
          { _id: savedEmail._id },
          { status: "Sent", message_id: info?.messageId }
        );
        res.status(200).json(response);
      }
    } catch (error) {
      console.error("Error sending email:", error);

      let errorMessage = "Internal Server Error";

      if (error.code === "EAUTH") {
        errorMessage = "Authentication failed. Check your email and password.";
      } else if (error.code === "EENVELOPE") {
        errorMessage = "Invalid email envelope. Check the email addresses.";
      } else if (error.code === "EMESSAGE") {
        errorMessage = "Invalid email message. Check the message details.";
      }

      res.status(500).json({ error: errorMessage });
    }
  }

  // New endpoint for checking email status
  static async checkStatus(req, res) {
    try {
      const emailId = req.params.emailId; // Assuming you pass emailId as a parameter
      console.log(emailId);
      const email = await Email.findById(emailId);

      if (!email) {
        return res.status(404).json({ error: "Email not found" });
      }

      res.status(200).json({ status: email.status });
    } catch (error) {
      console.error("Error checking email status:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
}

module.exports = EmailController;
