const express = require("express");
const router = express.Router();
const userLoginInfoController = require("../controllers/userLoginInfoController");

// CRUD routes
router.get("/", userLoginInfoController.getAllUserLoginInfo);
router.get("/:id", userLoginInfoController.getUserLoginInfoById);
router.post("/", userLoginInfoController.createUserLoginInfo);
router.put("/:id", userLoginInfoController.updateUserLoginInfo);
router.delete("/:id", userLoginInfoController.deleteUserLoginInfo);

module.exports = router;
