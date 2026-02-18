
import mongoose from "mongoose";

const allotmentSchema = new mongoose.Schema({
    round: { type: String, default: "" },
    aiRank: { type: String, default: "" },
    state: { type: String, default: "" },
    institute: { type: String, default: "" },
    course: { type: String, default: "" },
    quota: { type: String, default: "" },
    category: { type: String, default: "" },
    fee: { type: String, default: "" },
    stipendYear1: { type: String, default: "" },
    bondYears: { type: String, default: "" },
    bondPenalty: { type: String, default: "" },
    beds: { type: String, default: "" }
}, { timestamps: true });

export const Allotment = mongoose.model("Allotment", allotmentSchema);
