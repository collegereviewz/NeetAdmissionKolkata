
import express from "express";
import { getAllotments, getAllotmentFilters } from "../controller/allotment.controller.js";

const router = express.Router();

router.route("/").get(getAllotments);
router.route("/filters").get(getAllotmentFilters);

export default router;
