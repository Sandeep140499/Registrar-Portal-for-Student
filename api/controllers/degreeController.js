// controllers/roleController.js

const Degree = require("../models/Degree");
const { buildQuery } = require("./services/queryBuilder");


// CRUD operations
const createDegree = async (req, res) => {
  try {
    const degree = await Degree.create(req.body);
    res.status(201).json(degree);
  } catch (error) {
    console.log("Error in creating all Degree", error);
    res.status(500).json({ error: error.message });
  }
};

const getDegree = async (req, res) => {
  try {
    const { page = 1, pageSize = 20, pagination, ...queryParams } = req.query;
    const query = buildQuery(queryParams);

    const count = await Degree.countDocuments();
    const totalPage = Math.ceil(count / pageSize);
    if (pagination === true || pagination === "true") {
      console.log(pagination,'A')
      const degrees = await Degree.find(query)
        .skip((page - 1) * pageSize)
        .limit(pageSize)
        .exec();
      return res.status(200).json({ degrees: degrees, pages: totalPage });
    } else {
      console.log(pagination,'B')

      const degrees = await Degree.find(query)
        // .skip((page - 1) * pageSize)
        // .limit(pageSize)
        .exec();
      return res.status(200).json({ degrees: degrees, pages: totalPage });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getDegreeById = async (req, res) => {
  try {
    const degree = await Degree.findById(req.params.id);
    if (!degree) {
      return res.status(404).json({ message: "Role not found" });
    }
    res.status(200).json(degree);
  } catch (error) {
    console.log("Error in get  Degree", error);
    res.status(500).json({ error: error.message });
  }
};

const updateDegree = async (req, res) => {
  try {
    const degree = await Degree.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json(degree);
  } catch (error) {
    console.log("Error in update Degree", error);
    res.status(500).json({ error: error.message });
  }
};

const deleteDegree = async (req, res) => {
  try {
    await Degree.findByIdAndDelete(req.params.id);
    res.status(204).end();
  } catch (error) {
    console.log("Error in delete Degree", error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createDegree,
  getDegree,
  getDegreeById,
  updateDegree,
  deleteDegree,
};
