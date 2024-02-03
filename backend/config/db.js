const mongoose = require("mongoose")


const connectDB = async () => {
    try {
        
        const conn = await mongoose.connect(process.env.MONGODB_STRING,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
            connectTimeoutMS: 10000, // 10 seconds (adjust as needed)
          })
        console.log("database connected succesfully")
    } catch (error) {
        console.log(error)
    }
}

const bcrypt = require("bcrypt");

// Generate password hashing before saving
exports.hashPassword = async (password) => {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        return hashedPassword;
    } catch (error) {
        console.log(error);
    }
};

// Compare entered password with hashed password
exports.comparePassword = async (password, hashedPassword) => {
    return bcrypt.compare(password, hashedPassword);
};

module.exports = connectDB;