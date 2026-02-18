
import express from "express";
import { getCourses, getCourseFilters } from "../controller/course.controller.js";

const router = express.Router();

router.route("/").get(getCourses);
router.route("/filters").get(getCourseFilters);

export default router;
