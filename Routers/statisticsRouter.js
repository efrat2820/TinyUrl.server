import express from "express";
import Statistics from "../Controllers/statisticsController.js";
const router = express.Router();

router.get('/:uniqueName',Statistics.clicForTarget);

export default router;