
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { CounsellingUpdate } from './src/models/update.model.js';

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/neet_admission_kolkata';

async function migrate() {
    try {
        await mongoose.connect(MONGO_URI);
        console.log('Connected to MongoDB');

        // 1. Find records with 'category' but no 'counsellingType'
        const records = await CounsellingUpdate.find({
            counsellingType: { $exists: false }
        });

        console.log(`Found ${records.length} records to migrate.`);

        for (const record of records) {
            if (record.category) {
                record.counsellingType = record.category;
                await record.save();
                console.log(`Migrated: ${record.title}`);
            } else {
                // Fallback for MCC if category is also missing
                record.counsellingType = "All India Counseling - PG Medical";
                await record.save();
            }
        }

        // 2. Clear out any broken records if necessary or just let re-sync happen
        // Actually, let's just delete everything and re-sync to be absolutely sure everything is clean
        // console.log("Cleaning all records to perform a fresh synced...");
        // await CounsellingUpdate.deleteMany({});

        console.log('Migration complete');
        process.exit(0);
    } catch (err) {
        console.error('Migration Error:', err);
        process.exit(1);
    }
}

migrate();
