
import { Allotment } from "../models/allotment.model.js";

// Get Allotments with Pagination and Filtering
export const getAllotments = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        const filters = {};
        if (req.query.round) filters.round = req.query.round;
        if (req.query.quota) filters.quota = req.query.quota;
        if (req.query.category) filters.category = req.query.category;
        if (req.query.state) filters.state = req.query.state;
        if (req.query.institute) filters.institute = { $regex: req.query.institute, $options: "i" };
        if (req.query.course) filters.course = { $regex: req.query.course, $options: "i" };

        const total = await Allotment.countDocuments(filters);
        const allotments = await Allotment.find(filters)
            .skip(skip)
            .limit(limit);

        res.status(200).json({
            success: true,
            count: allotments.length,
            total,
            page,
            pages: Math.ceil(total / limit),
            data: allotments
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server Error",
            error: error.message
        });
    }
};

// Get Distinct Filters for Frontend
export const getAllotmentFilters = async (req, res) => {
    try {
        const quotas = await Allotment.distinct("quota");
        const categories = await Allotment.distinct("category");
        const states = await Allotment.distinct("state");
        const rounds = await Allotment.distinct("round");

        res.status(200).json({
            success: true,
            filters: {
                quotas: quotas.filter(Boolean).sort(),
                categories: categories.filter(Boolean).sort(),
                states: states.filter(Boolean).sort(),
                rounds: rounds.filter(Boolean).sort()
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
