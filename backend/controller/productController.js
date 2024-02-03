const express = require("express");
const fs = require("fs");
const productModel = require("../model/productModel");
const Razorpay = require("razorpay");
const mongoose = require("mongoose");
const User = require("../model/userModel");
const Order = require("../model/orderModel");

const razorpay = new Razorpay({
  key_id: "rzp_test_QIpteCb4AOYEYV",
  key_secret: "CRUvtHSQ3eEViUwynfePj2yp",
});

const razorpayPaymentController = async (req, res) => {
  try {
    const { cart } = req.body;
    const buyerId = req.user._id;
    // Calculate total amount from the cart
    const totalAmount =
      cart.reduce((total, product) => {
        return total + parseFloat(product.price);
      }, 0) * 100; // Convert to paisa (Razorpay accepts amount in paisa)

    // Create an order in Razorpay
    const order = await razorpay.orders.create({
      amount: totalAmount,
      currency: "INR",
      payment_capture: 1,
    });
    const orderData = {
      products: cart.map((product) => product._id),
      buyer: buyerId,
      payment: {
        payment_method: "Razorpay",
        razorpay_order_id: order.id,
        // Add other payment details if needed
      },
      // other order details...
    };
    const savedOrder = await Order.create(orderData);
    res.status(200).json({
      success: true,
      orderId: order.id,
      amount: totalAmount,
    });
  } catch (error) {
    console.error("Error handling Razorpay payment:", error);
    res.status(500).json({
      success: false,
      message: "Error handling Razorpay payment",
      error: error.message,
    });
  }
};

const codPaymentController = async (req, res) => {
  try {
    const { cart } = req.body;
    const buyerId = req.user._id; // Assuming you have middleware to attach the user to the request

    // Validate if the buyerId is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(buyerId)) {
      throw new Error("Invalid buyerId");
    }

    // Find the user with the provided buyerId
    const user = await User.findById(buyerId);

    if (!user) {
      throw new Error("User not found");
    }

    // Proceed with the payment logic, create an order, etc.
    const order = new Order({
      products: cart.map((product) => product._id),
      buyer: buyerId,
      payment: {
        payment_method: "COD", // Set the payment method to 'COD'
        // Add other payment details if needed
      },
      // other order details...
    });

    await order.save();

    // ... rest of the code ...

    res.status(200).json({
      success: true,
      message: "COD payment successful",
      orderId: order._id, // You may want to send the order ID back to the frontend
    });
  } catch (error) {
    console.error("Error handling COD payment:", error);
    res.status(500).json({
      success: false,
      message: "Error handling COD payment",
      error: error.message,
    });
  }
};

const addProductController = async (req, res) => {
  try {
    const { name, description, price, quantity, shipping } = req.fields;
    const { category } = req.fields; // Category ID
    const { photo } = req.files;

    // Check for required fields using short-circuit evaluation
    if (
      !name ||
      !description ||
      !category ||
      !price ||
      !quantity ||
      !shipping
    ) {
      throw new Error("All fields are required.");
    }

    if (!photo) {
      return res
        .status(400)
        .json({ success: false, message: "photo is required" });
    }

    // Create a new product instance
    const product = new productModel({
      name,
      description,
      category,
      price,
      quantity,
      shipping,
    });

    // Read the photo file and set content type
    product.photo.data = fs.readFileSync(photo.path);
    product.photo.contentType = photo.type;

    // Save the product to the database
    await product.save();

    // Respond with success message and the added product
    res
      .status(200)
      .json({ success: true, message: "Product added successfully", product });
  } catch (error) {
    console.error(error.message);
    res.status(400).json({
      success: false,
      message: error.message || "Error in adding product.",
    });
  }
};
//get all products
const getProductController = async (req, res) => {
  try {
    const products = await productModel
      .find({})
      .populate("category")
      .select("-photo")
      
      .sort({ createdAt: -1 });
    res.status(200).send({
      success: true,

      countTotal: products.length,
      message: "Products retrieved successfully",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error in get product",
      error: error.message,
    });
  }
};
const getSingleProductController = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await productModel
      .findOne({ _id: id })
      .select("-photo")
      .populate("category");

    if (!product) {
      return res.status(404).send({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).send({
      success: true,
      message: "Product retrieved successfully",
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in getting product",
      error: error.message,
    });
  }
};

const productPhotoController = async (req, res) => {
  try {
    const productPhoto = await productModel
      .findById(req.params.pid)
      .select("photo");
    if (!productPhoto) {
      throw new Error();
    } else {
      res.set("content-type", productPhoto.photo.contentType);
      return res.status(200).send(productPhoto.photo.data);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in getting photo",
      error: error.message,
    });
  }
};

const productDeleteController = async (req, res) => {
  try {
    await productModel.findByIdAndDelete(req.params.pid).select("-photo");
    res
      .status(200)
      .send({ success: true, message: " product deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in getting photo",
      error: error.message,
    });
  }
};

const updateProductController = async (req, res) => {
  try {
    const { name, description, category, price, quantity, shipping } =
      req.fields;
    const { photo } = req.files;

    // Check for required fields using short-circuit evaluation
    if (
      !name ||
      !description ||
      !category ||
      !price ||
      !quantity ||
      !shipping
    ) {
      throw new Error("All fields are required.");
    }

    // Retrieve the existing product
    const product = await productModel.findByIdAndUpdate(
      req.params.pid,
      { ...req.fields },
      { new: true }
    );

    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    // If a new photo is selected
    if (photo) {
      // Read the photo file and set content type
      product.photo.data = fs.readFileSync(photo.path);
      product.photo.contentType = photo.type;
    }

    // Save the product to the database
    await product.save();

    // Respond with success message and the updated product
    res.status(200).json({
      success: true,
      message: "Product updated successfully",
      product,
    });
  } catch (error) {
    console.error(error.message);
    res.status(400).json({
      success: false,
      message: error.message || "Error in updating product.",
    });
  }
};
const getProductByCategoryController = async (req, res) => {
  try {
    const { categoryId } = req.params;

    const products = await productModel
      .find({ category: categoryId })
      .populate("category")
      .select("-photo")
      
      .sort({ createdAt: -1 });

    res.status(200).send({
      success: true,
      countTotal: products.length,
      message: "Products retrieved successfully",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in get product by category",
      error: error.message,
    });
  }
};

module.exports = {
  addProductController,
  getProductController,
  getSingleProductController,
  productPhotoController,
  getProductByCategoryController,
  productDeleteController,
  updateProductController,

  codPaymentController,
  razorpayPaymentController,
};
