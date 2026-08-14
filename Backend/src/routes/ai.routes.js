import express from "express";

import {
  analyzeFinancialSpendingController,
} from "../controllers/ai.controller.js";

import authMiddleware from "../middleware/auth.middleware.js";

const router = express.Router();

router.use(authMiddleware);

router.get(
  "/spending-analysis",
  analyzeFinancialSpendingController
);

export default router;