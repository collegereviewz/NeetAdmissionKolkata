import mongoose, { Schema } from "mongoose";

const otpSchema = new Schema({
    phoneNumber: {
        type: String,
        required: true,
        index: true
    },
    otp: {
        type: String,
        required: true
    },
    method: {
        type: String,
        enum: ["sms", "whatsapp"],
        default: "sms"
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 600 // 10 minutes (600 seconds)
    }
}, { timestamps: true });

export const Otp = mongoose.model("Otp", otpSchema);
