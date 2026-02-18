
import mongoose from "mongoose";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import csv from "csv-parser";
import { Readable } from "stream";
import { SeatIncrease } from "../models/seatIncrease.model.js";

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

const parseCSV = (filePath) => {
    return new Promise((resolve, reject) => {
        const results = [];
        const fileContent = fs.readFileSync(filePath, 'utf-8');
        const lines = fileContent.split('\n');
        const correctedLines = lines.map((line, index) => {
            if (index === 0) return line; // Header row
            if (line.trim() === '') return line;
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
                    state: data['State'] || "",
                    institute: data['Institute'] || "",
                    course: data['Course'] || "",
                    seatsFrom: data['From'] || "",
                    seatsTo: data['To'] || "",
                    increase: data['Increase'] || "",
                    remark: data['Remark'] || ""
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
        await SeatIncrease.deleteMany({});
        console.log("Cleared existing SeatIncrease data");

        const dataDir = path.join(process.cwd(), 'src/data/seatIncrease');
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
                await SeatIncrease.insertMany(docs);
                totalDocs += docs.length;
                console.log(`Inserted ${docs.length} records from ${file}`);
            }
        }
        console.log(`SUCCESS: Seeded total ${totalDocs} SeatIncrease records.`);
        process.exit();
    } catch (error) {
        console.error(`Error seeding data: ${error}`);
        process.exit(1);
    }
};

seedData();
