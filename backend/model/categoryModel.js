const mongoose = require('mongoose');
const Product = require('../model/productModel');
const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  photo: {
    data: Buffer,
    contentType: String,
  },
  products: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
    },
  ],
});

module.exports = mongoose.model('Category', categorySchema);
