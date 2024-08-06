// controllers/UploadFileController.js
const UploadFile = require("../models/UploadFile");

// CRUD operations
const createUploadFile = async (req, res) => {
  try {
    const files = req.files;
    console.log(files, "files backend");
    // Process and save each file to the database
    const savedFiles = await Promise.all(
      files.map(async (file) => {
        const uploadFile = await UploadFile.create({
          file_name: file.filename,
          original_name: file.originalname,
          file_type: file.mimetype,
          file_extension: file.originalname.split(".").pop(),
          file_path: file.path,
          status: req.body.status,
          created_by: req.body.created_by,
        });

        return uploadFile;
      })
    );

    res.status(201).json(savedFiles);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getUploadFiles = async (req, res) => {
  try {
    const query = req.query;
    const page = parseInt(query.page) || 1;
    const pageSize = parseInt(query.pageSize) || 20;

    delete query.page;
    delete query.pageSize;

    const uploadFiles = await UploadFile.find(query)
      .skip((page - 1) * pageSize)
      .limit(pageSize)
      .exec();

    res.status(200).json(uploadFiles);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getUploadFileById = async (req, res) => {
  try {
    const uploadFile = await UploadFile.findById(req.params.id);
    if (!uploadFile) {
      return res.status(404).json({ message: "Upload File not found" });
    }
    res.status(200).json(uploadFile);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateUploadFile = async (req, res) => {
  try {
    const updateData = {
      ...req.body,
      updated_on: new Date(),
    };

    const uploadFile = await UploadFile.findByIdAndUpdate(
      req.params.id,
      updateData,
      {
        new: true,
      }
    );

    res.status(200).json(uploadFile);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteUploadFile = async (req, res) => {
  try {
    await UploadFile.findByIdAndDelete(req.params.id);
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createUploadFile,
  getUploadFiles,
  getUploadFileById,
  updateUploadFile,
  deleteUploadFile,
};
