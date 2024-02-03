const express = require("express");
const app = express();
const authRoutes = require("./routes/authRouts");
require("dotenv").config();
const categoryRoutes = require("./routes/categoryRoutes");
const productRoutes = require("./routes/productRoutes");
const uploadRoutes =require(`./routes/uploadRoutes`)
const multer = require("multer");
const Category = require('./model/categoryModel');
const Product = require('./model/productModel');
const PORT = process.env.PORT || 4000;
const path =require ('path')
const DataBase = require("./config/db");

const cors = require("cors");

app.use("/uploads", express.static("uploads"));



app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname,"./frontend/build/index.html")))
DataBase();

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/category", categoryRoutes); // Assuming categoryRoutes is configured to accept multer middleware
app.use("/api/v1/product", productRoutes);
app.use("/api/v1/uploads", uploadRoutes);
app.use("*", function (req, res)  {
  res.sendFile(path.join(__dirname,"./frontend/build/index.html"))
    
  
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
