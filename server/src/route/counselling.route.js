
import express from "express";
import { getCounsellings, getCounsellingFilters } from "../controller/counselling.controller.js";

const router = express.Router();

router.route("/").get(getCounsellings);
router.route("/filters").get(getCounsellingFilters);

export default router;
