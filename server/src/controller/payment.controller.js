import Razorpay from 'razorpay';
import crypto from 'crypto';

// Initialize Razorpay lazily to ensure environment variables are loaded
const getRazorpayInstance = () => {
    return new Razorpay({
        key_id: process.env.RAZORPAY_KEY_ID,
        key_secret: process.env.RAZORPAY_KEY_SECRET,
    });
};

export const createOrder = async (req, res) => {
    try {
        const { amount, currency = 'INR', receipt } = req.body;
        const razorpay = getRazorpayInstance();

        console.log("💰 Creating Order for:", { amount, currency, receipt });
        console.log("Using Razorpay Key:", process.env.RAZORPAY_KEY_ID ? "PRESENT" : "MISSING");

        const options = {
            amount: amount * 100, // amount in the smallest currency unit (paise)
            currency,
            receipt,
        };

        const order = await razorpay.orders.create(options);
        console.log("✅ Razorpay Order Created:", order.id);

        if (!order) {
            return res.status(500).json({ message: "Failed to create Razorpay order" });
        }

        res.status(200).json(order);
    } catch (error) {
        console.error("❌ Razorpay Order Creation Error:", error);
        res.status(500).json({ message: error.message, errorDetails: error });
    }
};

export const verifyPayment = async (req, res) => {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature, userId } = req.body;

        const body = razorpay_order_id + "|" + razorpay_payment_id;

        const expectedSignature = crypto
            .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
            .update(body.toString())
            .digest('hex');

        const isSignatureValid = expectedSignature === razorpay_signature;

        if (isSignatureValid) {
            // Securely update the user status on the backend
            if (userId) {
                const { User } = await import('../models/user.model.js');
                const user = await User.findById(userId);
                if (user) {
                    user.isPaid = true;
                    user.subscriptionType = 'Paid';
                    await user.save({ validateBeforeSave: false });
                    console.log(`✅ [SECURITY] User ${userId} upgraded to Paid via payment verification.`);
                }
            }

            res.status(200).json({
                message: "Payment verified successfully",
                success: true
            });
        } else {
            console.error("❌ [SECURITY] Payment Signature Mismatch for userId:", userId);
            res.status(400).json({
                message: "Invalid payment signature",
                success: false
            });
        }
    } catch (error) {
        console.error("❌ Razorpay Signature Verification Error:", error);
        res.status(500).json({ message: error.message });
    }
};
