const fs = require("fs");
const multer = require("multer");
const categoryModel = require("../model/categoryModel");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Create an 'uploads' folder in your project root
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "_" + file.originalname);
  },
});

const upload = multer({ storage: storage });

const CreateCategoryController = async (req, res) => {
  try {
    const { name } = req.body;

    // Check for required fields using short-circuit evaluation
    if (!name) {
      throw new Error("Name field is required.");
    }

    const photo = req.file;

    if (!photo) {
      return res
        .status(400)
        .json({ success: false, message: "Photo is required" });
    }

    // Create a new category instance
    const category = new categoryModel({
      name,
    });

    // Set photo data and content type
    category.photo.data = fs.readFileSync(photo.path);
    category.photo.contentType = photo.mimetype;

    // Save the category to the database
    await category.save();

    // Respond with success message and the added category
    res
      .status(200)
      .json({ success: true, message: "Category added successfully", category });
  } catch (error) {
    console.error(error.message);
    res.status(400).json({
      success: false,
      message: error.message || "Error in adding category.",
    });
  }
};

const updateCategoryController = async (req, res) => {
  try {
    const { name } = req.body;
    const { id } = req.params;

    const updatedCategory = await categoryModel.findByIdAndUpdate(
      id,
      { name },
      { new: true }
    );

    res.status(200).send({
      success: true,
      message: "category updated successfully",
      updatedCategory,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error in category update",
    });
  }
};

const getAllCategoryController = async (req, res) => {
  try {
    const categories = await categoryModel.find({});
    res
      .status(200)
      .send({ success: true, message: "All categories retrieved", categories });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send({ success: false, message: "Error in retrieving categories" });
  }
};

const getOneCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const getOne = await categoryModel.findOne({ _id: id }).populate('products');

    if (getOne) {
      res.status(200).send({ success: true, message: 'category found', getOne });
    } else {
      res.status(404).send({ success: false, message: 'no category' });
    }
  } catch (error) {
    res.status(500).send({ success: false, message: 'Error in retrieving category', error: error.message });
    console.log(error);
  }
};

const categoryPhotoController = async (req, res) => {
  try {
      const categoryPhoto = await categoryModel.findById(req.params.pid).select("photo")
      if (!categoryPhoto) {
          throw new Error
      } else {
          res.set("content-type",categoryPhoto.photo.contentType)
          return res.status(200).send(categoryPhoto.photo.data)
      }
  } catch (error) {
      console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in getting photo",
      error: error.message,
    });
  
  }
}

const deletecategory = async (req, res) => {
 
  try {
    const { id } = req.params
    const deleteOneCategory = await categoryModel.findByIdAndDelete({ _id:id })
    if (deleteOneCategory) {
      res.status(200).send({ success: true, message: "category deleted successfully",deleteOneCategory });
    }
  
} catch (error) {
  res
  .status(500)
  .send({ success: false, message: "Error in deleting category" });
console.log(error)
}
}
module.exports = {
  CreateCategoryController,
  updateCategoryController,
  getAllCategoryController,
  getOneCategory,deletecategory,categoryPhotoController,
};
