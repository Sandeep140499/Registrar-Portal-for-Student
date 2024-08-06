const CountryModal = require("../models/Country");
const { buildQuery } = require("./services/queryBuilder");

const createCountry = async (req, res) => {
  try {
    const country = await CountryModal.create(req.body);

    res.status(201).json({ country: country });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const listCountry = async (req, res) => {
  try {
    const { page = 1, pageSize = 20, pagination, ...queryParams } = req.query;

    const query = buildQuery(queryParams);

    const count = await CountryModal.countDocuments();
    const totalPage = Math.ceil(count / pageSize);

    if (pagination === true || pagination === "true") {
      const country = await CountryModal.find(query)
        .skip((page - 1) * pageSize)
        .limit(pageSize)
        .exec();
      return res.status(200).json({ country: country, pages: totalPage });
    } else {
      const country = await CountryModal.find().exec();
      return res.status(200).json({ country: country, pages: totalPage });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getCountryById = async (req, res) => {
  try {
    const country = await CountryModal.findById(req.params.id);
    if (!country) {
      return res.status(404).json({ message: "Country not found" });
    }
    res.status(200).json({ country: country });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateCountry = async (req, res) => {
  try {
    const updatedCountry = await CountryModal.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedCountry) {
      return res.status(404).json({ message: "Country not found" });
    }
    res.status(200).json({ country: updatedCountry });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteCountry = async (req, res) => {
  try {
    await CountryModal.findByIdAndDelete(req.params.id);
    res.status(204).end();
  } catch (error) {
    console.log("Error in delete Country", error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createCountry,
  listCountry,
  getCountryById,
  updateCountry,
  deleteCountry,
};