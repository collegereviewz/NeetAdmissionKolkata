
import mongoose from "mongoose";

const universitySchema = new mongoose.Schema({
    universityName: { type: String, required: true },
    type: { type: String, default: "" },
    state: { type: String, default: "" }
}, { timestamps: true });

export const University = mongoose.model("University", universitySchema);
