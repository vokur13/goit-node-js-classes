const express = require('express');
const multer = require('multer');
const path = require('path');
const mime = require('mime-types');
const uploadDir = path.resolve('uploads/avatars');
const { v4: uuidv4 } = require('uuid');

const router = new express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = uuidv4();
    const ext = mime.extension(file.mimetype);
    cb(null, file.fieldname + '-' + uniqueSuffix + '.' + ext);
  },
  limits: {
    fileSize: 1048576,
  },
});

const upload = multer({
  storage: storage,
});

const auth = require('../middleware/authMiddleware');

const { uploadController } = require('../controller');

const { asyncWrapper } = require('../helpers/apiHelper');

router.use(auth);

// POST /api/files/upload
router
  .post('/upload', upload.single('avatar'), asyncWrapper(uploadController))
  .use('/', express.static(uploadDir));

module.exports = {
  filesRoutes: router,
};
