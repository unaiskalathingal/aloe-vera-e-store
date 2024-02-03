const express = require("express")
const { requireSignIn, isAdmin } = require("../middleware/authMiddleware")
const { addProductController,codPaymentController, getProductController, getSingleProductController, productPhotoController, productDeleteController, updateProductController, getProductByCategoryController, razorpayPaymentController,  } = require("../controller/productController")

const formidable = require('express-formidable')

const router = express.Router()

router.post('/add-product', requireSignIn, isAdmin, formidable(), addProductController)
router.get('/get-product',getProductController)
router.get('/get-product/:id', getSingleProductController)
router.get('/product-photo/:pid',productPhotoController)
router.delete('/delete-product/:pid', requireSignIn,isAdmin,productDeleteController)
router.put('/update-product/:pid', requireSignIn, isAdmin, formidable(), updateProductController)
router.get('/get-products-by-category/:categoryId', getProductByCategoryController);

router.post("/cod/checkout", requireSignIn, codPaymentController);
router.post("/razorpay/checkout", requireSignIn, razorpayPaymentController);



module.exports = router