
import express from "express";
import { getUniversities, getUniversityFilters } from "../controller/university.controller.js";

const router = express.Router();

router.route("/").get(getUniversities);
router.route("/filters").get(getUniversityFilters);

export default router;
