
import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
    courseName: { type: String, required: true },
    clinicalType: { type: String, default: "" },
    degreeType: { type: String, default: "" },
    duration: { type: String, default: "" }
}, { timestamps: true });

export const Course = mongoose.model("Course", courseSchema);
