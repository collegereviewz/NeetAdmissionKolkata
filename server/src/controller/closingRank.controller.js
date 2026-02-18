
import { ClosingRank } from "../models/closingRank.model.js";

export const getClosingRanks = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        const filters = {};
        if (req.query.quota) filters.quota = req.query.quota;
        if (req.query.category) filters.category = req.query.category;
        if (req.query.state) filters.state = req.query.state;
        if (req.query.institute) filters.institute = { $regex: req.query.institute, $options: "i" };
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
