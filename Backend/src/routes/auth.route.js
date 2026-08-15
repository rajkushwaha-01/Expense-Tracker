import express from "express";
import {
  loginController,
  registerController,getMeController
} from "../controllers/auth.controller.js";

const router = express.Router();

// Register
router.post("/register", registerController);

// Login
router.post("/login", loginController);

router.get("/me", getMeController);

export default router;