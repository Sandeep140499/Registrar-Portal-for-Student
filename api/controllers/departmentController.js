// controllers/roleController.js

const Department = require("../models/Department");
const { buildQuery } = require("./services/queryBuilder");
// const buildQuery = require("./services/queryBuilder");

// CRUD operations
const createDepartment = async (req, res) => {
  try {
    const department = await Department.create(req.body);
    res.status(201).json(department);
  } catch (error) {
    console.log("Error in creating all department", error);
    res.status(500).json({ error: error.message });
  }
};

const getDepartment = async (req, res) => {
  try {
    const { page = 1, pageSize = 20, pagination, ...queryParams } = req.query;
    const query = buildQuery(queryParams);

    const count = await Department.countDocuments();
    const totalPage = Math.ceil(count / pageSize);
    if (pagination === true || pagination === "true") {
      console.log(pagination,'A')
      const departments = await Department.find(query)
        .skip((page - 1) * pageSize)
        .limit(pageSize)
        .exec();
      return res.status(200).json({ departments: departments, pages: totalPage });
    } else {
      console.log(pagination,'B')

      const departments = await Department.find(query)
        // .skip((page - 1) * pageSize)
        // .limit(pageSize)
        .exec();
      return res.status(200).json({ departments: departments, pages: totalPage });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getDepartmentById = async (req, res) => {
  try {
    const department = await Department.findById(req.params.id);
    if (!department) {
      return res.status(404).json({ message: "Role not found" });
    }
    res.status(200).json(department);
  } catch (error) {
    console.log("Error in get  department", error);
    res.status(500).json({ error: error.message });
  }
};

const updateDepartment = async (req, res) => {
  try {
    const department = await Department.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json(department);
  } catch (error) {
    console.log("Error in update department", error);
    res.status(500).json({ error: error.message });
  }
};

const deleteDepartment = async (req, res) => {
  try {
    await Department.findByIdAndDelete(req.params.id);
    res.status(204).end();
  } catch (error) {
    console.log("Error in delete department", error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createDepartment,
  getDepartment,
  getDepartmentById,
  updateDepartment,
  deleteDepartment,
};
