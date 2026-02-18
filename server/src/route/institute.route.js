
import express from "express";
import { getInstitutes, getInstituteFilters } from "../controller/institute.controller.js";

const router = express.Router();

router.route("/").get(getInstitutes);
router.route("/filters").get(getInstituteFilters);

export default router;
