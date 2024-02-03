const userModel = require("../model/userModel");
const { hashPassword, comparePassword } = require("../config/hasingPassword");
const JWT = require("jsonwebtoken");
const dotenv = require("dotenv");
const nodemailer = require("nodemailer");
const orderModel = require("../model/orderModel");

// create new user or register new user
const registerController = async (req, res) => {
  try {
    const { name, email, mobile, password, address } = req.body;

    // Validation
    if (!name || !email || !mobile || !password || !address) {
      return res.status(400).send({ error: "All fields are required" });
    }

    // Check if user exists
    const existingUser = await userModel.findOne({ email });

    // If user exists, send a response
    if (existingUser) {
      return res.status(200).send({
        success: false,
        message: "Already registered. Please login.",
      });
    }

    // Hash the password
    const hashedPassword = await hashPassword(password);

    // Register User
    const user = await new userModel({
      name,
      email,
      mobile,
      password: hashedPassword,
      address,
    }).save();

    res.status(201).send({
      success: true,
      message: "User added successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ success: false, error: "Internal Server Error" });
  }
};

//  login user
const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(404).send({
        success: false,
        message: "invalid email or password",
      });
    }
    // if ok next user password matchin....and user chekin.....

    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "email not found please register",
      });
    }
    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.status(200).send({
        success: false,
        message: "invalid password",
      });
    }

    const token = JWT.sign(
      { _id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(200).send({
      success: true,
      message: "login successfully",
      user: {
        name: user.name,
        email: user.email,
        mobile: user.mobile,
        address: user.address,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error in login",
      error,
    });
  }
};

// Create a nodemailer transporter using your email provider's details
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "kalathingalunais@gmail.com", // replace with your email
    pass: "hudk cajz ogip irpi", // replace with your email password
  },
});

const generateOTP = () => {
  return Math.floor(1000 + Math.random() * 9000).toString();
};

const forgotPasswordController = async (req, res) => {
  try {
    const { email } = req.body;

    // Check if the email exists in the database
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Email not found. Please register.",
      });
    }

    // Generate OTP and set expiration time
    const otp = generateOTP();
    const otpExpiry = new Date(Date.now() + 600000); // OTP expires in 10 minutes

    // Update user model with OTP and expiry
    user.otp = otp;
    user.otpExpiry = otpExpiry;
    await user.save();

    // Send OTP email
    const mailOptions = {
      from: "kalathingalunais@gmail.com",
      to: user.email,
      subject: "Password Reset OTP",
      text: `Your OTP for password reset is: ${otp}. This OTP is valid for 10 minutes.`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending email:", error);
        return res.status(500).send({
          success: false,
          message: "Error sending OTP email",
          error,
        });
      } else {
        console.log("Email sent:", info.response);
        return res.status(200).send({
          success: true,
          message: "OTP sent successfully. Check your email.",
        });
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error in forgot password",
      error,
    });
  }
};

const resetPasswordController = async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;

    // Check if the email and OTP match
    const user = await userModel.findOne({ email, otp });

    // Logging for debugging
    console.log("Received Email:", email);
    console.log("Received OTP:", otp);
    console.log("User Found:", user);

    if (!user || user.otpExpiry < new Date()) {
      console.log("Invalid or expired OTP. Please try again.");
      return res.status(400).send({
        success: false,
        message: "Invalid or expired OTP. Please try again.",
      });
    }

    // Update user password and clear OTP fields
    user.password = await hashPassword(newPassword);
    user.otp = null;
    user.otpExpiry = null;
    await user.save();

    console.log("Password reset successfully.");

    res.status(200).send({
      success: true,
      message: "Password reset successfully.",
    });
  } catch (error) {
    console.error("Error in reset password:", error);
    res.status(500).send({
      success: false,
      message: "Error in reset password",
      error,
    });
  }
};

const verifyOTPController = async (req, res) => {
  try {
    const { email, otp } = req.body;

    // Find the user based on email and OTP
    const user = await userModel.findOne({ email, otp });

    if (user && user.otpExpiry > new Date()) {
      // Valid OTP
      res.status(200).json({
        success: true,
        message: "OTP verified successfully.",
      });
    } else {
      // Invalid or expired OTP
      res.status(400).json({
        success: false,
        message: "Invalid or expired OTP. Please try again.",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "An unexpected error occurred during OTP verification.",
      error: error.message,
    });
  }
};

const updateProfileController = async (req, res) => {
  try {
    const { name, mobile, address } = req.body;
    const user = await userModel.findById(req.user._id);

    const updateUser = await userModel.findByIdAndUpdate(
      req.user._id,
      {
        name: name || user.name,
        mobile: mobile || user.mobile,
        address: address || user.address,
      },
      {
        new: true,
      }
    );

    res.status(200).send({
      success: true,
      message: "Profile updated successfully",
      updateUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error occurred during profile update.",
      error,
    });
  }
};

const getOrdersController = async (req, res) => {
  try {
    const orders = await orderModel
      .find({ buyer: req.user._id })
      .populate("products", "-photo")
      .populate("buyer", "name");
    res.json(orders);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ success: false, message: "error geting orders", error });
  }
};

const getAllOrdersController = async (req, res) => {
  try {
    const orders = await orderModel
      .find({})
      .populate("products", "-photo")
      .populate("buyer", "name")
      .sort({ createdAt: -1 }) // Use sort() for sorting
      .exec();
    res.json(orders);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ success: false, message: "error geting all orders", error });
  }
};

const orderStatusController = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;

    const updatedStatus = await orderModel.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    );
    res.json(updatedStatus);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ success: false, message: "error updating  users oreder status" });
  }
};
module.exports = {
  registerController,
  orderStatusController,
  getOrdersController,
  loginController,
  forgotPasswordController,
  updateProfileController,
  resetPasswordController,
  verifyOTPController,
  getAllOrdersController,
};
