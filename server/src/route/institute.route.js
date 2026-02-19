
import express from "express";
import { getInstitutes, getInstituteFilters, getInstituteById } from "../controller/institute.controller.js";

const router = express.Router();

router.route("/").get(getInstitutes);
router.route("/filters").get(getInstituteFilters);
router.route("/:id").get(getInstituteById);

export default router;
