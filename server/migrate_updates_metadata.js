import mongoose from "mongoose";
import dotenv from "dotenv";
import { CounsellingUpdate } from "./src/models/update.model.js";

dotenv.config({ path: './.env' });

const migrate = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to MongoDB for migration");

        // 1. Tag all existing updates as 'Medicine' (done by default in schema, but being explicit)
        await CounsellingUpdate.updateMany({}, { $set: { field: "Medicine" } });
        console.log("Tagged all updates as 'Medicine'");

        // 2. Identify PG Medical updates
        const pgResult = await CounsellingUpdate.updateMany(
            { counsellingType: /PG Medical/i },
            { $set: { level: "PG" } }
        );
        console.log(`Updated ${pgResult.modifiedCount} Medical updates to level: PG`);

        // 3. Identify UG Medical updates
        const ugResult = await CounsellingUpdate.updateMany(
            { counsellingType: /NEET UG/i },
            { $set: { level: "UG" } }
        );
        console.log(`Updated ${ugResult.modifiedCount} Medical updates to level: UG`);

        // 4. Update JEE updates (Engineeering)
        const jeeResult = await CounsellingUpdate.updateMany(
            { counsellingType: /JEE/i },
            { $set: { field: "Engineering", level: "UG" } }
        );
        console.log(`Updated ${jeeResult.modifiedCount} updates to field: Engineering, level: UG`);

        process.exit(0);
    } catch (error) {
        console.error("Migration failed:", error);
        process.exit(1);
    }
};

migrate();
