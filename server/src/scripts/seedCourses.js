
import mongoose from "mongoose";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import { Course } from "../models/course.model.js";

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

const parseCustomCSV = (filePath) => {
    return new Promise((resolve, reject) => {
        const results = [];
        try {
            const fileContent = fs.readFileSync(filePath, 'utf-8');
            const lines = fileContent.split('\n').map(line => line.trim()).filter(line => line !== '');

            for (let i = 0; i < lines.length; i += 2) {
                if (i + 1 >= lines.length) break; // Ensure pair exists

                const courseName = lines[i].replace(/^"|"$/g, ''); // Remove quotes if present
                const details = lines[i + 1].split('•');

                if (details.length >= 3) {
                    const doc = {
                        courseName: courseName,
                        clinicalType: details[0].trim(),
                        degreeType: details[1].trim(),
                        duration: details[2].trim()
                    };
                    results.push(doc);
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
        await Course.deleteMany({});
        console.log("Cleared existing Course data");

        const dataDir = path.join(process.cwd(), 'src/data/courses');
        if (!fs.existsSync(dataDir)) {
            console.error(`Directory not found: ${dataDir}`);
            process.exit(1);
        }

        const filePath = path.join(dataDir, 'courses.csv');
        if (fs.existsSync(filePath)) {
            console.log(`Processing ${filePath}...`);
            const docs = await parseCustomCSV(filePath);
            if (docs.length > 0) {
                await Course.insertMany(docs);
                console.log(`Inserted ${docs.length} records from courses.csv`);
            }
        } else {
            console.log(`courses.csv not found in ${dataDir}`);
        }

        console.log(`SUCCESS: Seeded Course records.`);
        process.exit();
    } catch (error) {
        console.error(`Error seeding data: ${error}`);
        process.exit(1);
    }
};

seedData();
