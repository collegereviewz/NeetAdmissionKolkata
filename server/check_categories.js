
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { CounsellingUpdate } from './src/models/update.model.js';

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/neet_admission_kolkata';

async function checkCategories() {
    try {
        await mongoose.connect(MONGO_URI);
        console.log('Connected to MongoDB');

        const counts = await CounsellingUpdate.aggregate([
            { $group: { _id: '$subCategory', count: { $sum: 1 } } }
        ]);
        console.log('Sub-Category Counts:', JSON.stringify(counts, null, 2));

        process.exit(0);
    } catch (err) {
        console.error('Check Error:', err);
        process.exit(1);
    }
}

checkCategories();
