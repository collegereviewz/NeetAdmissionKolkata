import { Router } from "express";
import { getUpdates, syncUpdates } from "../controller/update.controller.js";

const router = Router();

router.route("/").get(getUpdates);
router.route("/sync").post(syncUpdates);

export default router;
