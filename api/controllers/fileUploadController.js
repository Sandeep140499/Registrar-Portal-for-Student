
const sharp = require('sharp');
const fileUpload = require('../models/fileUpload');
const upload = require('../multerCon');

const fileUploadController = {
  uploadFile: async (req, res) => {
    try {
      const { file } = req;
      const { originalname, mimetype, buffer } = file;
      console.log('Uploading file:', originalname);
      const resizedBuffer = await sharp(buffer)
        .resize({ width: 300, height: 300 })
        .toBuffer();

      const uploadedFile = new fileUpload({
        file_Name: originalname,
        org_Name: originalname,
        extension: mimetype.split('/')[1],
        file_Type: mimetype,
        file_Path: 'uploads', // Update this with the actual file path
        status: 'active',
      });

      await uploadedFile.save();

      res.json({
        message: 'File uploaded successfully!',
        fileInfo: uploadedFile,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error'});
    }
  },
  getAllFiles: async (req, res) => {
    try {
      const files = await fileUpload.find();
      res.status(200).json(files);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  getfile: async (req, res) => {
    try {
      const { fileId } = req.params;

      const uploadedFile = await fileUpload.findById(fileId);

      if (!uploadedFile) {
        return res.status(404).json({ error: 'File not found' });
      }

      const filePath = 'upload'; // Update this with the actual file path
      const resizedBuffer = await sharp(filePath)
        .resize({ width: 300, height: 300 })
        .toBuffer();

      res.type(uploadedFile.file_Type);
      res.send(resizedBuffer);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error', error });
    }
  },
};

module.exports = fileUploadController;

