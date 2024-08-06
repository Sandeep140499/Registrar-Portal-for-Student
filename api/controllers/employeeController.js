// controllers/employeeController.js

const Employee = require("../models/Employee");
const { buildQuery } = require("./services/queryBuilder");

// CRUD operations
const createEmployee = async (req, res) => {
  try {
    const employee = await Employee.create(req.body);
    res.status(201).json(employee);
  } catch (error) {
    console.log("Error in creating all Employee", error);
    res.status(500).json({ error: error.message });
  }
};

const getEmployee = async (req, res) => {
  try {
    const { page = 1, pageSize = 20, pagination, ...queryParams } = req.query;
    const query = buildQuery(queryParams);

    const count = await Employee.countDocuments();
    const totalPage = Math.ceil(count / pageSize);
    if (pagination === true || pagination === "true") {
      console.log(pagination,'A')
      const employees = await Employee.find(query)
        .skip((page - 1) * pageSize)
        .limit(pageSize)
        .exec();
      return res.status(200).json({ employees: employees, pages: totalPage });
    } else {
      console.log(pagination,'B')

      const employees = await Employee.find(query)
        // .skip((page - 1) * pageSize)
        // .limit(pageSize)
        .exec();
      return res.status(200).json({ employees: employees, pages: totalPage });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getEmployeeById = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }
    res.status(200).json(employee);
  } catch (error) {
    console.log("Error in get  employee", error);
    res.status(500).json({ error: error.message });
  }
};

const updateEmployee = async (req, res) => {
  try {
    const employee = await Employee.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json(employee);
  } catch (error) {
    console.log("Error in update employee", error);
    res.status(500).json({ error: error.message });
  }
};

const deleteEmployee = async (req, res) => {
  try {
    await Employee.findByIdAndDelete(req.params.id);
    res.status(204).end();
  } catch (error) {
    console.log("Error in delete Employee", error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createEmployee,
  getEmployee,
  getEmployeeById,
  updateEmployee,
  deleteEmployee,
};
