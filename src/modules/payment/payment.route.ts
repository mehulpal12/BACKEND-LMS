// payment.routes.js
import express from "express";
import {
  createPayment,
  verifyPayment,
} from "./payment.controller.js";
import { authMiddleware } from "../../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/create", authMiddleware, createPayment);
router.post("/verify", authMiddleware, verifyPayment);

export default router;