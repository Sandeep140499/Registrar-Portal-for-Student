// controllers/industryController.js

const Grade = require("../models/Grade");
const { buildQuery } = require("./services/queryBuilder");



// CRUD operations
const createGrade = async (req, res) => {
  try {
    const grade = await Grade.create(req.body);
    res.status(201).json(grade);
  } catch (error) {
    console.log("Error in creating all Grade", error);
    res.status(500).json({ error: error.message });
  }
};

const getGrade = async (req, res) => {
  try {
    const { page = 1, pageSize = 20, pagination, ...queryParams } = req.query;
    const query = buildQuery(queryParams);

    const count = await Grade.countDocuments();
    const totalPage = Math.ceil(count / pageSize);
    if (pagination === true || pagination === "true") {
      console.log(pagination,'A')
      const grades = await Grade.find(query)
        .skip((page - 1) * pageSize)
        .limit(pageSize)
        .exec();
      return res.status(200).json({ grades: grades, pages: totalPage });
    } else {
      console.log(pagination,'B')

      const grades = await Grade.find(query)
        // .skip((page - 1) * pageSize)
        // .limit(pageSize)
        .exec();
      return res.status(200).json({ grades: grades, pages: totalPage });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getGradeById = async (req, res) => {
  try {
    const grade = await Grade.findById(req.params.id);
    if (!grade) {
      return res.status(404).json({ message: "Grade not found" });
    }
    res.status(200).json(grade);
  } catch (error) {
    console.log("Error in get  Grade", error);
    res.status(500).json({ error: error.message });
  }
};

const updateGrade = async (req, res) => {
  try {
    const grades = await Grade.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json(grades);
  } catch (error) {
    console.log("Error in update Grade", error);
    res.status(500).json({ error: error.message });
  }
};

const deleteGrade = async (req, res) => {
  try {
    await Grade.findByIdAndDelete(req.params.id);
    res.status(204).end();
  } catch (error) {
    console.log("Error in delete Grade", error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createGrade,
  getGrade,
  getGradeById,
  updateGrade,
  deleteGrade,
};
