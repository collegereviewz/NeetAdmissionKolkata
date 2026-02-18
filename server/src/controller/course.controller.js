
import { Course } from "../models/course.model.js";

export const getCourses = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 50;
        const skip = (page - 1) * limit;

        const filters = {};
        if (req.query.search) {
            filters.courseName = { $regex: req.query.search, $options: "i" };
        }
        if (req.query.clinicalType) filters.clinicalType = req.query.clinicalType;
        if (req.query.degreeType) filters.degreeType = req.query.degreeType;
        if (req.query.duration) filters.duration = req.query.duration;

        const total = await Course.countDocuments(filters);
        const data = await Course.find(filters)
            .sort({ courseName: 1 })
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

export const getCourseFilters = async (req, res) => {
    try {
        const clinicalTypes = await Course.distinct("clinicalType");
        const degreeTypes = await Course.distinct("degreeType");
        const durations = await Course.distinct("duration");

        res.status(200).json({
            success: true,
            filters: {
                clinicalTypes: clinicalTypes.filter(Boolean).sort(),
                degreeTypes: degreeTypes.filter(Boolean).sort(),
                durations: durations.filter(Boolean).sort(),
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
