import mongoose from "mongoose";

const closingRankSchema = new mongoose.Schema({
    year: {
        type: String, // Keeping as string to support flexible formats if needed, or convert to Number
        required: true
    },
    round: {
        type: String, // Keeping as string (e.g., "1", "2")
        required: true
    },
    value: {
        type: String, // e.g., "926(5)" - keeping as string to preserve original formatting
        default: "-"
    }
}, { _id: false });

const seatMatrixSchema = new mongoose.Schema({
    round: { type: String, default: "" },
    quota: { type: String, default: "" },
    category: { type: String, default: "" },
    state: { type: String, default: "" },
    institute: { type: String, default: "" },
    course: { type: String, default: "" },
    seats: { type: String, default: "" },
    fee: { type: String, default: "" },
    stipendYear1: { type: String, default: "" },
    bondYears: { type: String, default: "" },
    bondPenalty: { type: String, default: "" },
    beds: { type: String, default: "" },
    closingRanks: [closingRankSchema]
}, { timestamps: true });

export const SeatMatrix = mongoose.model("SeatMatrix", seatMatrixSchema);
