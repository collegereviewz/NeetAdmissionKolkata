
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { CounsellingUpdate } from './src/models/update.model.js';

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/neet_admission_kolkata';

async function debugDB() {
    try {
        await mongoose.connect(MONGO_URI);
        console.log('Connected to MongoDB');

        const counts = await CounsellingUpdate.aggregate([
            { $group: { _id: '$counsellingType', count: { $sum: 1 } } }
        ]);
        console.log('Counselling Type Counts:', JSON.stringify(counts, null, 2));

        const total = await CounsellingUpdate.countDocuments();
        console.log('Total Updates:', total);

        const latest = await CounsellingUpdate.find().sort({ createdAt: -1 }).limit(5);
        console.log('Latest 5 Updates:', JSON.stringify(latest, null, 2));

        process.exit(0);
    } catch (err) {
        console.error('Debug Error:', err);
        process.exit(1);
    }
}

debugDB();
