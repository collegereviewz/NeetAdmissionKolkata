
import mongoose from "mongoose";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import { University } from "../models/university.model.js";

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

const states = [
    "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal", "Andaman and Nicobar Islands", "Chandigarh", "Dadra and Nagar Haveli", "Daman and Diu", "Lakshadweep", "Delhi", "Puducherry", "Ladakh", "Jammu and Kashmir", "Pondicherry"
];

const parseUniversitiesCSV = (filePath) => {
    return new Promise((resolve, reject) => {
        const results = [];
        try {
            const fileContent = fs.readFileSync(filePath, 'utf-8');
            const lines = fileContent.split('\n').map(line => line.trim()).filter(line => line !== '');

            for (const line of lines) {
                // Format: "NameState•Type" (sometimes quoted)
                const cleanLine = line.replace(/^"|"$/g, '');

                const parts = cleanLine.split('•');
                if (parts.length >= 2) {
                    const type = parts[1].trim();
                    let nameState = parts[0].trim();

                    let state = "Unknown";
                    let name = nameState;

                    // Extract State
                    for (const s of states) {
                        if (nameState.endsWith(s)) {
                            state = s;
                            name = nameState.substring(0, nameState.length - s.length).trim();
                            // If name ends with comma now, remove it
                            if (name.endsWith(',')) name = name.slice(0, -1).trim();
                            break;
                        }
                    }

                    results.push({
                        universityName: name,
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
        await University.deleteMany({});
        console.log("Cleared existing University data");

        const dataDir = path.join(process.cwd(), 'src/data/universities');
        const filePath = path.join(dataDir, 'universities.csv');

        if (fs.existsSync(filePath)) {
            console.log(`Processing ${filePath}...`);
            const docs = await parseUniversitiesCSV(filePath);
            if (docs.length > 0) {
                await University.insertMany(docs);
                console.log(`Inserted ${docs.length} records from universities.csv`);
            }
        } else {
            console.log(`universities.csv not found in ${dataDir}`);
        }

        console.log(`SUCCESS: Seeded University records.`);
        process.exit();
    } catch (error) {
        console.error(`Error seeding data: ${error}`);
        process.exit(1);
    }
};

seedData();
