
import mongoose from "mongoose";

const instituteSchema = new mongoose.Schema({
    instituteName: { type: String, required: true },
    university: { type: String, default: "" },
    type: { type: String, default: "" },
    management: { type: String, default: "" },
    beds: { type: String, default: "" },
    state: { type: String, default: "" } // Inferred from University or other means
}, { timestamps: true });

export const Institute = mongoose.model("Institute", instituteSchema);
