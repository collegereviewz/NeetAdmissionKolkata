import { Router } from "express";
import { registerUser, loginUser, logoutUser, getMe, sendOtp, verifyOtp, completeProfile } from "../controller/user.controller.js";

const router = Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").post(logoutUser);
router.route("/me").get(getMe);
router.route("/send-otp").post(sendOtp);
router.route("/verify-otp").post(verifyOtp);
router.route("/complete-profile").post(completeProfile);

export default router;
