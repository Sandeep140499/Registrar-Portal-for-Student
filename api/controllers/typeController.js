// controllers/industryController.js

const Type = require("../models/Type");
const { buildQuery } = require("./services/queryBuilder");



// CRUD operations
const createType = async (req, res) => {
  try {
    const type = await Type.create(req.body);
    res.status(201).json(type);
  } catch (error) {
    console.log("Error in creating all Type", error);
    res.status(500).json({ error: error.message });
  }
};

const getType = async (req, res) => {
  try {
    const { page = 1, pageSize = 20, pagination, ...queryParams } = req.query;
    const query = buildQuery(queryParams);

    const count = await Industry.countDocuments();
    const totalPage = Math.ceil(count / pageSize);
    if (pagination === true || pagination === "true") {
      console.log(pagination,'A')
      const types = await Type.find(query)
        .skip((page - 1) * pageSize)
        .limit(pageSize)
        .exec();
      return res.status(200).json({ types: types, pages: totalPage });
    } else {
      console.log(pagination,'B')

      const types = await Type.find(query)
        // .skip((page - 1) * pageSize)
        // .limit(pageSize)
        .exec();
      return res.status(200).json({ types: types, pages: totalPage });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getTypeById = async (req, res) => {
  try {
    const type = await Type.findById(req.params.id);
    if (!type) {
      return res.status(404).json({ message: "Type not found" });
    }
    res.status(200).json(type);
  } catch (error) {
    console.log("Error in get  Type", error);
    res.status(500).json({ error: error.message });
  }
};

const updateType = async (req, res) => {
  try {
    const types = await Type.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json(types);
  } catch (error) {
    console.log("Error in update Type", error);
    res.status(500).json({ error: error.message });
  }
};

const deleteType = async (req, res) => {
  try {
    await Type.findByIdAndDelete(req.params.id);
    res.status(204).end();
  } catch (error) {
    console.log("Error in delete Type", error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createType,
  getType,
  getTypeById,
  updateType,
  deleteType,
};
