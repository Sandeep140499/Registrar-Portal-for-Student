const express = require("express");
const router = express.Router();
const stateController = require("../controllers/stateController");

// Create a new user entry
router.post("/", stateController.createState);

// Get a list of user entries with search, pagination, and sorting getStateByCountryId
router.get("/", stateController.listState);
router.get("/country/:countryId", stateController.getStateByCountryId);
router.post("/bulk", stateController.createStatesInBulk);

module.exports = router;
