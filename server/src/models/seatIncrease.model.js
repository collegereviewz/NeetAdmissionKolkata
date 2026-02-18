
import mongoose from "mongoose";

const seatIncreaseSchema = new mongoose.Schema({
    state: { type: String, default: "" },
    institute: { type: String, default: "" },
    course: { type: String, default: "" },
    seatsFrom: { type: String, default: "" },
    seatsTo: { type: String, default: "" },
    increase: { type: String, default: "" },
    remark: { type: String, default: "" }
}, { timestamps: true });

export const SeatIncrease = mongoose.model("SeatIncrease", seatIncreaseSchema);
