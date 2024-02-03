const express = require("express");
const uploadController = require("../controller/uploadController");
const router = express.Router();
const multer = require("multer");

// Set up multer for image upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "_" + file.originalname);
  },
});

const upload = multer({ storage: storage });

// Define routes
router.post("/", upload.single("image"), uploadController.uploadImage);

module.exports = router;
