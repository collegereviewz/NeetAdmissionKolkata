import { CounsellingUpdate } from "../models/update.model.js";
import { scrapeSource, syncAllSources } from "../services/scraper.service.js";
import { counsellingSources } from "../config/counsellingSource.config.js";

export const getUpdates = async (req, res) => {
    try {
        const { type, subCategory, field, level } = req.query;
        const filter = {};

        if (field) {
            filter.field = field;
        }
        if (level) {
            filter.level = level;
        }
        if (type && type !== 'total' && type !== 'ALL') {
            filter.counsellingType = type;
        }
        if (subCategory) {
            filter.subCategory = subCategory;
            if (subCategory === 'Quotas' && (!req.query.quotaType || req.query.quotaType === 'ALL')) {
                filter.quotaType = { $ne: null };
            }
        }
        if (req.query.quotaType && req.query.quotaType !== 'ALL') {
            filter.quotaType = req.query.quotaType;
        }

        const updates = await CounsellingUpdate.find(filter).sort({ createdAt: -1 }).limit(20);
        res.status(200).json({
            success: true,
            data: updates,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch updates",
            error: error.message,
        });
    }
};

export const syncUpdates = async (req, res) => {
    try {
        const { type } = req.query;
        let syncedCount = 0;

        if (type && type !== 'ALL') {
            const source = counsellingSources.find(s => s.name === type);
            if (!source) {
                return res.status(404).json({ success: false, message: "Counselling type not found in config" });
            }
            syncedCount = await scrapeSource(source);
        } else {
            syncedCount = await syncAllSources();
        }

        res.status(200).json({
            success: true,
            message: "Updates synced successfully",
            syncedCount,
        });
    } catch (error) {
        console.error("Sync Error:", error);
        res.status(500).json({
            success: false,
            message: "Failed to sync updates",
            error: error.message,
        });
    }
};
