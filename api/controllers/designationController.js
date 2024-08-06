// controllers/roleController.js

const Designation = require("../models/Designation");
const { buildQuery } = require("./services/queryBuilder");


// CRUD operations
const createDesignation = async (req, res) => {
  try {
    const designation = await Designation.create(req.body);
    res.status(201).json(designation);
  } catch (error) {
    console.log("Error in creating all designation", error);
    res.status(500).json({ error: error.message });
  }
};

const getDesignation = async (req, res) => {
  try {
    const { page = 1, pageSize = 20, pagination, ...queryParams } = req.query;
    const query = buildQuery(queryParams);

    const count = await Designation.countDocuments();
    const totalPage = Math.ceil(count / pageSize);
    if (pagination === true || pagination === "true") {
      console.log(pagination,'A')
      const designations = await Designation.find(query)
        .skip((page - 1) * pageSize)
        .limit(pageSize)
        .exec();
      return res.status(200).json({ designations: designations, pages: totalPage });
    } else {
      console.log(pagination,'B')

      const designations = await Designation.find(query)
        // .skip((page - 1) * pageSize)
        // .limit(pageSize)
        .exec();
      return res.status(200).json({ designations: designations, pages: totalPage });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getDesignationById = async (req, res) => {
  try {
    const designation = await Designation.findById(req.params.id);
    if (!designation) {
      return res.status(404).json({ message: "Role not found" });
    }
    res.status(200).json(designation);
  } catch (error) {
    console.log("Error in get  designation", error);
    res.status(500).json({ error: error.message });
  }
};

const updateDesignation = async (req, res) => {
  try {
    const designation = await Designation.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json(designation);
  } catch (error) {
    console.log("Error in update designation", error);
    res.status(500).json({ error: error.message });
  }
};

const deleteDesignation = async (req, res) => {
  try {
    await Designation.findByIdAndDelete(req.params.id);
    res.status(204).end();
  } catch (error) {
    console.log("Error in delete designation", error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createDesignation,
  getDesignation,
  getDesignationById,
  updateDesignation,
  deleteDesignation,
};
