import mongoose from "mongoose";
import dotenv from "dotenv";
import { CounsellingUpdate } from "./src/models/update.model.js";

dotenv.config({ path: './.env' });

const allUpdates = [
    // Under Graduation - Medicine
    {
        title: "NEET UG 2026: Information Bulletin and Registration",
        link: "https://neet.nta.nic.in/",
        date: "24.02.2026",
        category: "Registration",
        type: "alert",
        source: "NTA",
        counsellingType: "NEET UG",
        field: "Medicine",
        level: "UG",
        externalId: "NEET_UG_2026_REG"
    },
    // Super Speciality - Medicine
    {
        title: "NEET SS 2025: Special Stray Vacancy Round Result",
        link: "https://mcc.nic.in/",
        date: "23.02.2026",
        category: "Allotment",
        type: "alert",
        source: "MCC",
        counsellingType: "NEET SS",
        field: "Medicine",
        level: "SS",
        externalId: "NEET_SS_2025_STRAY"
    },
    // Post Graduation - Miscellaneous (already has many, adding specialized ones)
    {
        title: "INICET July 2026: Online Registration Started",
        link: "https://aiimsexams.ac.in/",
        date: "24.02.2026",
        category: "Registration",
        type: "alert",
        source: "AIIMS",
        counsellingType: "INICET",
        field: "Medicine",
        level: "PG",
        externalId: "INICET_JULY_2026_REG"
    },
    {
        title: "NEET MDS 2026: Exam Date and Schedule Announced",
        link: "https://natboard.edu.in/",
        date: "22.02.2026",
        category: "General",
        type: "note",
        source: "NBE",
        counsellingType: "NEET MDS",
        field: "Medicine",
        level: "PG",
        externalId: "NEET_MDS_2026_DATE"
    }
];

const seedAll = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to MongoDB for all updates seeding");

        // Use upsert-like logic or just delete existing mock ones if testing
        // For simplicity, just insertMany and handle potential duplicate key errors
        for (const update of allUpdates) {
            try {
                await CounsellingUpdate.findOneAndUpdate(
                    { externalId: update.externalId },
                    update,
                    { upsert: true, new: true }
                );
            } catch (err) {
                console.error(`Failed to upsert ${update.externalId}:`, err.message);
            }
        }

        console.log("Mock updates for all categories seeded/updated successfully");
        process.exit(0);
    } catch (error) {
        console.error("Seeding failed:", error);
        process.exit(1);
    }
};

seedAll();
