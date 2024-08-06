const UserLoginInfoModal = require("../models/UserLoginInfo");
const buildQuery = require("./services/queryBuilder");

const getAllUserLoginInfo = async (req, res) => {
  try {
    const { page = 1, pageSize = 20, pagination, ...queryParams } = req.query;
    const query = buildQuery(queryParams);

    if (pagination || pagination === "true") {
      const count = await UserLoginInfoModal.countDocuments();
      const totalPage = Math.ceil(count / pageSize);

      const userLoginInfo = await UserLoginInfoModal.find(query)
        .sort({ createdAt: -1 })
        .skip((page - 1) * pageSize)
        .limit(pageSize)
        .exec();

      return res
        .status(200)
        .json({ userLoginInfo: userLoginInfo, pages: totalPage });
    }

    const count = await UserLoginInfoModal.countDocuments();
    const totalPage = Math.ceil(count / pageSize);
    const userLoginInfo = await UserLoginInfoModal.find(query)
      .sort({ createdAt: -1 })
      // .skip((page - 1) * pageSize)
      //   .limit(pageSize)
      .exec();
    return res
      .status(200)
      .json({ userLoginInfo: userLoginInfo, pages: totalPage });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getUserLoginInfoById = async (req, res) => {
  try {
    const userLoginInfo = await UserLoginInfoModal.findById(req.params.id);
    res.json({ userLoginInfo: userLoginInfo });
  } catch (err) {
    res.status(404).json({ message: "User Login Info not found" });
  }
};

const createUserLoginInfo = async (req, res) => {
  const vehicle = new UserLoginInfoModal(req.body);

  try {
    const userLoginInfo = await vehicle.save();
    res.status(201).json({ userLoginInfo: userLoginInfo });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const updateUserLoginInfo = async (req, res) => {
  try {
    const userLoginInfo = await UserLoginInfoModal.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );
    res.json({ userLoginInfo: userLoginInfo });
  } catch (err) {
    res.status(404).json({ message: "User Login Info not found" });
  }
};

const deleteUserLoginInfo = async (req, res) => {
  try {
    await UserLoginInfoModal.findByIdAndDelete(req.params.id);
    res.json({ message: "User Login Info deleted" });
  } catch (err) {
    res.status(404).json({ message: "User Login Info not found" });
  }
};

module.exports = {
  getAllUserLoginInfo,
  getUserLoginInfoById,
  createUserLoginInfo,
  updateUserLoginInfo,
  deleteUserLoginInfo,
};
