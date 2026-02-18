
import mongoose from "mongoose";

const counsellingSchema = new mongoose.Schema({
    counsellingName: { type: String, required: true },
    type: { type: String, default: "" },
    state: { type: String, default: "" } // Extracted from name for filtering
}, { timestamps: true });

export const Counselling = mongoose.model("Counselling", counsellingSchema);
