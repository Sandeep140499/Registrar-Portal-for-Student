

const express = require("express");
const router = express.Router();


const collegeRoutes = require("./collegeRoutes");
const universityRoutes = require("./universityRoutes");
const degreeRoutes = require("./degreeRoutes");
const designationRoutes = require("./designationRoute");
const departmentRoutes = require("./departmentRoutes");


router.use("/college", collegeRoutes);
router.use("/university", universityRoutes);
router.use("/degree", degreeRoutes);
router.use("/designation", designationRoutes);
router.use("/department", departmentRoutes);


module.exports = router;

