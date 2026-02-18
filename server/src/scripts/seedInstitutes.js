
import mongoose from "mongoose";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import { Institute } from "../models/institute.model.js";

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

const loadUniversities = (filePath) => {
    try {
        const fileContent = fs.readFileSync(filePath, 'utf-8');
        const lines = fileContent.split('\n').map(line => line.trim()).filter(line => line !== '');
        return lines.map(line => {
            const cleanLine = line.replace(/^"|"$/g, '');
            const parts = cleanLine.split('•');
            if (parts.length >= 1) {
                let nameState = parts[0].trim();
                // Attempt to strip state from name
                for (const s of states) {
                    if (nameState.endsWith(s)) {
                        return {
                            fullName: nameState,
                            name: nameState.substring(0, nameState.length - s.length).trim().replace(/,$/, ''),
                            state: s
                        };
                    }
                }
                return { fullName: nameState, name: nameState, state: "Unknown" };
            }
            return null;
        }).filter(Boolean);
    } catch (err) {
        console.error("Error loading universities:", err);
        return [];
    }
};

const parseInstitutesCSV = (filePath, universities) => {
    return new Promise((resolve, reject) => {
        const results = [];
        try {
            const fileContent = fs.readFileSync(filePath, 'utf-8');
            const lines = fileContent.split('\n').map(line => line.trim()).filter(line => line !== '');

            for (const line of lines) {
                // "NameUniversityType...Management...Beds..."
                const cleanLine = line.replace(/^"|"$/g, '');

                // Extract Fields using Keywords
                const typeIdx = cleanLine.indexOf('Type');
                const mgmtIdx = cleanLine.indexOf('Management');
                const bedsIdx = cleanLine.indexOf('Beds');
                const localIdx = cleanLine.indexOf('Local Distinction');

                let type = "", management = "", beds = "";
                let nameUniversity = cleanLine;

                if (typeIdx !== -1) {
                    nameUniversity = cleanLine.substring(0, typeIdx).trim();

                    let typeEnd = mgmtIdx !== -1 ? mgmtIdx : cleanLine.length;
                    type = cleanLine.substring(typeIdx + 4, typeEnd).trim();
                }

                if (mgmtIdx !== -1) {
                    let mgmtEnd = bedsIdx !== -1 ? bedsIdx : cleanLine.length;
                    management = cleanLine.substring(mgmtIdx + 10, mgmtEnd).trim();
                }

                if (bedsIdx !== -1) {
                    let bedsEnd = localIdx !== -1 ? localIdx : cleanLine.length;
                    beds = cleanLine.substring(bedsIdx + 4, bedsEnd).trim();
                }

                // Split Name and University
                // Strategy: Check if nameUniversity ends with any known University Full Name (Name+State) or Name from our list
                let instituteName = nameUniversity;
                let university = "";
                let state = "Unknown"; // Default

                // Sort universities by length descending to match longest possible suffix first
                universities.sort((a, b) => b.fullName.length - a.fullName.length);

                for (const u of universities) {
                    if (nameUniversity.endsWith(u.fullName)) {
                        university = u.fullName; // Use the raw name+state as found in university CSV
                        instituteName = nameUniversity.substring(0, nameUniversity.length - u.fullName.length).trim();
                        // Strip trailing comma
                        if (instituteName.endsWith(',')) instituteName = instituteName.slice(0, -1).trim();
                        state = u.state; // Infer state from University
                        break;
                    }
                    // Fallback: match just the name part if full name fails (less reliable but possible)
                    if (nameUniversity.endsWith(u.name)) {
                        university = u.name;
                        instituteName = nameUniversity.substring(0, nameUniversity.length - u.name.length).trim();
                        if (instituteName.endsWith(',')) instituteName = instituteName.slice(0, -1).trim();
                        state = u.state;
                        break;
                    }
                }

                // If no university match, maybe the nameUniversity IS just the name? 
                // Or maybe name ends with a State?
                if (state === "Unknown") {
                    for (const s of states) {
                        if (nameUniversity.includes(s) || instituteName.includes(s)) {
                            // Extract state if found in string as last resort
                            // This is weak but better than nothing
                            // But let's verify if we want to extract it
                            state = s;
                            // break; // Don't break, find other matches? No, usually states are unique enough.
                        }
                    }
                }

                results.push({
                    instituteName: instituteName,
                    university: university,
                    type: type,
                    management: management,
                    beds: beds,
                    state: state
                });
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
        await Institute.deleteMany({});
        console.log("Cleared existing Institute data");

        const dataDir = path.join(process.cwd(), 'src/data/institutes');
        const uniDir = path.join(process.cwd(), 'src/data/universities');

        const filePath = path.join(dataDir, 'inititutes.csv'); // Note: filename from file list
        const uniFilePath = path.join(uniDir, 'universities.csv');

        if (fs.existsSync(filePath)) {
            let universities = [];
            if (fs.existsSync(uniFilePath)) {
                console.log(`Loading Universities from ${uniFilePath}...`);
                universities = loadUniversities(uniFilePath);
            } else {
                console.warn("Universities file not found, state inference will be limited.");
            }

            console.log(`Processing ${filePath}...`);
            const docs = await parseInstitutesCSV(filePath, universities);
            if (docs.length > 0) {
                await Institute.insertMany(docs);
                console.log(`Inserted ${docs.length} records from inititutes.csv`);
            }
        } else {
            console.log(`inititutes.csv not found in ${dataDir}`);
        }

        console.log(`SUCCESS: Seeded Institute records.`);
        process.exit();
    } catch (error) {
        console.error(`Error seeding data: ${error}`);
        process.exit(1);
    }
};

seedData();
