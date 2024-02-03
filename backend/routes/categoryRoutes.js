const express = require('express');
const router = express.Router();
const { CreateCategoryController, updateCategoryController, getAllCategoryController, getOneCategory, deletecategory, categoryPhotoController } = require('../controller/categoryController');
const { isAdmin, requireSignIn } = require('../middleware/authMiddleware');
const multer = require('multer');

// Set up multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Specify the destination folder for file uploads
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '_' + file.originalname);
  },
});

const upload = multer({ storage: storage });

router.post('/create-category', requireSignIn, isAdmin, upload.single('photo'), CreateCategoryController);

router.put('/update-category/:id', requireSignIn, isAdmin, upload.single('photo'), updateCategoryController);

router.get('/get-category', getAllCategoryController);

router.get('/get-category/:id', getOneCategory);
router.get('/category-photo/:pid', categoryPhotoController);
router.delete('/delete-category/:id', requireSignIn, isAdmin, deletecategory);

module.exports = router;
