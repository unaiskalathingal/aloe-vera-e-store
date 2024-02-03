const mongoose = require("mongoose");

const productScheema = new mongoose.Schema({

  name: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  price: {
    type: String,
    required: true,
    },
  quantity: {
    type: String,
    required: true,
  },
    photo:{
        data: Buffer,
        contentType:String  
    },
    shipping: {
        type: Boolean
    }
});

module.exports = mongoose.model('Product', productScheema);