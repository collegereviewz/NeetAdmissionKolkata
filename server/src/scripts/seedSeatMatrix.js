import mongoose from "mongoose";
import fs from "fs";
import path from "path";
import csv from "csv-parser";
import { SeatMatrix } from "../models/seatMatrix.model.js";
import { DB_NAME } from "../constants.js";
import dotenv from "dotenv";

dotenv.config({ path: "./.env" });

const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGO_URI}/${DB_NAME}`);
        console.log(`\n MongoDB connected !! DB HOST: ${connectionInstance.connection.host}`);
    } catch (error) {
        console.log("MONGODB connection FAILED ", error);
        process.exit(1);
    }
};

const seedData = async () => {
    await connectDB();

    // Clear existing data
    console.log("Clearing existing Seat Matrix data...");
    await SeatMatrix.deleteMany({});
    console.log("Data cleared.");

    const dataDir = path.join(process.cwd(), "src/data");
    const files = fs.readdirSync(dataDir).filter(file => file.startsWith("seatmatrix_page") && file.endsWith(".csv"));

    console.log(`Found ${files.length} CSV files to process.`);

    for (const file of files) {
        const filePath = path.join(dataDir, file);
        const results = [];

        console.log(`Processing ${file}...`);

        // Read headers first to determine order
        const fileContent = fs.readFileSync(filePath, 'utf-8');
        const firstLine = fileContent.split('\n')[0];
        const headers = firstLine.split(',').map(h => h.trim());

        await new Promise((resolve, reject) => {
            fs.createReadStream(filePath)
                .pipe(csv())
                .on("data", (row) => {
                    // Fix shifted data
                    // The data is shifted by 1 column to the right.
                    // row[headers[i]] should actually take the value from row[headers[i+1]]

                    const correctedRow = {};

                    // headers[0] is 'Round', value is in headers[1] ('Quota')
                    // headers[last] should get value from the implicit empty column key logic of csv-parser or just the overflow

                    // csv-parser with standard behavior turns the row into an object keyed by headers.
                    // Since the data has a leading empty column, row['Round'] gets the empty column.
                    // row['Quota'] gets the real Round value.

                    for (let i = 0; i < headers.length; i++) {
                        const currentHeader = headers[i];
                        const nextHeader = headers[i + 1];

                        // If we are at the last header, check if there is an empty key or similar
                        // But simpler logic: The values are just under the 'next' key.
                        // Special case: The last header in the file line might be empty string if trailing comma exists.

                        if (nextHeader !== undefined) {
                            correctedRow[currentHeader] = row[nextHeader];
                        } else {
                            // For the very last item, csv-parser might key it with an empty string if header line had trailing comma
                            if (row['']) {
                                correctedRow[currentHeader] = row[''];
                            }
                        }
                    }

                    // Transform data
                    const closingRanks = [];

                    // Use correctedRow for extraction
                    const transformedData = {
                        round: correctedRow.Round,
                        quota: correctedRow.Quota,
                        category: correctedRow.Category,
                        state: correctedRow.State,
                        institute: correctedRow.Institute,
                        course: correctedRow.Course,
                        seats: correctedRow.Seats,
                        fee: correctedRow.Fee,
                        stipendYear1: correctedRow["Stipend Year 1"],
                        bondYears: correctedRow["Bond Years"],
                        bondPenalty: correctedRow["Bond Penalty"],
                        beds: correctedRow.Beds,
                    };

                    // Extract closing ranks from correctedRow
                    Object.keys(correctedRow).forEach(key => {
                        const match = key && key.match(/^CR (\d{4}) (\d+)$/);
                        if (match) {
                            const year = match[1];
                            const round = match[2];
                            const value = correctedRow[key];
                            if (value && value.trim() !== "" && value.trim() !== "-") {
                                closingRanks.push({ year, round, value });
                            }
                        }
                    });

                    transformedData.closingRanks = closingRanks;

                    // Only push if we resolved some valid data (e.g. checked quota exists)
                    if (transformedData.quota) {
                        results.push(transformedData);
                    }
                })
                .on("end", () => {
                    resolve();
                })
                .on("error", (error) => {
                    reject(error);
                });
        });

        // Bulk insert for this file
        if (results.length > 0) {
            try {
                await SeatMatrix.insertMany(results);
                console.log(`Inserted ${results.length} records from ${file}`);
            } catch (err) {
                console.error(`Error inserting data from ${file}:`, err);
            }
        }
    }

    console.log("Seeding completed.");
    process.exit(0);
};

seedData();
