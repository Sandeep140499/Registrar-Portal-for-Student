// controllers/roleController.js

const College = require("../models/College");
const { buildQuery } = require("./services/queryBuilder");



// CRUD operations
const createCollege = async (req, res) => {
  try {
    const college = await College.create(req.body);
    res.status(201).json(college);
  } catch (error) {
    console.log("Error in creating all College", error);
    res.status(500).json({ error: error.message });
  }
};

const getCollege = async (req, res) => {
  try {
    const { page = 1, pageSize = 20, pagination, ...queryParams } = req.query;
    const query = buildQuery(queryParams);

    const count = await College.countDocuments();
    const totalPage = Math.ceil(count / pageSize);
    if (pagination === true || pagination === "true") {
      console.log(pagination,'A')
      const colleges = await College.find(query)
        .skip((page - 1) * pageSize)
        .limit(pageSize)
        .exec();
      return res.status(200).json({ colleges: colleges, pages: totalPage });
    } else {
      console.log(pagination,'B')

      const colleges = await College.find(query)
        // .skip((page - 1) * pageSize)
        // .limit(pageSize)
        .exec();
      return res.status(200).json({ colleges: colleges, pages: totalPage });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getCollegeById = async (req, res) => {
  try {
    const college = await College.findById(req.params.id);
    if (!college) {
      return res.status(404).json({ message: "College not found" });
    }
    res.status(200).json(college);
  } catch (error) {
    console.log("Error in get  College", error);
    res.status(500).json({ error: error.message });
  }
};

const updateCollege = async (req, res) => {
  try {
    const colleges = await College.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json(colleges);
  } catch (error) {
    console.log("Error in update College", error);
    res.status(500).json({ error: error.message });
  }
};

const deleteCollege = async (req, res) => {
  try {
    await College.findByIdAndDelete(req.params.id);
    res.status(204).end();
  } catch (error) {
    console.log("Error in delete College", error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createCollege,
  getCollege,
  getCollegeById,
  updateCollege,
  deleteCollege,
};
