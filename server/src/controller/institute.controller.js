
import { Institute } from "../models/institute.model.js";
import { University } from "../models/university.model.js";

export const getInstitutes = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 50;
        const skip = (page - 1) * limit;

        const filters = {};
        if (req.query.search) {
            // Search by Name or University
            filters.$or = [
                { instituteName: { $regex: req.query.search, $options: "i" } },
                { university: { $regex: req.query.search, $options: "i" } }
            ];
        }
        if (req.query.type) filters.type = req.query.type;
        if (req.query.management) filters.management = req.query.management;
        if (req.query.state) filters.state = req.query.state;
        if (req.query.university) filters.university = req.query.university;

        const total = await Institute.countDocuments(filters);
        const data = await Institute.find(filters)
            .sort({ instituteName: 1 })
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

export const getInstituteFilters = async (req, res) => {
    try {
        const types = await Institute.distinct("type");
        const managements = await Institute.distinct("management");
        const states = await Institute.distinct("state");
        // For university filter, list distinct universities from Institute collection
        const universities = await Institute.distinct("university");

        res.status(200).json({
            success: true,
            filters: {
                types: types.filter(Boolean).sort(),
                managements: managements.filter(Boolean).sort(),
                states: states.filter(Boolean).sort(),
                universities: universities.filter(Boolean).sort()
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
