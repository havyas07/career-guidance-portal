import express from "express";
import { generateCareerDetail } from "../controllers/careerController.js";

const router = express.Router();

router.post("/detail", generateCareerDetail);

export default router;