// controllers/industryController.js

const Industry = require("../models/Industry");
const College = require("../models/Industry");
const { buildQuery } = require("./services/queryBuilder");



// CRUD operations
const createIndustry = async (req, res) => {
  try {
    const industry = await Industry.create(req.body);
    res.status(201).json(industry);
  } catch (error) {
    console.log("Error in creating all Industry", error);
    res.status(500).json({ error: error.message });
  }
};

const getIndustry = async (req, res) => {
  try {
    const { page = 1, pageSize = 20, pagination, ...queryParams } = req.query;
    const query = buildQuery(queryParams);

    const count = await Industry.countDocuments();
    const totalPage = Math.ceil(count / pageSize);
    if (pagination === true || pagination === "true") {
      console.log(pagination,'A')
      const industries = await Industry.find(query)
        .skip((page - 1) * pageSize)
        .limit(pageSize)
        .exec();
      return res.status(200).json({ industries: industries, pages: totalPage });
    } else {
      console.log(pagination,'B')

      const industries = await Industry.find(query)
        // .skip((page - 1) * pageSize)
        // .limit(pageSize)
        .exec();
      return res.status(200).json({ industries: industries, pages: totalPage });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getIndustryById = async (req, res) => {
  try {
    const industry = await Industry.findById(req.params.id);
    if (!industry) {
      return res.status(404).json({ message: "Industry not found" });
    }
    res.status(200).json(industry);
  } catch (error) {
    console.log("Error in get  Industry", error);
    res.status(500).json({ error: error.message });
  }
};

const updateIndustry = async (req, res) => {
  try {
    const industries = await Industry.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json(industries);
  } catch (error) {
    console.log("Error in update Industry", error);
    res.status(500).json({ error: error.message });
  }
};

const deleteIndustry = async (req, res) => {
  try {
    await Industry.findByIdAndDelete(req.params.id);
    res.status(204).end();
  } catch (error) {
    console.log("Error in delete Industry", error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createIndustry,
  getIndustry,
  getIndustryById,
  updateIndustry,
  deleteIndustry,
};
