const express = require("express");
const router = express.Router();
const countryController = require("../controllers/countryController");

// Create a new user entry
router.post("/", countryController.createCountry);

// Get a list of user entries with search, pagination, and sorting
router.get("/", countryController.listCountry);

// Get a country by ID
router.get("/:id", countryController.getCountryById);

// Update a country by ID
router.put("/:id", countryController.updateCountry);

module.exports = router;
