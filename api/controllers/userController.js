// controllers/userController.js
const { ObjectId } = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const buildQuery = require("./services/queryBuilder");
const { sendEmail } = require("./emailController");
const generatePasswordResetToken = require("./services/generateToken");

exports.createUser = async (req, res) => {
  try {
    const newUser = new User(req.body);
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    console.error("Error creating user:", error);
    res
      .status(500)
      .json({ message: "An error occurred while creating the user." });
  }
};

// Get a single user by ID
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.id }).exec();
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }
    res.status(200).json(user);
  } catch (error) {
    console.log("Error in getting user", error);
    res
      .status(500)
      .json({ message: "An error occurred while fetching the user." });
  }
};

// Get a list of users with optional filters and pagination
exports.listUser = async (req, res) => {
  try {
    const { page = 1, pageSize = 20, ...queryParams } = req.query;
    const query = buildQuery(queryParams);
    // const options = { maxTimeMS: 20000 };
    const count = await User.countDocuments(query);

    const totalPage = Math.ceil(count / pageSize);
    const users = await User.find(query)
      .populate("user_role")
      .skip((page - 1) * pageSize)
      .limit(pageSize)
      .sort({ createdAt: -1 })
      .exec();

    res.status(200).json({ users: users, pages: totalPage });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a user by ID
exports.updateUser = async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    }).exec();
    res.status(200).json(updatedUser);
  } catch (error) {
    console.log("Error in updating user", error);
    res
      .status(500)
      .json({ message: "An error occurred while updating the user." });
  }
};

// Delete a user by ID
exports.deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id).exec();
    res.status(204).send();
  } catch (error) {
    console.log("Error in deleting user", error);
    res
      .status(500)
      .json({ message: "An error occurred while deleting the user." });
  }
};

exports.changePassword = async (req, res) => {
  try {
    const {
      type,
      token,
      email,
      currentPassword,
      newPassword,
      confirmPassword,
    } = req?.body;
    let response = {};
    if (type === "forget") {
      const user = await User.findOne({ token: token });
      console.log(user, "user");
      const tokenMatch = bcrypt.compare(token, user?.token);

      if (!tokenMatch) {
        return res
          .status(200)
          .json({ isSuccess: false, message: "Invalid token." });
      }

      if (newPassword === confirmPassword) {
        const hashedPassword = await bcrypt.hash(confirmPassword, 10);
        const userPasswordChange = await User.findOneAndUpdate(
          { _id: user?._id },
          {
            password: hashedPassword,
          }
        );
        response = {
          isSuccess: true,
          message: `Password change ssuccessfully!`,
          user: userPasswordChange,
        };
      } else {
        response = {
          isSuccess: false,
          message: `Confirm password do not match with new password!`,
        };
      }
    } else {
      const user = await User.findById(req?.params?.id);
      if (user) {
        const passwordMatch = await bcrypt.compare(
          currentPassword,
          user.password
        );
        if (!passwordMatch) {
          response = {
            isSuccess: false,
            message: `Please enter valid current password.`,
          };
        } else {
          if (newPassword === confirmPassword) {
            const hashedPassword = await bcrypt.hash(confirmPassword, 10);
            const userPasswordChange = await User.findOneAndUpdate(
              { _id: req?.params?.id },
              {
                password: hashedPassword,
              }
            );
            response = {
              isSuccess: true,
              message: `Password change ssuccessfully!`,
              user: userPasswordChange,
            };
          } else {
            response = {
              isSuccess: false,
              message: `Confirm password do not match with new password!`,
            };
          }
        }
      }
    }
    res.status(200).json(response);
  } catch (error) {
    console.log("Error in deleting user", error);
    res.status(500).json({ message: error?.message });
  }
};

exports.forgetPassword = async (req, res) => {
  try {
    const user = await User.findOne({ email: req?.body?.send_to });
    if (!user) {
      return res.status(200).json({ message: "User not found." });
    }

    const token = await generatePasswordResetToken();
    const insertToken = await User.findOneAndUpdate(
      { email: req?.body?.send_to },
      {
        token: token,
      }
    );
    let tempUrl = `/forget-password/${token}`;
    const emailObject = {
      body: {
        message_name: "Sample Message",
        message_type: "Email",
        subject: "Change Your Password",
        body: "Click here: http://localhost:3000//forget-password",
        send_to: req?.body?.send_to,
        cc_to: "",
        bcc_to: "",
        attachment: "",
      },
    };

    // const email = await sendEmail(emailObject);
    res.status(200).json({ message: "Link generated.", tempUrl: tempUrl });
  } catch (error) {
    console.log("Error", error);
    res.status(500).json({ message: error?.message });
  }
};
