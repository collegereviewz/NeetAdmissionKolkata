import mongoose from "mongoose";
import dotenv from "dotenv";
import { CounsellingUpdate } from "./src/models/update.model.js";

dotenv.config({ path: './.env' });

const checkTypes = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        const types = await CounsellingUpdate.distinct("counsellingType");
        console.log("Unique Counselling Types in DB:", types);

        const count = await CounsellingUpdate.countDocuments();
        console.log("Total Updates Count:", count);

        const sample = await CounsellingUpdate.findOne();
        console.log("Sample Update:", sample);

        process.exit(0);
    } catch (error) {
        console.error("Check failed:", error);
        process.exit(1);
    }
};

checkTypes();
