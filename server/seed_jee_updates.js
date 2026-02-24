import mongoose from "mongoose";
import dotenv from "dotenv";
import { CounsellingUpdate } from "./src/models/update.model.js";

dotenv.config({ path: './.env' });

const jeeUpdates = [
    {
        title: "JEE Mains 2026: Session 1 Registration Starts",
        link: "https://jeemain.nta.nic.in/",
        date: "24.02.2026",
        category: "Registration",
        type: "alert",
        source: "NTA",
        counsellingType: "JEE Mains",
        subCategory: "Announcements & Events",
        externalId: "JEE_MAINS_2026_REG_START"
    },
    {
        title: "Notice for JEE Advanced 2026 Syllabus and Exam Pattern",
        link: "https://jeeadv.ac.in/",
        date: "23.02.2026",
        category: "General",
        type: "note",
        source: "IIT Kanpur",
        counsellingType: "JEE Advanced",
        subCategory: "Announcements & Events",
        externalId: "JEE_ADV_2026_SYLLABUS"
    },
    {
        title: "JEE Mains 2026: Information Bulletin Released",
        link: "https://jeemain.nta.nic.in/",
        date: "20.02.2026",
        category: "Prospectus",
        type: "note",
        source: "NTA",
        counsellingType: "JEE Mains",
        subCategory: "Prospectus",
        externalId: "JEE_MAINS_2026_IB"
    }
];

const seedJEE = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to MongoDB");

        // Use insertMany with ordered: false to skip duplicates if externalId was used, 
        // but here we just want some data.
        await CounsellingUpdate.insertMany(jeeUpdates);
        console.log("JEE mock data seeded successfully");
        process.exit(0);
    } catch (error) {
        console.error("Seeding failed:", error);
        process.exit(1);
    }
};

seedJEE();
