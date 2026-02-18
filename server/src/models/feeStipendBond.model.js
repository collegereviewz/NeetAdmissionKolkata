
import mongoose from "mongoose";

const feeStipendBondSchema = new mongoose.Schema({
    state: { type: String, default: "" },
    institute: { type: String, default: "" },
    course: { type: String, default: "" },
    quota: { type: String, default: "" },
    fee: { type: String, default: "" },
    stipendYear1: { type: String, default: "" },
    bondYears: { type: String, default: "" },
    bondPenalty: { type: String, default: "" },
    beds: { type: String, default: "" }
}, { timestamps: true });

export const FeeStipendBond = mongoose.model("FeeStipendBond", feeStipendBondSchema);
