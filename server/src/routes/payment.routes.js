import { Router } from "express";
import { createOrder, verifyPayment } from "../controllers/payment.controller.js";
// import { verifyJWT } from "../middlewares/auth.middleware.js"; // Enable if you want to protect routes

const router = Router();

// Secure these routes if necessary
router.route("/create-order").post(createOrder);
router.route("/verify-payment").post(verifyPayment);

export default router;
