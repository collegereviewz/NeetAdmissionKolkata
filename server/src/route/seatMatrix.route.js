import express from "express";
import { getSeatMatrix } from "../controller/seatMatrix.controller.js";

const router = express.Router();

router.get("/", getSeatMatrix);

export default router;
