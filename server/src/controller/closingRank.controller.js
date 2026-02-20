
import { ClosingRank } from "../models/closingRank.model.js";
import rangarayaData from "../data/InstitutesDetails/rangaraya.json" with { type: "json" };

export const getClosingRanks = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        const filters = {};
        if (req.query.quota) filters.quota = req.query.quota;
        if (req.query.category) filters.category = req.query.category;
        if (req.query.state) filters.state = req.query.state;

        const institute = req.query.institute;

        // --- Manual Data Override for Rangaraya ---
        if (institute && institute.includes("Rangaraya")) {
            const manualDetails = rangarayaData.find(i => i.instituteName.includes("Rangaraya"));

            if (manualDetails && manualDetails.courses) {
                const manualClosingRanks = manualDetails.courses.map(course => {
                    // Transform nested ranks to array format
                    const closingRanksArray = [];
                    if (course.closingRankTrends) {
                        Object.entries(course.closingRankTrends).forEach(([year, rounds]) => {
                            Object.entries(rounds).forEach(([roundKey, value]) => {
                                // Extract round number from "round1" => "1"
                                const roundNum = roundKey.replace('round', '');
                                closingRanksArray.push({
                                    year: year,
                                    round: roundNum,
                                    value: String(value)
                                });
                            });
                        });
                    }

                    return {
                        institute: manualDetails.instituteName,
                        course: course.courseName,
                        category: course.category || "Open",
                        quota: course.quota || "All India",
                        fee: course.feeDetails?.tuitionFee || "N/A",
                        bondYears: course.bondDetails?.bondYears || "0",
                        bondPenalty: course.bondDetails?.bondPenalty || "0",
                        stipendYear1: course.stipendDetails?.year1 || "",
                        closingRanks: closingRanksArray
                    };
                });

                return res.status(200).json({
                    success: true,
                    count: manualClosingRanks.length,
                    data: manualClosingRanks
                });
            }
        }
        // ------------------------------------------

        if (institute) {
            // Case-insensitive search for institute
            filters.institute = { $regex: institute, $options: 'i' };
        }
        if (req.query.course) filters.course = { $regex: req.query.course, $options: "i" };

        const total = await ClosingRank.countDocuments(filters);
        const closingRanks = await ClosingRank.find(filters)
            .skip(skip)
            .limit(limit);

        res.status(200).json({
            success: true,
            count: closingRanks.length,
            total,
            page,
            pages: Math.ceil(total / limit),
            data: closingRanks
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server Error",
            error: error.message
        });
    }
};

// Get unique values for filters
export const getExploreFilters = async (req, res) => {
    try {
        const quotas = await ClosingRank.distinct("quota");
        const categories = await ClosingRank.distinct("category");
        const states = await ClosingRank.distinct("state");

        res.status(200).json({
            success: true,
            data: {
                quotas,
                categories,
                states
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server Error",
            error: error.message
        });
    }
};
