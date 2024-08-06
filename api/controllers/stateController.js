const StateModal = require("../models/State");
const { buildQuery } = require("./services/queryBuilder");

exports.createState = async (req, res) => {
  try {
    const state = await StateModal.create(req.body);

    res.status(201).json({ state: state });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
exports.listState = async (req, res) => {
  try {
    const { page = 1, pageSize = 20, pagination, ...queryParams } = req.query;

    const query = buildQuery(queryParams);

    const count = await StateModal.countDocuments();
    const totalPage = Math.ceil(count / pageSize);

    if (pagination === true || pagination === "true") {
      const state = await StateModal.find(query)
        .skip((page - 1) * pageSize)
        .limit(pageSize)
        .exec();
      return res.status(200).json({ state: state, pages: totalPage });
    } else {
      const state = await StateModal.find().exec();
      return res.status(200).json({ state: state, pages: totalPage });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getStateByCountryId = async (req, res) => {
  try {
    const { countryId } = req.params;
    const iso_code = countryId;
    const state = await StateModal.find({ iso_code })
      .sort({ createdAt: -1 })
      .exec();

    if (!state || state.length === 0) {
      return res.status(404).json({
        message: "state not found for the specified country iso code",
      });
    }

    res.status(200).json({ state });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createStatesInBulk = async (req, res) => {
  try {
    const states = req.body;
    const createdStates = await StateModal.insertMany(states);

    res.status(201).json({ states: createdStates });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
