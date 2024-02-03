const express = require("express");
const {registerController, loginController, forgotPasswordController, resetPasswordController, verifyOTPController, updateProfileController, getOrdersController, getAllOrdersController, orderStatusController,} = require("../controller/authController");
const { isAdmin, testController, requireSignIn,} = require("../middleware/authMiddleware");


const router = express.Router();

router.post("/register", registerController);

router.post("/login", loginController);

router.get("/test", requireSignIn, isAdmin, testController);

router.get("/user-auth", requireSignIn, (req, res) => {res.status(200).send({ ok: true });});

router.get("/admin-auth", requireSignIn,isAdmin, (req, res) => {res.status(200).send({ ok: true });});

router.post("/forgot-password", forgotPasswordController);

router.post("/verify-otp", verifyOTPController); // Add this line for OTP verification


router.post("/reset-password", resetPasswordController);

router.put("/profile", requireSignIn, updateProfileController)

router.get("/orders",requireSignIn,getOrdersController)

router.get("/allorders",requireSignIn,isAdmin,getAllOrdersController)


router.put("/order-status/:orderId",requireSignIn,isAdmin,orderStatusController)


module.exports = router;
