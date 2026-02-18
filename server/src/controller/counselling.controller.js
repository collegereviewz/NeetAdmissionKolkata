
import { Counselling } from "../models/counselling.model.js";

export const getCounsellings = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 50;
        const skip = (page - 1) * limit;

        const filters = {};
        if (req.query.search) {
            filters.counsellingName = { $regex: req.query.search, $options: "i" };
        }
        if (req.query.type) filters.type = req.query.type;
        if (req.query.state) filters.state = req.query.state;

        const total = await Counselling.countDocuments(filters);
        const data = await Counselling.find(filters)
            .sort({ counsellingName: 1 })
            .skip(skip)
            .limit(limit);

        res.status(200).json({
            success: true,
            count: data.length,
            total,
            page,
            pages: Math.ceil(total / limit),
            data: data
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server Error",
            error: error.message
        });
    }
};

export const getCounsellingFilters = async (req, res) => {
    try {
        const types = await Counselling.distinct("type");
        const states = await Counselling.distinct("state");

        res.status(200).json({
            success: true,
            filters: {
                types: types.filter(Boolean).sort(),
                states: states.filter(Boolean).sort(),
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
