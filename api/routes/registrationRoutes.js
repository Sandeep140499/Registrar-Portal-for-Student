const express = require("express");
const router = express.Router();
const registrationController = require("../controllers/registrationController");

// CRUD routes
router.get("/", registrationController.getAllRegistration);

router.get("/:id", registrationController.getRegistrationById);

router.post("/", registrationController.createRegistration);

router.put("/:id", registrationController.updateRegistration);

router.delete("/:id", registrationController.deleteRegistration);
router.get("/user/:user_id", registrationController.getRegistrationByUserId);

router.get(
  "/vehicle/:vehicle_id",
  registrationController.getRegistrationByVehicleId
);

module.exports = router;
  