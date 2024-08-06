const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors"); // Import the cors package
const multer = require("multer");
require("dotenv").config();
const routes = require("./routes");
const app = express();

// Middleware
app.use(bodyParser.json({ limit: "50mb" }));

const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    // Generate a new filename with a timestamp and preserve the original extension
    const timestamp = Date.now();
    const extension = file.originalname.split(".").pop();
    const newFileName = `${timestamp}-${file.originalname}`;
    cb(null, newFileName);
  },
});

app.use(multer({ storage: storage }).array("files")); // Handle file uploads

app.use(express.json());

// Configure CORS
app.use(cors()); // Use the cors middleware

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    family: 4,
  })
  .then(() => {
    console.log("connect with db");
  })
  .catch((err) => {
    console.log(err);
  });

app.use("/", routes);

// Start server
const PORT = process.env.PORT || 3035;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
