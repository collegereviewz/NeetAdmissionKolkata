
import mongoose from "mongoose";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import csv from "csv-parser";
import { Readable } from "stream";
import { ClosingRank } from "../models/closingRank.model.js";

dotenv.config({ path: "./.env" });
console.log("MONGO_URI:", process.env.MONGO_URI);

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

const processedResults = [];

const parseCSV = (filePath) => {
    return new Promise((resolve, reject) => {
        const results = [];

        // Read file content
        const fileContent = fs.readFileSync(filePath, 'utf-8');

        // Preprocess: Remove leading comma from data rows to align with headers
        // Headers line does NOT start with comma. Data lines DO start with comma.
        const lines = fileContent.split('\n');
        const correctedLines = lines.map((line, index) => {
            if (index === 0) return line; // Keep header as is
            if (line.trim() === '') return line; // Skip empty lines
            if (line.startsWith(',')) {
                return line.substring(1); // Remove leading comma
            }
            return line;
        });

        const correctedContent = correctedLines.join('\n');

        Readable.from(correctedContent)
            .pipe(csv())
            .on('data', (data) => {
                // Transform data to ClosingRank model format
                const closingRanks = [];

                // Iterate over keys to find Closing Rank columns (e.g., "CR 2023 1")
                Object.keys(data).forEach(key => {
                    if (key.startsWith('CR ')) {
                        // key format: "CR YYYY R" (e.g., "CR 2023 1")
                        const parts = key.split(' ');
                        if (parts.length === 3) {
                            const year = parts[1];
                            const round = parts[2];
                            const value = data[key];

                            if (value && value !== '-' && value.trim() !== '') {
                                closingRanks.push({
                                    year,
                                    round,
                                    value
                                });
                            }
                        }
                    }
                });

                const doc = {
                    quota: data['Quota'] || "",
                    category: data['Category'] || "",
                    state: data['State'] || "",
                    institute: data['Institute'] || "",
                    course: data['Course'] || "",
                    fee: data['Fee'] || "",
                    stipendYear1: data['Stipend Year 1'] || "",
                    bondYears: data['Bond Years'] || "",
                    bondPenalty: data['Bond Penalty'] || "",
                    beds: data['Beds'] || "",
                    closingRanks
                };

                results.push(doc);
            })
            .on('end', () => {
                resolve(results);
            })
            .on('error', (err) => {
                reject(err);
            });
    });
};

const seedData = async () => {
    await connectDB();

    try {
        // Clear existing data
        await ClosingRank.deleteMany({});
        console.log("Cleared existing ClosingRank data");

        const dataDir = path.join(process.cwd(), 'src/data/Closing Rank/All India Counseling PG Medical');
        const files = fs.readdirSync(dataDir).filter(file => file.endsWith('.csv'));

        let totalDocs = 0;

        for (const file of files) {
            console.log(`Processing ${file}...`);
            const filePath = path.join(dataDir, file);
            const docs = await parseCSV(filePath);

            if (docs.length > 0) {
                await ClosingRank.insertMany(docs);
                totalDocs += docs.length;
                console.log(`Inserted ${docs.length} records from ${file}`);
            }
        }

        console.log(`SUCCESS: Seeded total ${totalDocs} ClosingRank records.`);
        process.exit();
    } catch (error) {
        console.error(`Error seeding data: ${error}`);
        process.exit(1);
    }
};

seedData();
