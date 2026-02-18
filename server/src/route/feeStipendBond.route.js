
import express from "express";
import { getFeeStipendBonds, getFeeStipendBondFilters } from "../controller/feeStipendBond.controller.js";

const router = express.Router();

router.route("/").get(getFeeStipendBonds);
router.route("/filters").get(getFeeStipendBondFilters);

export default router;
