
import express from "express";
import { getClosingRanks, getExploreFilters } from "../controller/closingRank.controller.js";

const router = express.Router();

router.get("/", getClosingRanks);
router.get("/filters", getExploreFilters);

export default router;
