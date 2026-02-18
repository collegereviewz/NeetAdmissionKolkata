
import express from "express";
import { getSeatIncreases, getSeatIncreaseFilters } from "../controller/seatIncrease.controller.js";

const router = express.Router();

router.route("/").get(getSeatIncreases);
router.route("/filters").get(getSeatIncreaseFilters);

export default router;
