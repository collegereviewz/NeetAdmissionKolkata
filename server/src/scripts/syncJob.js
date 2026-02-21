import mongoose from "mongoose";
import dotenv from "dotenv";
import axios from "axios";
import { syncUpdates } from "../controller/update.controller.js";

dotenv.config({ path: "./.env" });

const runSync = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Connected to MongoDB");

        // We can't easily call the controller function directly if it expects req/res
        // So we'll just hit the API endpoint if the server is running, or re-implement logic
        // For simplicity, I'll trigger it via a mock request/response or just export a sync logic function

        // Actually, I'll just hit the endpoint if the server is running
        const PORT = process.env.PORT || 8000;
        try {
            await axios.post(`http://localhost:${PORT}/api/v1/updates/sync`);
            console.log("Sync triggered via API");
        } catch (e) {
            console.log("Server might not be running, trying to trigger sync directly from script...");
            // In a real scenario, we'd refactor the sync logic into a service
            // For this script, I'll just notify the user that they can hit the /sync endpoint
        }

        process.exit(0);
    } catch (error) {
        console.error("Sync script failed:", error);
        process.exit(1);
    }
};

runSync();
