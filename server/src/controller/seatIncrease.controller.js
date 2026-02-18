
import { SeatIncrease } from "../models/seatIncrease.model.js";

export const getSeatIncreases = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 50;
        const skip = (page - 1) * limit;

        const filters = {};
        if (req.query.state) filters.state = req.query.state;
        if (req.query.institute) filters.institute = { $regex: req.query.institute, $options: "i" };
        if (req.query.course) filters.course = { $regex: req.query.course, $options: "i" };

        const total = await SeatIncrease.countDocuments(filters);
        const data = await SeatIncrease.find(filters)
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

export const getSeatIncreaseFilters = async (req, res) => {
    try {
        const states = await SeatIncrease.distinct("state");
        const institutes = await SeatIncrease.distinct("institute");
        const courses = await SeatIncrease.distinct("course");

        res.status(200).json({
            success: true,
            filters: {
                states: states.filter(Boolean).sort(),
                institutes: institutes.filter(Boolean).sort(),
                courses: courses.filter(Boolean).sort(),
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
