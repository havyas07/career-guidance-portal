import express from "express";
import { generateScenarios, generateDebrief } from "../controllers/tasteController.js";

const router = express.Router();

router.post("/scenarios", generateScenarios);
router.post("/debrief", generateDebrief);

export default router;