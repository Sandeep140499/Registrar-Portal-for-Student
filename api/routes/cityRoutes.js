const express = require("express");
const router = express.Router();
const cityController = require("../controllers/cityController");

// Create a new user entry
router.post("/", cityController.createCity);

// Get a list of user entries with search, pagination, and sorting getStateByCountryId
router.get("/", cityController.listCity);
router.get("/state/:stateId", cityController.getCityByStateId);
router.post("/bulk", cityController.createCityInBulk);

module.exports = router;
