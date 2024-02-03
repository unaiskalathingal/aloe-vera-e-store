const mongoose = require("mongoose");
const Product = require("../model/productModel");
const User = require("../model/userModel");

const orderSchema = new mongoose.Schema({
  products: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
  ],
  payment: {},
  buyer: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  status: {
    type: String,
    default: "not process",
    enum: ["not process", "processing", "shipped", "delivered", "cancelled"],
  },
});

module.exports = mongoose.model("Order", orderSchema);
