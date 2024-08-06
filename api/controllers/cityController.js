const CityModal = require("../models/City");
const { buildQuery } = require("./services/queryBuilder");

exports.createCity = async (req, res) => {
  try {
    const city = await CityModal.create(req.body);

    res.status(201).json({ city: city });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
exports.listCity = async (req, res) => {
  try {
    const { page = 1, pageSize = 20, pagination, ...queryParams } = req.query;

    const query = buildQuery(queryParams);

    const count = await CityModal.countDocuments();
    const totalPage = Math.ceil(count / pageSize);

    if (pagination === true || pagination === "true") {
      const city = await CityModal.find(query)
        .skip((page - 1) * pageSize)
        .limit(pageSize)
        .exec();
      return res.status(200).json({ city: city, pages: totalPage });
    } else {
      const city = await CityModal.find().exec();
      return res.status(200).json({ city: city, pages: totalPage });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getCityByStateId = async (req, res) => {
  try {
    const { stateId } = req.params;
    console.log(stateId, "stateCode", req);
    const stateCode = stateId;
    const city = await CityModal.find({ stateCode })
      .sort({ createdAt: -1 })
      .exec();

    if (!city || city.length === 0) {
      return res
        .status(404)
        .json({ message: "city not found for the specified state is" });
    }

    res.status(200).json({ city });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createCityInBulk = async (req, res) => {
  try {
    const cities = req.body;
    const createdCities = await CityModal.insertMany(cities);
    res.status(201).json({ cities: createdCities });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
