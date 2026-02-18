
import mongoose from "mongoose";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import { Counselling } from "../models/counselling.model.js";

dotenv.config({ path: "./.env" });

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

const parseCounsellingCSV = (filePath) => {
    return new Promise((resolve, reject) => {
        const results = [];
        try {
            const fileContent = fs.readFileSync(filePath, 'utf-8');
            const lines = fileContent.split('\n').map(line => line.trim()).filter(line => line !== '');

            for (const line of lines) {
                let name, type;

                // Parsing Logic
                if (line.includes('PG Medical')) {
                    // Split after the last occurrence of "PG Medical"
                    const splitIdx = line.lastIndexOf('PG Medical') + 'PG Medical'.length;
                    name = line.substring(0, splitIdx).trim();
                    type = line.substring(splitIdx).trim();
                } else if (line.includes(')')) {
                    // Fallback for lines like "Open States (...)..."
                    const splitIdx = line.lastIndexOf(')') + 1;
                    name = line.substring(0, splitIdx).trim();
                    type = line.substring(splitIdx).trim();
                } else {
                    name = line;
                    type = "General"; // Default if parse fails
                }

                // Extract State/Authority
                // Heuristic: Take part before " - "
                let state = name;
                if (name.includes(' - ')) {
                    state = name.split(' - ')[0].trim();
                } else if (name.includes('(')) {
                    state = name.split('(')[0].trim();
                }

                // Cleanup slightly for "All India Counseling"
                if (state.toLowerCase().includes('all india counseling')) {
                    state = 'All India';
                }

                if (name) {
                    results.push({
                        counsellingName: name,
                        type: type,
                        state: state
                    });
                }
            }
            resolve(results);
        } catch (err) {
            reject(err);
        }
    });
};

const seedData = async () => {
    await connectDB();
    try {
        await Counselling.deleteMany({});
        console.log("Cleared existing Counselling data");

        const dataDir = path.join(process.cwd(), 'src/data/counselling');
        if (!fs.existsSync(dataDir)) {
            console.error(`Directory not found: ${dataDir}`);
            process.exit(1);
        }

        const filePath = path.join(dataDir, 'counselling.csv');
        if (fs.existsSync(filePath)) {
            console.log(`Processing ${filePath}...`);
            const docs = await parseCounsellingCSV(filePath);
            if (docs.length > 0) {
                await Counselling.insertMany(docs);
                console.log(`Inserted ${docs.length} records from counselling.csv`);
            }
        } else {
            console.log(`counselling.csv not found in ${dataDir}`);
        }

        console.log(`SUCCESS: Seeded Counselling records.`);
        process.exit();
    } catch (error) {
        console.error(`Error seeding data: ${error}`);
        process.exit(1);
    }
};

seedData();
