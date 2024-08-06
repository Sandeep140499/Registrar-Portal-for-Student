// controllers/roleController.js

const University = require("../models/University");
const { buildQuery } = require("./services/queryBuilder");

// CRUD operations
const createUniversity = async (req, res) => {
  try {
    const university = await University.create(req.body);
    res.status(201).json(university);
  } catch (error) {
    console.log("Error in creating all University", error);
    res.status(500).json({ error: error.message });
  }
};

const getUniversity = async (req, res) => {
  try {
    const { page = 1, pageSize = 20, pagination, ...queryParams } = req.query;
    const query = buildQuery(queryParams);

    const count = await University.countDocuments();
    const totalPage = Math.ceil(count / pageSize);
    if (pagination === true || pagination === "true") {
      console.log(pagination,'A')
      const universities = await University.find(query)
        .skip((page - 1) * pageSize)
        .limit(pageSize)
        .exec();
      return res.status(200).json({ universities: universities, pages: totalPage });
    } else {
      console.log(pagination,'B')

      const universities = await University.find(query)
        // .skip((page - 1) * pageSize)
        // .limit(pageSize)
        .exec();
      return res.status(200).json({ universities: universities, pages: totalPage });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getUniversityById = async (req, res) => {
  try {
    const university = await University.findById(req.params.id);
    if (!university) {
      return res.status(404).json({ message: "University not found" });
    }
    res.status(200).json(university);
  } catch (error) {
    console.log("Error in get  University", error);
    res.status(500).json({ error: error.message });
  }
};

const updateUniversity = async (req, res) => {
  try {
    const university = await University.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json(university);
  } catch (error) {
    console.log("Error in update University", error);
    res.status(500).json({ error: error.message });
  }
};

const deleteUniversity = async (req, res) => {
  try {
    await University.findByIdAndDelete(req.params.id);
    res.status(204).end();
  } catch (error) {
    console.log("Error in delete University", error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createUniversity,
  getUniversity,
  getUniversityById,
  updateUniversity,
  deleteUniversity,
};
