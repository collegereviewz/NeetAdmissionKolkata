
import mongoose from "mongoose";

const closingRankEntrySchema = new mongoose.Schema({
    year: {
        type: String,
        required: true
    },
    round: {
        type: String,
        required: true
    },
    value: {
        type: String,
        default: "-"
    }
}, { _id: false });

const closingRankSchema = new mongoose.Schema({
    quota: { type: String, default: "" },
    category: { type: String, default: "" },
    state: { type: String, default: "" },
    institute: { type: String, default: "" },
    course: { type: String, default: "" },
    fee: { type: String, default: "" },
    stipendYear1: { type: String, default: "" },
    bondYears: { type: String, default: "" },
    bondPenalty: { type: String, default: "" },
    beds: { type: String, default: "" },
    closingRanks: [closingRankEntrySchema]
}, { timestamps: true });

export const ClosingRank = mongoose.model("ClosingRank", closingRankSchema);
