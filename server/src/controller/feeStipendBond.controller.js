
import { FeeStipendBond } from "../models/feeStipendBond.model.js";

// Get FeeStipendBond with Pagination and Filtering
export const getFeeStipendBonds = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        const filters = {};
        if (req.query.quota) filters.quota = req.query.quota;
        if (req.query.state) filters.state = req.query.state;
        if (req.query.institute) filters.institute = { $regex: req.query.institute, $options: "i" };
        if (req.query.course) filters.course = { $regex: req.query.course, $options: "i" };

        const total = await FeeStipendBond.countDocuments(filters);
        const data = await FeeStipendBond.find(filters)
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

// Get Distinct Filters for Frontend
export const getFeeStipendBondFilters = async (req, res) => {
    try {
        const quotas = await FeeStipendBond.distinct("quota");
        const states = await FeeStipendBond.distinct("state");

        res.status(200).json({
            success: true,
            filters: {
                quotas: quotas.filter(Boolean).sort(),
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
