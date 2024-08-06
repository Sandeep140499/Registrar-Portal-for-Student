// controllers/authController.js
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const config = require("../config");

exports.register = async (req, res) => {
  try {
    const { name, email, mobile, password, user_role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      name,
      email,
      mobile,
      password: hashedPassword,
      user_role: user_role,
      status: "active",
      created_on: new Date(),
      created_by: "system",
    });
    const isExistUser = await User.findOne({ email });
    const isExistUserMobile = await User.findOne({ mobile });

    if (isExistUser || isExistUserMobile) {
      return res.json({ message: "User already exist ." });
    }

    await user.save();
    res.json({ message: "Registration successful." });
  } catch (error) {
    console.log("Error in Register user", error.message);
    res.status(500).json({ error: "Registration failed" });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(req.body);
    const user = await User.findOne({ email }).populate("user_role");
    if (!user) {
      throw new Error("User not found");
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      throw new Error("Invalid credentials");
    }
    const token = jwt.sign({ id: user._id }, config.secretKey, {
      expiresIn: "1h",
    });
    res.json({ token, status: "success", user });
  } catch (error) {
    console.log("Error in login user", error);
    res.status(401).json({ error: "Authentication failed" });
  }
};
