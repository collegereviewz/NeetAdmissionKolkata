import { SeatMatrix } from "../models/seatMatrix.model.js";

const getSeatMatrix = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        const filter = {};
        const filterableFields = ["round", "quota", "category", "state", "institute", "course"];

        filterableFields.forEach(field => {
            if (req.query[field]) {
                filter[field] = req.query[field];
            }
        });

        // Flexible search for institute or course
        if (req.query.search) {
            filter.$or = [
                { institute: { $regex: req.query.search, $options: "i" } },
                { course: { $regex: req.query.search, $options: "i" } }
            ];
        }


        const total = await SeatMatrix.countDocuments(filter);
        const data = await SeatMatrix.find(filter)
            .skip(skip)
            .limit(limit)
            .sort({ createdAt: -1 }); // Default sort

        res.status(200).json({
            success: true,
            data,
            pagination: {
                total,
                page,
                limit,
                pages: Math.ceil(total / limit)
            }
        });

    } catch (error) {
        console.error("Error fetching Seat Matrix:", error);
        res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
};

export { getSeatMatrix };
