import mongoose from "mongoose";

const updateSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },
        link: {
            type: String,
            required: true,
        },
        date: {
            type: String, // String to preserve formatted date from source
            required: true,
        },
        category: {
            type: String,
            default: "General",
        },
        type: {
            type: String,
            enum: ["alert", "note"],
            default: "alert",
        },
        source: {
            type: String,
            default: "MCC",
        },
        externalId: {
            type: String,
            unique: true, // To prevent duplicates during sync
        },
        hasVideo: {
            type: Boolean,
            default: false,
        },
        hasDownload: {
            type: Boolean,
            default: false,
        },
        subtitle: {
            type: String,
        },
        counsellingType: {
            type: String,
            required: true,
            index: true,
        },
        subCategory: {
            type: String,
            enum: ["Announcements & Events", "Quotas", "Registration", "Prospectus"],
            default: "Announcements & Events",
            index: true,
        },
    },
    { timestamps: true }
);

export const CounsellingUpdate = mongoose.model("CounsellingUpdate", updateSchema);
