
import mongoose from "mongoose";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import csv from "csv-parser";
import { Readable } from "stream";
import { Allotment } from "../models/allotment.model.js";

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
                const doc = {
                    round: data['Round'] || "",
                    aiRank: data['AI Rank'] || "",
                    state: data['State'] || "",
                    institute: data['Institute'] || "",
                    course: data['Course'] || "",
                    quota: data['Quota'] || "",
                    category: data['Category'] || "",
                    fee: data['Fee'] || "",
                    stipendYear1: data['Stipend Year 1'] || "",
                    bondYears: data['Bond Years'] || "",
                    bondPenalty: data['Bond Penalty'] || "",
                    beds: data['Beds'] || ""
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
        await Allotment.deleteMany({});
        console.log("Cleared existing Allotment data");

        // Path to the allotment data
        const dataDir = path.join(process.cwd(), 'src/data/allotment/All India Counseling PG Medical');

        if (!fs.existsSync(dataDir)) {
            console.error(`Directory not found: ${dataDir}`);
            process.exit(1);
        }

        const files = fs.readdirSync(dataDir).filter(file => file.endsWith('.csv'));

        let totalDocs = 0;

        for (const file of files) {
            console.log(`Processing ${file}...`);
            const filePath = path.join(dataDir, file);
            const docs = await parseCSV(filePath);

            if (docs.length > 0) {
                await Allotment.insertMany(docs);
                totalDocs += docs.length;
                console.log(`Inserted ${docs.length} records from ${file}`);
            }
        }

        console.log(`SUCCESS: Seeded total ${totalDocs} Allotment records.`);
        process.exit();
    } catch (error) {
        console.error(`Error seeding data: ${error}`);
        process.exit(1);
    }
};

seedData();
